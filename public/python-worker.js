// Web Worker for isolated Python execution via Pyodide
/* eslint-disable no-restricted-globals */

let pyodide = null;
let isInitializing = false;
let initPromise = null;

async function loadPyodideRuntime() {
  if (pyodide) return pyodide;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    isInitializing = true;
    try {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');
      // @ts-ignore
      pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
      });
      isInitializing = false;
      return pyodide;
    } catch (err) {
      isInitializing = false;
      throw new Error('Failed to load Pyodide WebAssembly runtime: ' + (err.message || err));
    }
  })();

  return initPromise;
}

// Prepare helper Python test runner script
const HARNESS_SCRIPT = `
import sys
import io
import json

def _run_challenge_code(user_code, test_cases_json):
    test_cases = json.loads(test_cases_json)
    results = []

    for tc in test_cases:
        tc_id = tc.get("id", "")
        tc_input = tc.get("input", "")
        expected = str(tc.get("expectedOutput", "")).strip()

        stdout_buf = io.StringIO()
        stderr_buf = io.StringIO()
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        old_stdin = sys.stdin

        sys.stdout = stdout_buf
        sys.stderr = stderr_buf
        sys.stdin = io.StringIO(tc_input if tc_input.endswith("\\n") else (tc_input + "\\n") if tc_input else "")

        env = {}
        error_msg = None
        passed = False
        actual = ""

        try:
            compiled = compile(user_code, "<string>", "exec")
            exec(compiled, env)
            actual = stdout_buf.getvalue().strip()
            # If function returned or printed
            passed = (actual == expected)
        except Exception as e:
            error_msg = f"{type(e).__name__}: {str(e)}"
            actual = stdout_buf.getvalue().strip()
        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr
            sys.stdin = old_stdin

        results.append({
            "testCaseId": tc_id,
            "passed": passed,
            "input": tc_input,
            "expectedOutput": expected,
            "actualOutput": actual,
            "error": error_msg,
            "executionTimeMs": 0
        })

    return json.dumps(results)
`;

self.onmessage = async (event) => {
  const { type, id, code, testCases } = event.data;

  if (type === 'INIT') {
    try {
      await loadPyodideRuntime();
      self.postMessage({ type: 'INIT_SUCCESS', id });
    } catch (err) {
      self.postMessage({ type: 'INIT_ERROR', id, error: err.message });
    }
    return;
  }

  if (type === 'RUN_CODE') {
    const startTime = performance.now();
    try {
      const py = await loadPyodideRuntime();

      // Setup output capture
      await py.runPythonAsync(`
import sys
import io
_capture_stdout = io.StringIO()
_capture_stderr = io.StringIO()
sys.stdout = _capture_stdout
sys.stderr = _capture_stderr
      `);

      let runtimeError = null;
      try {
        await py.runPythonAsync(code);
      } catch (err) {
        runtimeError = err.message || String(err);
      }

      const stdout = await py.runPythonAsync(`_capture_stdout.getvalue()`);
      const stderr = await py.runPythonAsync(`_capture_stderr.getvalue()`);

      // Reset standard IO
      await py.runPythonAsync(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
      `);

      const elapsed = Math.round(performance.now() - startTime);

      self.postMessage({
        type: 'RUN_COMPLETE',
        id,
        stdout: stdout || '',
        stderr: stderr || '',
        error: runtimeError,
        executionTimeMs: elapsed,
      });
    } catch (err) {
      self.postMessage({
        type: 'ERROR',
        id,
        error: err.message || 'Execution failed',
        executionTimeMs: Math.round(performance.now() - startTime),
      });
    }
    return;
  }

  if (type === 'RUN_TESTS') {
    const startTime = performance.now();
    try {
      const py = await loadPyodideRuntime();

      // Load harness if not loaded
      await py.runPythonAsync(HARNESS_SCRIPT);

      // Pass user code and test cases
      py.globals.set('__req_code', code);
      py.globals.set('__req_tc', JSON.stringify(testCases || []));

      const resultsJson = await py.runPythonAsync(`
_run_challenge_code(__req_code, __req_tc)
      `);

      const testResults = JSON.parse(resultsJson);
      const elapsed = Math.round(performance.now() - startTime);

      self.postMessage({
        type: 'TESTS_COMPLETE',
        id,
        testResults,
        executionTimeMs: elapsed,
      });
    } catch (err) {
      self.postMessage({
        type: 'ERROR',
        id,
        error: err.message || 'Test suite evaluation failed',
        executionTimeMs: Math.round(performance.now() - startTime),
      });
    }
  }
};
