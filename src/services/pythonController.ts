import { TestCase } from '../types/challenge';
import { PyodideStatus, TestResult } from '../types/pyodide';

export interface RunCodeResult {
  stdout: string;
  stderr: string;
  error: string | null;
  executionTimeMs: number;
}

export interface RunTestsResult {
  testResults: TestResult[];
  error: string | null;
  executionTimeMs: number;
}

class PythonController {
  private worker: Worker | null = null;
  private status: PyodideStatus = 'idle';
  private statusListeners: ((status: PyodideStatus) => void)[] = [];
  private activeRequest: {
    id: string;
    resolve: (val: any) => void;
    reject: (err: any) => void;
    timeoutId: ReturnType<typeof setTimeout> | number;
  } | null = null;

  constructor() {
    // We will initialize lazily or when requested
  }

  public getStatus(): PyodideStatus {
    return this.status;
  }

  public onStatusChange(callback: (status: PyodideStatus) => void): () => void {
    this.statusListeners.push(callback);
    callback(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter((cb) => cb !== callback);
    };
  }

  private setStatus(newStatus: PyodideStatus) {
    this.status = newStatus;
    this.statusListeners.forEach((cb) => cb(newStatus));
  }

  private getWorker(): Worker {
    if (!this.worker) {
      this.worker = new Worker('/python-worker.js');
      this.worker.onmessage = this.handleWorkerMessage.bind(this);
      this.worker.onerror = this.handleWorkerError.bind(this);
    }
    return this.worker;
  }

  private handleWorkerMessage(event: MessageEvent) {
    const data = event.data;
    if (!this.activeRequest || this.activeRequest.id !== data.id) {
      if (data.type === 'INIT_SUCCESS') {
        this.setStatus('ready');
      } else if (data.type === 'INIT_ERROR') {
        this.setStatus('error');
      }
      return;
    }

    clearTimeout(this.activeRequest.timeoutId);
    const { resolve } = this.activeRequest;
    this.activeRequest = null;
    this.setStatus('ready');

    if (data.type === 'RUN_COMPLETE') {
      resolve({
        stdout: data.stdout || '',
        stderr: data.stderr || '',
        error: data.error || null,
        executionTimeMs: data.executionTimeMs || 0,
      });
    } else if (data.type === 'TESTS_COMPLETE') {
      resolve({
        testResults: data.testResults || [],
        error: null,
        executionTimeMs: data.executionTimeMs || 0,
      });
    } else if (data.type === 'ERROR') {
      resolve({
        stdout: '',
        stderr: '',
        error: data.error || 'Execution failed',
        executionTimeMs: data.executionTimeMs || 0,
        testResults: [],
      });
    }
  }

  private handleWorkerError(error: ErrorEvent) {
    console.error('Python Worker encountered an unhandled error:', error);
    this.setStatus('error');
    if (this.activeRequest) {
      clearTimeout(this.activeRequest.timeoutId);
      this.activeRequest.resolve({
        stdout: '',
        stderr: '',
        error: error.message || 'Worker crash or network error',
        executionTimeMs: 0,
        testResults: [],
      });
      this.activeRequest = null;
    }
    this.recycleWorker();
  }

  private recycleWorker() {
    if (this.worker) {
      try {
        this.worker.terminate();
      } catch {
        // Ignore
      }
      this.worker = null;
    }
    // Pre-create next worker
    this.getWorker();
    this.setStatus('ready');
  }

  public async prewarm(): Promise<void> {
    if (this.status === 'ready' || this.status === 'loading') return;
    this.setStatus('loading');
    const worker = this.getWorker();
    const id = 'init_' + Date.now();

    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        this.setStatus('ready'); // Fallback ready state
        resolve();
      }, 15000);

      const listener = (event: MessageEvent) => {
        if (event.data.id === id) {
          clearTimeout(timeoutId);
          worker.removeEventListener('message', listener);
          this.setStatus(event.data.type === 'INIT_SUCCESS' ? 'ready' : 'ready');
          resolve();
        }
      };

      worker.addEventListener('message', listener);
      worker.postMessage({ type: 'INIT', id });
    });
  }

  public async runCode(code: string, timeoutMs: number = 10000): Promise<RunCodeResult> {
    const worker = this.getWorker();
    const id = 'run_' + Math.random().toString(36).substring(2, 9);
    this.setStatus('running');

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        // Watchdog Timeout (Infinite loop protection)
        this.recycleWorker();
        this.setStatus('ready');
        resolve({
          stdout: '',
          stderr: '',
          error:
            'Execution Timeout (10 seconds limit exceeded).\nPossible infinite loop detected in while/for loop.',
          executionTimeMs: timeoutMs,
        });
      }, timeoutMs);

      this.activeRequest = { id, resolve, reject, timeoutId };
      worker.postMessage({ type: 'RUN_CODE', id, code });
    });
  }

  public async runTests(
    code: string,
    testCases: TestCase[],
    timeoutMs: number = 10000
  ): Promise<RunTestsResult> {
    const worker = this.getWorker();
    const id = 'test_' + Math.random().toString(36).substring(2, 9);
    this.setStatus('running');

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        // Watchdog Timeout (Infinite loop protection)
        this.recycleWorker();
        this.setStatus('ready');
        resolve({
          testResults: testCases.map((tc) => ({
            testCaseId: tc.id,
            passed: false,
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            actualOutput: 'Timed out (Infinite loop detected)',
            error: 'Timeout exceeded 10 seconds.',
            executionTimeMs: timeoutMs,
          })),
          error:
            'Execution Timeout (10 seconds limit exceeded).\nPossible infinite loop in code submission.',
          executionTimeMs: timeoutMs,
        });
      }, timeoutMs);

      this.activeRequest = { id, resolve, reject, timeoutId };
      worker.postMessage({ type: 'RUN_TESTS', id, code, testCases });
    });
  }
}

export const pythonController = new PythonController();
