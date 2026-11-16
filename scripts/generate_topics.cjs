const fs = require('fs');
const path = require('path');

const allTopics = [
  // TOPIC 2: Operators
  {
    topicId: 'operators',
    file: 'topic02_operators.ts',
    nameEn: 'Operators',
    concepts: {
      beg: [
        { title: 'Addition & Subtraction', starter: 'a = 15\nb = 7\nprint(a + b)\n', output: '22' },
        { title: 'Multiplication', starter: 'x = 6\ny = 8\nprint(x * y)\n', output: '48' },
        { title: 'Float Division', starter: 'val = 20 / 4\nprint(int(val))\n', output: '5' },
        { title: 'Floor Division (//)', starter: 'a = 17\nb = 5\nprint(a // b)\n', output: '3' },
        { title: 'Modulo Remainder (%)', starter: 'n = 29\nprint(n % 6)\n', output: '5' },
        { title: 'Exponentiation (**)', starter: 'base = 2\nexp = 5\nprint(base ** exp)\n', output: '32' },
        { title: 'Equality Operator (==)', starter: 'x = 10\ny = 10\nprint(x == y)\n', output: 'True' },
        { title: 'Inequality Operator (!=)', starter: 'a = 5\nb = 9\nprint(a != b)\n', output: 'True' },
        { title: 'Greater Than (>)', starter: 'score = 85\nprint(score > 50)\n', output: 'True' },
        { title: 'Less Than or Equal (<=)', starter: 'level = 10\nprint(level <= 10)\n', output: 'True' },
      ],
      int: [
        { title: 'Logical AND', starter: 'hp = 80\nhas_shield = True\nprint(hp > 50 and has_shield)\n', output: 'True' },
        { title: 'Logical OR', starter: 'has_key = False\nis_admin = True\nprint(has_key or is_admin)\n', output: 'True' },
        { title: 'Logical NOT', starter: 'is_dead = False\nprint(not is_dead)\n', output: 'True' },
        { title: 'Bitwise AND (&)', starter: 'a = 12\nb = 10\nprint(a & b)\n', output: '8' },
        { title: 'Bitwise OR (|)', starter: 'a = 12\nb = 10\nprint(a | b)\n', output: '14' },
        { title: 'Bitwise XOR (^)', starter: 'a = 12\nb = 10\nprint(a ^ b)\n', output: '6' },
        { title: 'Left Bit Shift (<<)', starter: 'x = 3\nprint(x << 2)\n', output: '12' },
        { title: 'Right Bit Shift (>>)', starter: 'x = 16\nprint(x >> 2)\n', output: '4' },
        { title: 'Membership (in)', starter: 'inventory = ["sword", "potion"]\nprint("potion" in inventory)\n', output: 'True' },
        { title: 'Chained Comparison', starter: 'x = 15\nprint(10 < x < 20)\n', output: 'True' },
      ],
      adv: [
        { title: 'Operator Precedence', starter: 'result = 2 + 3 * 4 ** 2\nprint(result)\n', output: '50' },
        { title: 'In-Place Modulo Assign (%=)', starter: 'x = 47\nx %= 7\nprint(x)\n', output: '5' },
        { title: 'Bitwise Inversion (~)', starter: 'x = 5\nprint(~x)\n', output: '-6' },
        { title: 'Short-Circuit Value Fallback', starter: 'val = 0 or 42\nprint(val)\n', output: '42' },
        { title: 'Ternary Operator Expression', starter: 'score = 75\nstatus = "Pass" if score >= 50 else "Fail"\nprint(status)\n', output: 'Pass' },
        { title: 'Identity vs Equality in Lists', starter: 'a = [1, 2]\nb = [1, 2]\nprint(f"{a == b} {a is b}")\n', output: 'True False' },
        { title: 'Magic Add Method Overloading', starter: 'class Coin:\n    def __init__(self, v): self.v = v\n    def __add__(self, o): return self.v + o.v\nprint(Coin(10) + Coin(25))\n', output: '35' },
        { title: 'Bitmask Checking', starter: 'FLAG_A, FLAG_B = 1, 2\nstate = FLAG_A | FLAG_B\nprint((state & FLAG_B) == FLAG_B)\n', output: 'True' },
        { title: 'Walrus In-Expression Evaluation', starter: 'data = [5, 12, 18]\nif (n := sum(data)) > 30: print(n)\n', output: '35' },
        { title: 'Floor Division with Negative Numbers', starter: 'print(-7 // 2)\n', output: '-4' },
      ]
    }
  },

  // TOPIC 3: User Input
  {
    topicId: 'user-input',
    file: 'topic03_user_input.ts',
    nameEn: 'User Input',
    concepts: {
      beg: [
        { title: 'Read Single Line', starter: 'name = input()\nprint("Hello, " + name)\n', input: 'Tejas', output: 'Hello, Tejas' },
        { title: 'Read Integer Input', starter: 'age = int(input())\nprint(age + 5)\n', input: '20', output: '25' },
        { title: 'Read Float Input', starter: 'price = float(input())\nprint(int(price * 2))\n', input: '12.5', output: '25' },
        { title: 'Two Numbers Sum', starter: 'a = int(input())\nb = int(input())\nprint(a + b)\n', input: '14\n16', output: '30' },
        { title: 'Square of Input Number', starter: 'n = int(input())\nprint(n * n)\n', input: '7', output: '49' },
        { title: 'Greeting with Exclamation', starter: 'hero = input()\nprint(f"Welcome, {hero}!")\n', input: 'Warrior', output: 'Welcome, Warrior!' },
        { title: 'Multiply Input String', starter: 'char = input()\nprint(char * 4)\n', input: '*', output: '****' },
        { title: 'Strip Extra Whitespace', starter: 'text = input()\nprint(text.strip())\n', input: '   Python Quest   ', output: 'Python Quest' },
        { title: 'Boolean Evaluation of Input', starter: 'cmd = input()\nprint(bool(cmd.strip()))\n', input: 'start', output: 'True' },
        { title: 'Repeat Number as String', starter: 'digit = input()\nprint(digit * 3)\n', input: '5', output: '555' },
      ],
      int: [
        { title: 'Split Multiple Words', starter: 'words = input().split()\nprint(len(words))\n', input: 'Python is pure power', output: '4' },
        { title: 'List of Integers from Input', starter: 'nums = [int(x) for x in input().split()]\nprint(sum(nums))\n', input: '10 20 30', output: '60' },
        { title: 'Comma Separated Input', starter: 'items = input().split(",")\nprint(items[0].strip())\n', input: 'sword, shield, potion', output: 'sword' },
        { title: 'Input Upper Case Match', starter: 'choice = input().strip().upper()\nprint(choice)\n', input: 'yes', output: 'YES' },
        { title: 'Average of Input Numbers', starter: 'nums = [int(x) for x in input().split()]\nprint(int(sum(nums) / len(nums)))\n', input: '4 8 12', output: '8' },
        { title: 'First and Last Character', starter: 's = input()\nprint(s[0] + s[-1])\n', input: 'Code', output: 'Ce' },
        { title: 'Parse Key Value Pair', starter: 'line = input()\nk, v = line.split(":")\nprint(f"{k.strip()}={v.strip()}")\n', input: 'level : 42', output: 'level=42' },
        { title: 'Reversed Input String', starter: 'text = input()\nprint(text[::-1])\n', input: 'Quest', output: 'tseuQ' },
        { title: 'Sum of Two Floats', starter: 'f1 = float(input())\nf2 = float(input())\nprint(round(f1 + f2, 1))\n', input: '1.2\n3.4', output: '4.6' },
        { title: 'Check Number Even/Odd', starter: 'n = int(input())\nprint("Even" if n % 2 == 0 else "Odd")\n', input: '14', output: 'Even' },
      ],
      adv: [
        { title: 'Safe Integer Conversion with Default', starter: 'raw = input()\ntry:\n    val = int(raw)\nexcept ValueError:\n    val = 0\nprint(val)\n', input: 'abc', output: '0' },
        { title: 'Multi-Line Input until END', starter: 'lines = []\nwhile True:\n    line = input()\n    if line == "END": break\n    lines.append(line)\nprint(len(lines))\n', input: 'one\ntwo\nthree\nEND', output: '3' },
        { title: 'Matrix Diagonal Elements', starter: 'r1 = [int(x) for x in input().split()]\nr2 = [int(x) for x in input().split()]\nprint(r1[0] + r2[1])\n', input: '1 2\n3 4', output: '5' },
        { title: 'Extract Digits Only from Input', starter: 's = input()\nprint("".join(c for c in s if c.isdigit()))\n', input: 'Py3th9on', output: '39' },
        { title: 'Validate Email Domain', starter: 'email = input()\nprint(email.split("@")[1])\n', input: 'knight@python.org', output: 'python.org' },
        { title: 'Word Frequency from Input Line', starter: 'words = input().lower().split()\nprint(words.count("the"))\n', input: 'the cat and the dog', output: '2' },
        { title: 'Convert Binary String to Int', starter: 'b_str = input()\nprint(int(b_str, 2))\n', input: '1010', output: '10' },
        { title: 'Parse JSON Input String', starter: 'import json\nd = json.loads(input())\nprint(d["score"])\n', input: '{"score": 95}', output: '95' },
        { title: 'Tuple Coordinates Input', starter: 'coords = tuple(int(x) for x in input().split(","))\nprint(coords)\n', input: '10, 20', output: '(10, 20)' },
        { title: 'Sorted Unique Numbers from Input', starter: 'nums = sorted(list(set(int(x) for x in input().split())))\nprint(nums)\n', input: '4 2 4 1 2', output: '[1, 2, 4]' },
      ]
    }
  },

  // TOPIC 4: Strings
  {
    topicId: 'strings',
    file: 'topic04_strings.ts',
    nameEn: 'Strings',
    concepts: {
      beg: [
        { title: 'String Length', starter: 's = "Python"\nprint(len(s))\n', output: '6' },
        { title: 'Uppercase Conversion', starter: 's = "quest"\nprint(s.upper())\n', output: 'QUEST' },
        { title: 'Lowercase Conversion', starter: 's = "MASTER"\nprint(s.lower())\n', output: 'master' },
        { title: 'String Concatenation', starter: 'a = "Py"\nb = "thon"\nprint(a + b)\n', output: 'Python' },
        { title: 'First Character Index', starter: 's = "Gamer"\nprint(s[0])\n', output: 'G' },
        { title: 'Last Character Index', starter: 's = "Knight"\nprint(s[-1])\n', output: 't' },
        { title: 'String Repetition (*)', starter: 's = "Ha"\nprint(s * 3)\n', output: 'HaHaHa' },
        { title: 'f-String Variable Interpolation', starter: 'name = "Alex"\nlevel = 5\nprint(f"{name} is level {level}")\n', output: 'Alex is level 5' },
        { title: 'Strip Outer Spaces', starter: 's = "  Warrior  "\nprint(s.strip())\n', output: 'Warrior' },
        { title: 'Check Substring with in', starter: 's = "Master Python"\nprint("Python" in s)\n', output: 'True' },
      ],
      int: [
        { title: 'String Slicing [start:end]', starter: 's = "PythonQuest"\nprint(s[0:6])\n', output: 'Python' },
        { title: 'Step Slicing [::2]', starter: 's = "abcdef"\nprint(s[::2])\n', output: 'ace' },
        { title: 'Reverse a String [::-1]', starter: 's = "level"\nprint(s[::-1])\n', output: 'level' },
        { title: 'String Replace', starter: 's = "I like Java"\nprint(s.replace("Java", "Python"))\n', output: 'I like Python' },
        { title: 'Split into Words', starter: 's = "One Two Three"\nprint(s.split())\n', output: "['One', 'Two', 'Three']" },
        { title: 'Join Words with Hyphen', starter: 'words = ["super", "python", "quest"]\nprint("-".join(words))\n', output: 'super-python-quest' },
        { title: 'Count Occurrences', starter: 's = "banana"\nprint(s.count("a"))\n', output: '3' },
        { title: 'Starts With Prefix', starter: 'filename = "quest.py"\nprint(filename.endswith(".py"))\n', output: 'True' },
        { title: 'Find Substring Index', starter: 's = "Hello World"\nprint(s.find("World"))\n', output: '6' },
        { title: 'Title Case String', starter: 's = "python programming quest"\nprint(s.title())\n', output: 'Python Programming Quest' },
      ],
      adv: [
        { title: 'Palindrome Verification', starter: 'word = "radar"\nprint(word == word[::-1])\n', output: 'True' },
        { title: 'Vowel Counting', starter: 's = "aerodynamics"\nprint(sum(1 for c in s if c in "aeiou"))\n', output: '6' },
        { title: 'Format Specifier Padding', starter: 'n = 42\nprint(f"{n:05d}")\n', output: '00042' },
        { title: 'Filter Alphanumeric Only', starter: 's = "Hello, World! #2026"\nprint("".join(c for c in s if c.isalnum()))\n', output: 'HelloWorld2026' },
        { title: 'Anagram Test', starter: 's1, s2 = "listen", "silent"\nprint(sorted(s1) == sorted(s2))\n', output: 'True' },
        { title: 'String Capitalize vs Title', starter: 's = "python quest"\nprint(s.capitalize())\n', output: 'Python quest' },
        { title: 'Zfill String Padding', starter: 's = "7"\nprint(s.zfill(3))\n', output: '007' },
        { title: 'Center String with Padding', starter: 's = "XP"\nprint(s.center(6, "-"))\n', output: '--XP--' },
        { title: 'Partition String into 3-tuple', starter: 's = "user@domain.com"\nprint(s.partition("@"))\n', output: "('user', '@', 'domain.com')" },
        { title: 'Multi-line Raw String', starter: 's = r"C:\\Users\\admin"\nprint(s)\n', output: 'C:\\Users\\admin' },
      ]
    }
  },

  // TOPIC 5: Conditionals
  {
    topicId: 'conditionals',
    file: 'topic05_conditionals.ts',
    nameEn: 'Conditional Statements',
    concepts: {
      beg: [
        { title: 'Simple if Check', starter: 'hp = 10\nif hp > 0:\n    print("Alive")\n', output: 'Alive' },
        { title: 'if-else Branching', starter: 'score = 45\nif score >= 50: print("Pass")\nelse: print("Retry")\n', output: 'Retry' },
        { title: 'if-elif-else Scale', starter: 'grade = 85\nif grade >= 90: print("A")\nelif grade >= 80: print("B")\nelse: print("C")\n', output: 'B' },
        { title: 'Check Even or Odd', starter: 'n = 8\nprint("Even" if n % 2 == 0 else "Odd")\n', output: 'Even' },
        { title: 'Check Positive or Negative', starter: 'n = -5\nprint("Negative" if n < 0 else "Positive")\n', output: 'Negative' },
        { title: 'Find Maximum of Two', starter: 'a, b = 15, 22\nprint(a if a > b else b)\n', output: '22' },
        { title: 'Check Equality to Zero', starter: 'val = 0\nprint("Zero" if val == 0 else "NonZero")\n', output: 'Zero' },
        { title: 'Check Password Length', starter: 'pwd = "secret"\nprint("Valid" if len(pwd) >= 6 else "Short")\n', output: 'Valid' },
        { title: 'Check Character in String', starter: 'c, s = "x", "pixel"\nprint("Found" if c in s else "Missing")\n', output: 'Found' },
        { title: 'Check Adult Status', starter: 'age = 18\nprint("Adult" if age >= 18 else "Minor")\n', output: 'Adult' },
      ],
      int: [
        { title: 'Leap Year Check', starter: 'y = 2024\nprint("Leap" if (y % 4 == 0 and y % 100 != 0) or (y % 400 == 0) else "Normal")\n', output: 'Leap' },
        { title: 'Triangle Type Classifier', starter: 'a, b, c = 5, 5, 5\nprint("Equilateral" if a == b == c else "Other")\n', output: 'Equilateral' },
        { title: 'Nested Conditionals', starter: 'x = 12\nif x > 0:\n    if x % 2 == 0: print("Positive Even")\n', output: 'Positive Even' },
        { title: 'Quadrant of Point (x, y)', starter: 'x, y = -3, 4\nprint("Q2" if x < 0 and y > 0 else "Other")\n', output: 'Q2' },
        { title: 'BMI Category', starter: 'bmi = 22.5\nprint("Normal" if 18.5 <= bmi < 25 else "Other")\n', output: 'Normal' },
        { title: 'FizzBuzz Check', starter: 'n = 15\nprint("FizzBuzz" if n % 15 == 0 else "None")\n', output: 'FizzBuzz' },
        { title: 'Short-Circuit with Guard', starter: 'lst = []\nprint("Empty" if not lst else lst[0])\n', output: 'Empty' },
        { title: 'Check Vowel or Consonant', starter: 'ch = "e"\nprint("Vowel" if ch in "aeiou" else "Consonant")\n', output: 'Vowel' },
        { title: 'Validate Coordinate Bounds', starter: 'x, y = 5, 8\nprint("In Bounds" if 0 <= x <= 10 and 0 <= y <= 10 else "Out")\n', output: 'In Bounds' },
        { title: 'Discount Tier Calculator', starter: 'amt = 150\ndisc = 20 if amt > 100 else 10\nprint(amt - disc)\n', output: '130' },
      ],
      adv: [
        { title: 'Match-Case Pattern Matching', starter: 'role = "admin"\nmatch role:\n    case "admin": print("Full Access")\n    case _: print("No Access")\n', output: 'Full Access' },
        { title: 'Ternary Expression in Return', starter: 'def sign(n): return "Pos" if n > 0 else ("Zero" if n == 0 else "Neg")\nprint(sign(0))\n', output: 'Zero' },
        { title: 'Condition with Walrus Assignment', starter: 'items = ["sword", "shield"]\nif (c := len(items)) >= 2: print(f"Equipped: {c}")\n', output: 'Equipped: 2' },
        { title: 'All and Any Evaluator', starter: 'flags = [True, True, False]\nprint(f"{any(flags)} {all(flags)}")\n', output: 'True False' },
        { title: 'Check Valid Hex Color Code', starter: 'code = "#FF5733"\nprint("Valid" if len(code) == 7 and code.startswith("#") else "Invalid")\n', output: 'Valid' },
        { title: 'Day of Week from Number', starter: 'days = {1: "Mon", 2: "Tue", 3: "Wed"}\nprint(days.get(2, "Invalid"))\n', output: 'Tue' },
        { title: 'Strict Type and Value Check', starter: 'val = 1\nprint("Int One" if type(val) is int and val == 1 else "Other")\n', output: 'Int One' },
        { title: 'Credit Score Rating', starter: 'score = 750\nprint("Very Good" if score >= 740 else "Fair")\n', output: 'Very Good' },
        { title: 'Roman Numeral Basic Convert', starter: 'n = 4\nprint("IV" if n == 4 else "Other")\n', output: 'IV' },
        { title: 'Temperature State of Water', starter: 't = 105\nprint("Gas" if t >= 100 else "Liquid")\n', output: 'Gas' },
      ]
    }
  },

  // TOPIC 6: Loops
  {
    topicId: 'loops',
    file: 'topic06_loops.ts',
    nameEn: 'Loops',
    concepts: {
      beg: [
        { title: 'Count 1 to 5', starter: 'for i in range(1, 6): print(i)\n', output: '1\n2\n3\n4\n5' },
        { title: 'Sum of Numbers 1 to 5', starter: 'total = sum(range(1, 6))\nprint(total)\n', output: '15' },
        { title: 'Print List Elements', starter: 'fruits = ["apple", "banana"]\nfor f in fruits: print(f)\n', output: 'apple\nbanana' },
        { title: 'Iterate String Characters', starter: 'for c in "Py": print(c)\n', output: 'P\ny' },
        { title: 'Basic While Loop', starter: 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1\n', output: '3\n2\n1' },
        { title: 'Even Numbers 2 to 8', starter: 'for i in range(2, 9, 2): print(i)\n', output: '2\n4\n6\n8' },
        { title: 'Multiplication Table for 3', starter: 'for i in range(1, 4): print(3 * i)\n', output: '3\n6\n9' },
        { title: 'Break Statement in Loop', starter: 'for i in range(1, 10):\n    if i == 3: break\n    print(i)\n', output: '1\n2' },
        { title: 'Continue Statement', starter: 'for i in range(1, 5):\n    if i == 3: continue\n    print(i)\n', output: '1\n2\n4' },
        { title: 'Loop Else Clause', starter: 'for i in range(2):\n    print(i)\nelse: print("Done")\n', output: '0\n1\nDone' },
      ],
      int: [
        { title: 'Factorial with Loop', starter: 'ans = 1\nfor i in range(1, 6): ans *= i\nprint(ans)\n', output: '120' },
        { title: 'Reverse Countdown with range', starter: 'for i in range(5, 0, -1): print(i)\n', output: '5\n4\n3\n2\n1' },
        { title: 'Enumerate with Index', starter: 'heroes = ["Link", "Zelda"]\nfor idx, h in enumerate(heroes): print(f"{idx}:{h}")\n', output: '0:Link\n1:Zelda' },
        { title: 'Nested Loop 2x2 Grid', starter: 'for r in range(2):\n    for c in range(2): print(f"({r},{c})")\n', output: '(0,0)\n(0,1)\n(1,0)\n(1,1)' },
        { title: 'Fibonacci Sequence', starter: 'a, b = 0, 1\nfor _ in range(5):\n    print(a)\n    a, b = b, a + b\n', output: '0\n1\n1\n2\n3' },
        { title: 'Find First Divisible by 7', starter: 'for x in [10, 15, 21, 28]:\n    if x % 7 == 0: print(x); break\n', output: '21' },
        { title: 'Count Negatives in List', starter: 'nums = [3, -1, 4, -5, -9, 2]\nprint(sum(1 for x in nums if x < 0))\n', output: '3' },
        { title: 'Accumulated Product', starter: 'p = 1\nfor x in [2, 3, 4]: p *= x\nprint(p)\n', output: '24' },
        { title: 'Sum of Digits in Integer', starter: 'print(sum(int(c) for c in str(1234)))\n', output: '10' },
        { title: 'Zip Two Lists in Loop', starter: 'for k, v in zip(["A", "B"], [1, 2]): print(f"{k}={v}")\n', output: 'A=1\nB=2' },
      ],
      adv: [
        { title: 'Prime Number Verification', starter: 'n = 17\nprint(all(n % i != 0 for i in range(2, int(n**0.5) + 1)))\n', output: 'True' },
        { title: 'Print Triangle Star Pattern', starter: 'for i in range(1, 4): print("*" * i)\n', output: '*\n**\n***' },
        { title: 'Flatten 2D Matrix with Loop', starter: 'matrix = [[1, 2], [3, 4]]\nprint([x for r in matrix for x in r])\n', output: '[1, 2, 3, 4]' },
        { title: 'Collatz Conjecture Steps', starter: 'n, steps = 6, 0\nwhile n != 1:\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    steps += 1\nprint(steps)\n', output: '8' },
        { title: 'Greatest Common Divisor (Euclid)', starter: 'a, b = 48, 18\nwhile b: a, b = b, a % b\nprint(a)\n', output: '6' },
        { title: 'Find Duplicate Elements in List', starter: 'nums = [1, 2, 3, 2, 4, 1]\nseen, dupes = set(), set()\nfor x in nums:\n    if x in seen: dupes.add(x)\n    seen.add(x)\nprint(sorted(list(dupes)))\n', output: '[1, 2]' },
        { title: 'Pascal Triangle First 3 Rows', starter: 'for r in [[1], [1, 1], [1, 2, 1]]: print(r)\n', output: '[1]\n[1, 1]\n[1, 2, 1]' },
        { title: 'Binary Search Implementation', starter: 'arr = [2, 4, 6, 8, 10]\ntarget, low, high, ans = 8, 0, 4, -1\nwhile low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == target: ans = mid; break\n    elif arr[mid] < target: low = mid + 1\n    else: high = mid - 1\nprint(ans)\n', output: '3' },
        { title: 'Reverse a Number Mathematically', starter: 'n, rev = 123, 0\nwhile n > 0:\n    rev = rev * 10 + n % 10\n    n //= 10\nprint(rev)\n', output: '321' },
        { title: 'Matrix Transposition with Nested Loop', starter: 'mat = [[1, 2], [3, 4]]\nprint([[mat[j][i] for j in range(2)] for i in range(2)])\n', output: '[[1, 3], [2, 4]]' },
      ]
    }
  },

  // TOPIC 7: Functions
  {
    topicId: 'functions',
    file: 'topic07_functions.ts',
    nameEn: 'Functions',
    concepts: {
      beg: [
        { title: 'Define Simple Function', starter: 'def greet():\n    print("Hello, Quest!")\ngreet()\n', output: 'Hello, Quest!' },
        { title: 'Function with Parameter', starter: 'def square(n):\n    return n * n\nprint(square(6))\n', output: '36' },
        { title: 'Function Adding Two Numbers', starter: 'def add(a, b):\n    return a + b\nprint(add(12, 18))\n', output: '30' },
        { title: 'Default Argument Value', starter: 'def welcome(name="Adventurer"):\n    return f"Greetings, {name}"\nprint(welcome())\n', output: 'Greetings, Adventurer' },
        { title: 'Return Multiple Values', starter: 'def min_max(a, b):\n    return min(a, b), max(a, b)\nprint(min_max(10, 5))\n', output: '(5, 10)' },
        { title: 'Check Even in Function', starter: 'def is_even(n):\n    return n % 2 == 0\nprint(is_even(8))\n', output: 'True' },
        { title: 'Multiply String in Function', starter: 'def repeat_word(w, times):\n    return w * times\nprint(repeat_word("Go", 3))\n', output: 'GoGoGo' },
        { title: 'Convert Celsius to Fahrenheit', starter: 'def c_to_f(c):\n    return int(c * 9 / 5 + 32)\nprint(c_to_f(100))\n', output: '212' },
        { title: 'Function Calculating Area', starter: 'def rect_area(w, h):\n    return w * h\nprint(rect_area(5, 7))\n', output: '35' },
        { title: 'Print None Return Value', starter: 'def no_return():\n    pass\nprint(no_return())\n', output: 'None' },
      ],
      int: [
        { title: 'Variable Keyword Arguments (*args)', starter: 'def sum_all(*args):\n    return sum(args)\nprint(sum_all(1, 2, 3, 4, 5))\n', output: '15' },
        { title: 'Arbitrary Keyword Args (**kwargs)', starter: 'def describe_hero(**kwargs):\n    return f"{kwargs.get(\'name\')}:{kwargs.get(\'hp\')}"\nprint(describe_hero(name="Knight", hp=100))\n', output: 'Knight:100' },
        { title: 'Recursive Factorial', starter: 'def fact(n):\n    return 1 if n <= 1 else n * fact(n - 1)\nprint(fact(5))\n', output: '120' },
        { title: 'Recursive Fibonacci', starter: 'def fib(n):\n    return n if n <= 1 else fib(n - 1) + fib(n - 2)\nprint(fib(6))\n', output: '8' },
        { title: 'Lambda Function', starter: 'double = lambda x: x * 2\nprint(double(7))\n', output: '14' },
        { title: 'Map with Lambda', starter: 'nums = [1, 2, 3]\nprint(list(map(lambda x: x + 10, nums)))\n', output: '[11, 12, 13]' },
        { title: 'Filter with Lambda', starter: 'nums = [1, 2, 3, 4, 5, 6]\nprint(list(filter(lambda x: x % 2 == 0, nums)))\n', output: '[2, 4, 6]' },
        { title: 'Keyword-Only Arguments (*, param)', starter: 'def power(*, base, exp):\n    return base ** exp\nprint(power(base=2, exp=4))\n', output: '16' },
        { title: 'Docstring Inspection', starter: 'def quest():\n    """Quest Doc"""\n    pass\nprint(quest.__doc__)\n', output: 'Quest Doc' },
        { title: 'Higher Order Function', starter: 'def apply_twice(fn, val):\n    return fn(fn(val))\nprint(apply_twice(lambda x: x + 3, 4))\n', output: '10' },
      ],
      adv: [
        { title: 'Function Decorator Pattern', starter: 'def star_banner(fn):\n    def wrapper():\n        return f"*{fn()}*"\n    return wrapper\n@star_banner\ndef hello(): return "Hello"\nprint(hello())\n', output: '*Hello*' },
        { title: 'Memoization Decorator', starter: 'memo = {}\ndef memoized_fib(n):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = memoized_fib(n-1) + memoized_fib(n-2)\n    return memo[n]\nprint(memoized_fib(10))\n', output: '55' },
        { title: 'Closure Function Builder', starter: 'def make_multiplier(k):\n    return lambda x: x * k\ntriple = make_multiplier(3)\nprint(triple(9))\n', output: '27' },
        { title: 'Generator Function with Yield', starter: 'def count_up(n):\n    for i in range(1, n + 1): yield i\nprint(list(count_up(3)))\n', output: '[1, 2, 3]' },
        { title: 'Partial Function Application', starter: 'from functools import partial\ndef mult(a, b): return a * b\ndouble = partial(mult, 2)\nprint(double(8))\n', output: '16' },
        { title: 'Reduce Function Aggregator', starter: 'from functools import reduce\nprint(reduce(lambda a, b: a * b, [1, 2, 3, 4]))\n', output: '24' },
        { title: 'Positional-Only Arguments (/, param)', starter: 'def div(a, b, /):\n    return a // b\nprint(div(20, 4))\n', output: '5' },
        { title: 'Function Annotations Introspection', starter: 'def add(x: int, y: int) -> int: return x + y\nprint(add.__annotations__["return"].__name__)\n', output: 'int' },
        { title: 'Tail-Call Style Helper', starter: 'def sum_range(n, acc=0):\n    return acc if n == 0 else sum_range(n - 1, acc + n)\nprint(sum_range(5))\n', output: '15' },
        { title: 'Unpack Dict to Keyword Args (**)', starter: 'def display(x, y): return f"{x},{y}"\nparams = {"x": 10, "y": 20}\nprint(display(**params))\n', output: '10,20' },
      ]
    }
  },

  // TOPIC 8: Lists
  {
    topicId: 'lists',
    file: 'topic08_lists.ts',
    nameEn: 'Lists',
    concepts: {
      beg: [
        { title: 'Create and Print List', starter: 'items = [10, 20, 30]\nprint(items)\n', output: '[10, 20, 30]' },
        { title: 'List Length', starter: 'heroes = ["Warrior", "Mage", "Rogue"]\nprint(len(heroes))\n', output: '3' },
        { title: 'Access First and Last', starter: 'nums = [5, 10, 15, 20]\nprint(f"{nums[0]} {nums[-1]}")\n', output: '5 20' },
        { title: 'Append Element', starter: 'arr = [1, 2]\narr.append(3)\nprint(arr)\n', output: '[1, 2, 3]' },
        { title: 'Insert at Index', starter: 'arr = [1, 3]\narr.insert(1, 2)\nprint(arr)\n', output: '[1, 2, 3]' },
        { title: 'Pop Last Element', starter: 'arr = [10, 20, 30]\nval = arr.pop()\nprint(val)\n', output: '30' },
        { title: 'Remove by Value', starter: 'arr = ["a", "b", "c"]\narr.remove("b")\nprint(arr)\n', output: "['a', 'c']" },
        { title: 'Sum and Min/Max of List', starter: 'nums = [4, 1, 9, 3]\nprint(f"{sum(nums)} {max(nums)}")\n', output: '17 9' },
        { title: 'Check Value with in', starter: 'names = ["Link", "Zelda"]\nprint("Link" in names)\n', output: 'True' },
        { title: 'Clear All Elements', starter: 'arr = [1, 2, 3]\narr.clear()\nprint(arr)\n', output: '[]' },
      ],
      int: [
        { title: 'List Slicing Subarray', starter: 'nums = [0, 1, 2, 3, 4, 5]\nprint(nums[1:4])\n', output: '[1, 2, 3]' },
        { title: 'Reverse List with In-Place reverse()', starter: 'arr = [1, 2, 3]\narr.reverse()\nprint(arr)\n', output: '[3, 2, 1]' },
        { title: 'Sort Numbers Ascending', starter: 'nums = [5, 2, 8, 1]\nnums.sort()\nprint(nums)\n', output: '[1, 2, 5, 8]' },
        { title: 'Sort Numbers Descending', starter: 'nums = [3, 9, 2]\nnums.sort(reverse=True)\nprint(nums)\n', output: '[9, 3, 2]' },
        { title: 'List Comprehension: Squares', starter: 'print([x**2 for x in range(1, 5)])\n', output: '[1, 4, 9, 16]' },
        { title: 'List Comprehension with Filter', starter: 'print([x for x in range(1, 7) if x % 2 == 0])\n', output: '[2, 4, 6]' },
        { title: 'Extend List with Iterable', starter: 'a = [1, 2]\na.extend([3, 4])\nprint(a)\n', output: '[1, 2, 3, 4]' },
        { title: 'Count Occurrences in List', starter: 'items = [1, 2, 1, 3, 1]\nprint(items.count(1))\n', output: '3' },
        { title: 'Find Index of Element', starter: 'chars = ["a", "b", "c"]\nprint(chars.index("b"))\n', output: '1' },
        { title: 'List Multiplication (*)', starter: 'zeros = [0] * 4\nprint(zeros)\n', output: '[0, 0, 0, 0]' },
      ],
      adv: [
        { title: '2D Matrix Comprehension', starter: 'grid = [[r * c for c in range(1, 3)] for r in range(1, 3)]\nprint(grid)\n', output: '[[1, 2], [2, 4]]' },
        { title: 'Flatten Nested Lists', starter: 'nested = [[1, 2], [3, 4]]\nprint([item for sub in nested for item in sub])\n', output: '[1, 2, 3, 4]' },
        { title: 'Sort by Custom Key', starter: 'words = ["python", "is", "awesome"]\nwords.sort(key=len)\nprint(words)\n', output: "['is', 'python', 'awesome']" },
        { title: 'Chunking a List', starter: 'lst = [1, 2, 3, 4, 5, 6]\nchunks = [lst[i:i+2] for i in range(0, len(lst), 2)]\nprint(chunks)\n', output: '[[1, 2], [3, 4], [5, 6]]' },
        { title: 'Remove All Occurrences', starter: 'nums = [1, 2, 3, 2, 4, 2]\nprint([x for x in nums if x != 2])\n', output: '[1, 3, 4]' },
        { title: 'Intersection of Two Lists', starter: 'a = [1, 2, 3, 4]\nb = [3, 4, 5, 6]\nprint([x for x in a if x in b])\n', output: '[3, 4]' },
        { title: 'Rotate List Right by K=2', starter: 'lst = [1, 2, 3, 4, 5]\nk = 2\nprint(lst[-k:] + lst[:-k])\n', output: '[4, 5, 1, 2, 3]' },
        { title: 'List Copy Safety', starter: 'orig = [1, 2]\nclone = orig.copy()\nclone.append(3)\nprint(f"{orig} {clone}")\n', output: '[1, 2] [1, 2, 3]' },
        { title: 'Transpose Matrix with zip(*)', starter: 'matrix = [[1, 2], [3, 4]]\nprint([list(row) for row in zip(*matrix)])\n', output: '[[1, 3], [2, 4]]' },
        { title: 'Running Cumulative Sum', starter: 'nums = [1, 2, 3, 4]\nacc = 0\nres = []\nfor x in nums: acc += x; res.append(acc)\nprint(res)\n', output: '[1, 3, 6, 10]' },
      ]
    }
  },

  // TOPIC 9: Tuples
  {
    topicId: 'tuples',
    file: 'topic09_tuples.ts',
    nameEn: 'Tuples',
    concepts: {
      beg: [
        { title: 'Create Tuple', starter: 't = (1, 2, 3)\nprint(t)\n', output: '(1, 2, 3)' },
        { title: 'Single Element Tuple', starter: 't = (42,)\nprint(type(t).__name__)\n', output: 'tuple' },
        { title: 'Access Tuple Element', starter: 't = ("a", "b", "c")\nprint(t[1])\n', output: 'b' },
        { title: 'Tuple Length', starter: 't = (10, 20, 30, 40)\nprint(len(t))\n', output: '4' },
        { title: 'Tuple Slicing', starter: 't = (0, 1, 2, 3, 4)\nprint(t[1:3])\n', output: '(1, 2)' },
        { title: 'Concatenate Two Tuples', starter: 't1, t2 = (1, 2), (3, 4)\nprint(t1 + t2)\n', output: '(1, 2, 3, 4)' },
        { title: 'Repeat Tuple (*)', starter: 't = ("x",)\nprint(t * 3)\n', output: "('x', 'x', 'x')" },
        { title: 'Check Member with in', starter: 't = (5, 10, 15)\nprint(10 in t)\n', output: 'True' },
        { title: 'Tuple Count Method', starter: 't = (1, 2, 1, 3, 1)\nprint(t.count(1))\n', output: '3' },
        { title: 'Tuple Index Method', starter: 't = ("apple", "banana")\nprint(t.index("banana"))\n', output: '1' },
      ],
      int: [
        { title: 'Tuple Unpacking', starter: 'point = (10, 20)\nx, y = point\nprint(f"{x},{y}")\n', output: '10,20' },
        { title: 'Extended Starred Unpack (*rest)', starter: 't = (1, 2, 3, 4)\na, *mid, b = t\nprint(mid)\n', output: '[2, 3]' },
        { title: 'Convert List to Tuple', starter: 'lst = [4, 5, 6]\nprint(tuple(lst))\n', output: '(4, 5, 6)' },
        { title: 'Convert Tuple to List', starter: 't = (7, 8, 9)\nprint(list(t))\n', output: '[7, 8, 9]' },
        { title: 'Min and Max of Tuple', starter: 't = (15, 3, 88, 22)\nprint(f"{min(t)} {max(t)}")\n', output: '3 88' },
        { title: 'Immutability Verification', starter: 't = (1, 2)\ntry:\n    t[0] = 99\nexcept TypeError:\n    print("Immutable")\n', output: 'Immutable' },
        { title: 'Swap with Tuples', starter: 'a, b = 1, 2\na, b = b, a\nprint(f"{a} {b}")\n', output: '2 1' },
        { title: 'Nested Tuple Indexing', starter: 'matrix = ((1, 2), (3, 4))\nprint(matrix[1][0])\n', output: '3' },
        { title: 'Tuple Sorting via sorted()', starter: 't = (5, 1, 4)\nprint(tuple(sorted(t)))\n', output: '(1, 4, 5)' },
        { title: 'Sum of Tuple Elements', starter: 't = (10, 20, 30)\nprint(sum(t))\n', output: '60' },
      ],
      adv: [
        { title: 'Named Tuple Basics', starter: 'from collections import namedtuple\nPoint = namedtuple("Point", ["x", "y"])\np = Point(3, 4)\nprint(f"{p.x} {p.y}")\n', output: '3 4' },
        { title: 'Tuples as Dictionary Keys', starter: 'grid = {(0, 0): "Start", (1, 1): "End"}\nprint(grid[(1, 1)])\n', output: 'End' },
        { title: 'Tuple Memory Efficiency vs List', starter: 'import sys\nt = (1, 2, 3)\nl = [1, 2, 3]\nprint(sys.getsizeof(t) < sys.getsizeof(l))\n', output: 'True' },
        { title: 'Tuple of Mutable Objects', starter: 't = ([1, 2], [3, 4])\nt[0].append(99)\nprint(t)\n', output: '([1, 2, 99], [3, 4])' },
        { title: 'Zip into Tuples', starter: 'names, scores = ["A", "B"], [90, 80]\nprint(list(zip(names, scores)))\n', output: "[('A', 90), ('B', 80)]" },
        { title: 'Function Returning NamedTuple', starter: 'from collections import namedtuple\nStats = namedtuple("Stats", "hp mana")\ndef get_stats(): return Stats(100, 50)\nprint(get_stats().hp)\n', output: '100' },
        { title: 'Filter Tuple with Generator', starter: 't = (1, 2, 3, 4, 5)\nprint(tuple(x for x in t if x % 2 == 0))\n', output: '(2, 4)' },
        { title: 'Hashability of Tuples', starter: 't = (1, "a", (2, 3))\nprint(hash(t) != 0)\n', output: 'True' },
        { title: 'Unpack in Function Call (*t)', starter: 'def volume(w, h, d): return w * h * d\ndim = (2, 3, 4)\nprint(volume(*dim))\n', output: '24' },
        { title: 'Sort List of Tuples by Second Key', starter: 'data = [("apple", 5), ("banana", 2)]\ndata.sort(key=lambda x: x[1])\nprint(data)\n', output: "[('banana', 2), ('apple', 5)]" },
      ]
    }
  },

  // TOPIC 10: Dictionaries
  {
    topicId: 'dictionaries',
    file: 'topic10_dictionaries.ts',
    nameEn: 'Dictionaries',
    concepts: {
      beg: [
        { title: 'Create Dictionary', starter: 'hero = {"name": "Arthur", "level": 1}\nprint(hero["name"])\n', output: 'Arthur' },
        { title: 'Add Key-Value Pair', starter: 'd = {"a": 1}\nd["b"] = 2\nprint(d)\n', output: "{'a': 1, 'b': 2}" },
        { title: 'Update Existing Value', starter: 'd = {"gold": 100}\nd["gold"] = 150\nprint(d["gold"])\n', output: '150' },
        { title: 'Safe Access with get()', starter: 'd = {"hp": 50}\nprint(d.get("mana", 0))\n', output: '0' },
        { title: 'Delete Key with del', starter: 'd = {"a": 1, "b": 2}\ndel d["a"]\nprint(d)\n', output: "{'b': 2}" },
        { title: 'Check Key with in', starter: 'd = {"sword": 1}\nprint("sword" in d)\n', output: 'True' },
        { title: 'Get All Keys', starter: 'd = {"x": 1, "y": 2}\nprint(list(d.keys()))\n', output: "['x', 'y']" },
        { title: 'Get All Values', starter: 'd = {"x": 10, "y": 20}\nprint(list(d.values()))\n', output: '[10, 20]' },
        { title: 'Dictionary Length', starter: 'd = {"a": 1, "b": 2, "c": 3}\nprint(len(d))\n', output: '3' },
        { title: 'Clear Dictionary', starter: 'd = {"k": 1}\nd.clear()\nprint(d)\n', output: '{}' },
      ],
      int: [
        { title: 'Iterate Keys and Values with items()', starter: 'd = {"A": 1, "B": 2}\nfor k, v in d.items(): print(f"{k}:{v}")\n', output: 'A:1\nB:2' },
        { title: 'Dictionary Comprehension', starter: 'print({x: x**2 for x in range(1, 4)})\n', output: '{1: 1, 2: 4, 3: 9}' },
        { title: 'Merge Two Dicts with | (Python 3.9+)', starter: 'd1, d2 = {"a": 1}, {"b": 2}\nprint(d1 | d2)\n', output: "{'a': 1, 'b': 2}" },
        { title: 'Update Dict with update()', starter: 'd = {"a": 1}\nd.update({"b": 2, "c": 3})\nprint(len(d))\n', output: '3' },
        { title: 'Setdefault Method', starter: 'd = {"hp": 100}\nval = d.setdefault("mana", 50)\nprint(f"{val} {d[\'mana\']}")\n', output: '50 50' },
        { title: 'Count Word Frequencies', starter: 'words = ["apple", "banana", "apple"]\ncounts = {}\nfor w in words: counts[w] = counts.get(w, 0) + 1\nprint(counts["apple"])\n', output: '2' },
        { title: 'Pop Key with Default', starter: 'd = {"a": 1}\nval = d.pop("b", 404)\nprint(val)\n', output: '404' },
        { title: 'Invert Key and Values', starter: 'd = {"a": 1, "b": 2}\ninv = {v: k for k, v in d.items()}\nprint(inv[1])\n', output: 'a' },
        { title: 'Nested Dictionary Access', starter: 'hero = {"stats": {"atk": 45}}\nprint(hero["stats"]["atk"])\n', output: '45' },
        { title: 'Filter Dictionary by Value', starter: 'scores = {"A": 85, "B": 40, "C": 92}\nprint({k: v for k, v in scores.items() if v >= 50})\n', output: "{'A': 85, 'C': 92}" },
      ],
      adv: [
        { title: 'Defaultdict from collections', starter: 'from collections import defaultdict\nd = defaultdict(int)\nd["xp"] += 50\nprint(d["xp"])\n', output: '50' },
        { title: 'Counter from collections', starter: 'from collections import Counter\nc = Counter("banana")\nprint(c["a"])\n', output: '3' },
        { title: 'Sort Dictionary by Values', starter: 'd = {"b": 2, "a": 5, "c": 1}\nsorted_d = dict(sorted(d.items(), key=lambda x: x[1]))\nprint(list(sorted_d.keys()))\n', output: "['c', 'b', 'a']" },
        { title: 'Group Items into List Dict', starter: 'pairs = [("odd", 1), ("even", 2), ("odd", 3)]\nres = {}\nfor k, v in pairs:\n    res.setdefault(k, []).append(v)\nprint(res["odd"])\n', output: '[1, 3]' },
        { title: 'Deep Merge Two Dicts', starter: 'd1 = {"a": {"x": 1}}\nd2 = {"a": {"y": 2}}\nmerged = {"a": {**d1["a"], **d2["a"]}}\nprint(merged["a"])\n', output: "{'x': 1, 'y': 2}" },
        { title: 'Dict Unpacking as Keyword Args', starter: 'def stats(hp, mana): return hp + mana\nparams = {"hp": 100, "mana": 50}\nprint(stats(**params))\n', output: '150' },
        { title: 'Dict Fromkeys Factory', starter: 'keys = ["hp", "mana", "stamina"]\nprint(dict.fromkeys(keys, 100))\n', output: "{'hp': 100, 'mana': 100, 'stamina': 100}" },
        { title: 'OrderedDict Equality Semantics', starter: 'from collections import OrderedDict\nod1 = OrderedDict([("a", 1), ("b", 2)])\nod2 = OrderedDict([("b", 2), ("a", 1)])\nprint(od1 == od2)\n', output: 'False' },
        { title: 'Find Key with Max Value', starter: 'd = {"iron": 10, "gold": 50, "silver": 25}\nprint(max(d, key=d.get))\n', output: 'gold' },
        { title: 'ChainMap Lookup', starter: 'from collections import ChainMap\ndefaults = {"theme": "dark", "sound": True}\nuser = {"theme": "neon"}\ncfg = ChainMap(user, defaults)\nprint(f"{cfg[\'theme\']}:{cfg[\'sound\']}")\n', output: 'neon:True' },
      ]
    }
  },

  // TOPIC 11: Sets
  {
    topicId: 'sets',
    file: 'topic11_sets.ts',
    nameEn: 'Sets',
    concepts: {
      beg: [
        { title: 'Create Set', starter: 's = {1, 2, 3}\nprint(sorted(list(s)))\n', output: '[1, 2, 3]' },
        { title: 'Add Element to Set', starter: 's = {1, 2}\ns.add(3)\nprint(sorted(list(s)))\n', output: '[1, 2, 3]' },
        { title: 'Remove Duplicates with set()', starter: 'lst = [1, 2, 2, 3, 1]\nprint(sorted(list(set(lst))))\n', output: '[1, 2, 3]' },
        { title: 'Discard Non-existent Element', starter: 's = {1, 2}\ns.discard(99)\nprint(sorted(list(s)))\n', output: '[1, 2]' },
        { title: 'Set Length', starter: 's = {10, 20, 30}\nprint(len(s))\n', output: '3' },
        { title: 'Check Member with in', starter: 's = {"sword", "shield"}\nprint("sword" in s)\n', output: 'True' },
        { title: 'Empty Set with set()', starter: 's = set()\nprint(len(s))\n', output: '0' },
        { title: 'Remove Element with remove()', starter: 's = {1, 2, 3}\ns.remove(2)\nprint(sorted(list(s)))\n', output: '[1, 3]' },
        { title: 'Pop Arbitrary Element from Set', starter: 's = {42}\nval = s.pop()\nprint(val)\n', output: '42' },
        { title: 'Clear Set', starter: 's = {1, 2}\ns.clear()\nprint(len(s))\n', output: '0' },
      ],
      int: [
        { title: 'Set Union (|)', starter: 'a, b = {1, 2}, {2, 3}\nprint(sorted(list(a | b)))\n', output: '[1, 2, 3]' },
        { title: 'Set Intersection (&)', starter: 'a, b = {1, 2, 3}, {2, 3, 4}\nprint(sorted(list(a & b)))\n', output: '[2, 3]' },
        { title: 'Set Difference (-)', starter: 'a, b = {1, 2, 3}, {2, 3}\nprint(sorted(list(a - b)))\n', output: '[1]' },
        { title: 'Symmetric Difference (^)', starter: 'a, b = {1, 2}, {2, 3}\nprint(sorted(list(a ^ b)))\n', output: '[1, 3]' },
        { title: 'Subset Check (issubset)', starter: 'a, b = {1, 2}, {1, 2, 3}\nprint(a.issubset(b))\n', output: 'True' },
        { title: 'Superset Check (issuperset)', starter: 'a, b = {1, 2, 3}, {2, 3}\nprint(a.issuperset(b))\n', output: 'True' },
        { title: 'Disjoint Sets Check', starter: 'a, b = {1, 2}, {3, 4}\nprint(a.isdisjoint(b))\n', output: 'True' },
        { title: 'Set Comprehension', starter: 'print(sorted(list({x % 3 for x in range(10)})))\n', output: '[0, 1, 2]' },
        { title: 'Update Set with Multiple Elements', starter: 's = {1}\ns.update([2, 3, 4])\nprint(sorted(list(s)))\n', output: '[1, 2, 3, 4]' },
        { title: 'Frozenset Immutability', starter: 'fs = frozenset([1, 2, 3])\nprint(type(fs).__name__)\n', output: 'frozenset' },
      ],
      adv: [
        { title: 'Frozenset as Dict Key', starter: 'd = {frozenset([1, 2]): "Team1"}\nprint(d[frozenset([1, 2])])\n', output: 'Team1' },
        { title: 'Find Common Words in 3 Sentences', starter: 's1 = set("the cat sat".split())\ns2 = set("the dog sat".split())\ns3 = set("the bird sat".split())\nprint(sorted(list(s1 & s2 & s3)))\n', output: "['sat', 'the']" },
        { title: 'Unique Characters in String', starter: 'word = "abracadabra"\nprint(len(set(word)))\n', output: '5' },
        { title: 'Jaccard Similarity Index', starter: 's1, s2 = {1, 2, 3}, {2, 3, 4}\ninter = len(s1 & s2)\nunion = len(s1 | s2)\nprint(round(inter / union, 2))\n', output: '0.5' },
        { title: 'Intersection Update (&=)', starter: 'a = {1, 2, 3}\na &= {2, 3, 4}\nprint(sorted(list(a)))\n', output: '[2, 3]' },
        { title: 'Difference Update (-=)', starter: 'a = {1, 2, 3, 4}\na -= {2, 4}\nprint(sorted(list(a)))\n', output: '[1, 3]' },
        { title: 'All Unique Elements Check', starter: 'def all_unique(lst): return len(lst) == len(set(lst))\nprint(all_unique([1, 2, 3, 1]))\n', output: 'False' },
        { title: 'Set Power Set using itertools', starter: 'from itertools import combinations\ns = {1, 2}\nprint(len([c for r in range(len(s)+1) for c in combinations(s, r)]))\n', output: '4' },
        { title: 'Filter Non-Common Items', starter: 'a, b = {1, 2, 3}, {3, 4, 5}\nprint(sorted(list(a ^ b)))\n', output: '[1, 2, 4, 5]' },
        { title: 'Extract Missing Numbers in Range', starter: 'nums = [1, 2, 4, 5, 7]\nfull = set(range(1, 8))\nprint(sorted(list(full - set(nums))))\n', output: '[3, 6]' },
      ]
    }
  },

  // TOPIC 12: File Handling
  {
    topicId: 'file-handling',
    file: 'topic12_file_handling.ts',
    nameEn: 'File Handling',
    concepts: {
      beg: [
        { title: 'Write to Text File', starter: 'with open("test.txt", "w") as f:\n    f.write("Hello File")\nwith open("test.txt", "r") as f:\n    print(f.read())\n', output: 'Hello File' },
        { title: 'Read Entire File Content', starter: 'with open("hero.txt", "w") as f:\n    f.write("Level 10 Knight")\nwith open("hero.txt", "r") as f:\n    print(f.read().strip())\n', output: 'Level 10 Knight' },
        { title: 'Append Text to File', starter: 'with open("log.txt", "w") as f: f.write("Start\\n")\nwith open("log.txt", "a") as f: f.write("End")\nwith open("log.txt", "r") as f: print(f.read().strip())\n', output: 'Start\nEnd' },
        { title: 'Read Line by Line with readline', starter: 'with open("data.txt", "w") as f: f.write("Line1\\nLine2")\nwith open("data.txt", "r") as f: print(f.readline().strip())\n', output: 'Line1' },
        { title: 'Read All Lines into List (readlines)', starter: 'with open("items.txt", "w") as f: f.write("a\\nb\\nc")\nwith open("items.txt", "r") as f: print(len(f.readlines()))\n', output: '3' },
        { title: 'Check if File is Closed', starter: 'with open("sample.txt", "w") as f:\n    f.write("test")\nprint(f.closed)\n', output: 'True' },
        { title: 'Write Multiple Lines with writelines', starter: 'lines = ["First\\n", "Second\\n"]\nwith open("multi.txt", "w") as f: f.writelines(lines)\nwith open("multi.txt", "r") as f: print(len(f.readlines()))\n', output: '2' },
        { title: 'Count Words in File', starter: 'with open("words.txt", "w") as f: f.write("one two three")\nwith open("words.txt", "r") as f: print(len(f.read().split()))\n', output: '3' },
        { title: 'Strip Newlines on Read', starter: 'with open("lines.txt", "w") as f: f.write("Hello\\nWorld\\n")\nwith open("lines.txt", "r") as f: print([line.strip() for line in f])\n', output: "['Hello', 'World']" },
        { title: 'File Overwrite Demonstration', starter: 'with open("f.txt", "w") as f: f.write("Old")\nwith open("f.txt", "w") as f: f.write("New")\nwith open("f.txt", "r") as f: print(f.read())\n', output: 'New' },
      ],
      int: [
        { title: 'Seek and Tell in File Stream', starter: 'with open("stream.txt", "w") as f: f.write("ABCDEF")\nwith open("stream.txt", "r") as f:\n    f.seek(2)\n    print(f.read(3))\n', output: 'CDE' },
        { title: 'Count Total Characters in File', starter: 'with open("chars.txt", "w") as f: f.write("PythonQuest")\nwith open("chars.txt", "r") as f: print(len(f.read()))\n', output: '11' },
        { title: 'Read File with Encoding UTF-8', starter: 'with open("utf.txt", "w", encoding="utf-8") as f: f.write("नमस्ते")\nwith open("utf.txt", "r", encoding="utf-8") as f: print(f.read())\n', output: 'नमस्ते' },
        { title: 'Parse CSV File Lines', starter: 'with open("data.csv", "w") as f: f.write("name,score\\nLink,100")\nwith open("data.csv", "r") as f:\n    lines = [line.strip().split(",") for line in f]\n    print(lines[1][0])\n', output: 'Link' },
        { title: 'Filter Lines Starting with # (Comments)', starter: 'with open("code.py", "w") as f: f.write("# comment\\nx = 1\\n# end")\nwith open("code.py", "r") as f:\n    code = [l.strip() for l in f if not l.startswith("#")]\n    print(code[0])\n', output: 'x = 1' },
        { title: 'Find Longest Line in File', starter: 'with open("story.txt", "w") as f: f.write("short\\nlonger line\\ntiny")\nwith open("story.txt", "r") as f:\n    print(max(f.readlines(), key=len).strip())\n', output: 'longer line' },
        { title: 'Copy Content to Another File', starter: 'with open("src.txt", "w") as f: f.write("CopyMe")\nwith open("src.txt", "r") as s, open("dst.txt", "w") as d:\n    d.write(s.read())\nwith open("dst.txt", "r") as f: print(f.read())\n', output: 'CopyMe' },
        { title: 'Count Specific Word in File', starter: 'with open("doc.txt", "w") as f: f.write("quest quest hero quest")\nwith open("doc.txt", "r") as f: print(f.read().count("quest"))\n', output: '3' },
        { title: 'Truncate File Size', starter: 'with open("trunc.txt", "w") as f: f.write("1234567890")\nwith open("trunc.txt", "r+") as f:\n    f.truncate(4)\nwith open("trunc.txt", "r") as f: print(f.read())\n', output: '1234' },
        { title: 'Read in Chunks', starter: 'with open("chunk.txt", "w") as f: f.write("ABCDEFGHIJ")\nchunks = []\nwith open("chunk.txt", "r") as f:\n    while (c := f.read(4)): chunks.append(c)\nprint(len(chunks))\n', output: '3' },
      ],
      adv: [
        { title: 'JSON File Serialization & Loading', starter: 'import json\ndata = {"hero": "Knight", "xp": 500}\nwith open("save.json", "w") as f: json.dump(data, f)\nwith open("save.json", "r") as f: loaded = json.load(f)\nprint(loaded["xp"])\n', output: '500' },
        { title: 'In-Memory File with io.StringIO', starter: 'import io\nbuf = io.StringIO()\nbuf.write("Buffer Data")\nprint(buf.getvalue())\n', output: 'Buffer Data' },
        { title: 'Binary File Reading (wb and rb)', starter: 'with open("bin.dat", "wb") as f: f.write(b"\\x01\\x02\\x03")\nwith open("bin.dat", "rb") as f: print(len(f.read()))\n', output: '3' },
        { title: 'CSV DictReader Simulation', starter: 'with open("stats.csv", "w") as f: f.write("id,hp\\n1,100\\n2,80")\nwith open("stats.csv", "r") as f:\n    header = f.readline().strip().split(",")\n    row = f.readline().strip().split(",")\n    print(dict(zip(header, row))["hp"])\n', output: '100' },
        { title: 'Temporary File Handling with tempfile', starter: 'import tempfile\nwith tempfile.NamedTemporaryFile("w+", delete=True) as tf:\n    tf.write("temp")\n    tf.seek(0)\n    print(tf.read())\n', output: 'temp' },
        { title: 'Check File Existence with os.path', starter: 'import os\nwith open("exist.txt", "w") as f: f.write("ok")\nprint(os.path.exists("exist.txt"))\n', output: 'True' },
        { title: 'Context Manager File Auto-Flush', starter: 'with open("flush.txt", "w") as f:\n    f.write("Flushed")\n    f.flush()\nwith open("flush.txt", "r") as f: print(f.read())\n', output: 'Flushed' },
        { title: 'Line Number Enumeration in File', starter: 'with open("lines.txt", "w") as f: f.write("A\\nB")\nwith open("lines.txt", "r") as f:\n    for i, l in enumerate(f, 1): print(f"{i}:{l.strip()}")\n', output: '1:A\n2:B' },
        { title: 'Safe File Replace via Rename', starter: 'import os\nwith open("old.txt", "w") as f: f.write("OldName")\nos.rename("old.txt", "renamed.txt")\nprint(os.path.exists("renamed.txt"))\n', output: 'True' },
        { title: 'Calculate File Hash with hashlib', starter: 'import hashlib\nwith open("hash.txt", "w") as f: f.write("Python")\nwith open("hash.txt", "rb") as f:\n    h = hashlib.md5(f.read()).hexdigest()\nprint(len(h))\n', output: '32' },
      ]
    }
  },

  // TOPIC 13: Exception Handling
  {
    topicId: 'exceptions',
    file: 'topic13_exceptions.ts',
    nameEn: 'Exception Handling',
    concepts: {
      beg: [
        { title: 'Catch ZeroDivisionError', starter: 'try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("Caught ZeroDivision")\n', output: 'Caught ZeroDivision' },
        { title: 'Catch ValueError in int()', starter: 'try:\n    n = int("abc")\nexcept ValueError:\n    print("Invalid Integer")\n', output: 'Invalid Integer' },
        { title: 'Catch IndexError in List', starter: 'lst = [1, 2]\ntry:\n    val = lst[5]\nexcept IndexError:\n    print("Index Out of Bounds")\n', output: 'Index Out of Bounds' },
        { title: 'Catch KeyError in Dict', starter: 'd = {"a": 1}\ntry:\n    val = d["z"]\nexcept KeyError:\n    print("Missing Key")\n', output: 'Missing Key' },
        { title: 'Catch TypeError', starter: 'try:\n    res = "A" + 5\nexcept TypeError:\n    print("Type Mismatch")\n', output: 'Type Mismatch' },
        { title: 'Try-Finally Execution', starter: 'try:\n    x = 1\nfinally:\n    print("Cleanup Executed")\n', output: 'Cleanup Executed' },
        { title: 'Try-Else Success Block', starter: 'try:\n    x = 10 / 2\nexcept ZeroDivisionError:\n    print("Err")\nelse:\n    print(f"Success: {int(x)}")\n', output: 'Success: 5' },
        { title: 'Raise ValueError Manually', starter: 'try:\n    raise ValueError("Custom Error")\nexcept ValueError as e:\n    print(str(e))\n', output: 'Custom Error' },
        { title: 'Catch Multiple Exceptions', starter: 'try:\n    x = int("xyz")\nexcept (ValueError, TypeError):\n    print("Handled Either")\n', output: 'Handled Either' },
        { title: 'Access Exception Message (as e)', starter: 'try:\n    x = 1 / 0\nexcept ZeroDivisionError as e:\n    print(type(e).__name__)\n', output: 'ZeroDivisionError' },
      ],
      int: [
        { title: 'Full Try-Except-Else-Finally Cycle', starter: 'def test_div(a, b):\n    try:\n        res = a / b\n    except ZeroDivisionError: return "Zero"\n    else: return int(res)\n    finally: pass\nprint(test_div(12, 3))\n', output: '4' },
        { title: 'Catch FileNotFoundError', starter: 'try:\n    open("non_existent_file_xyz.txt", "r")\nexcept FileNotFoundError:\n    print("File Not Found")\n', output: 'File Not Found' },
        { title: 'Custom Exception Class', starter: 'class GameError(Exception): pass\ntry:\n    raise GameError("Defeat")\nexcept GameError as e:\n    print(e)\n', output: 'Defeat' },
        { title: 'Reraise Exception', starter: 'try:\n    try:\n        raise ValueError("Inner")\n    except ValueError:\n        raise\nexcept ValueError as e:\n    print(f"Caught: {e}")\n', output: 'Caught: Inner' },
        { title: 'Exception with Arguments', starter: 'class CodeError(Exception):\n    def __init__(self, code): self.code = code\ntry:\n    raise CodeError(404)\nexcept CodeError as e:\n    print(e.code)\n', output: '404' },
        { title: 'Assert Statement AssertionError', starter: 'try:\n    assert 2 + 2 == 5, "Math failed"\nexcept AssertionError as e:\n    print(e)\n', output: 'Math failed' },
        { title: 'Safe Dict Value Lookup Helper', starter: 'def safe_get(d, k, default):\n    try: return d[k]\n    except KeyError: return default\nprint(safe_get({}, "lvl", 1))\n', output: '1' },
        { title: 'Ignore Specific Exception with Pass', starter: 'x = 0\ntry: x = 10 / 0\nexcept ZeroDivisionError: pass\nprint(x)\n', output: '0' },
        { title: 'Catch Base Exception vs Specific', starter: 'try:\n    val = [1][9]\nexcept Exception as e:\n    print(type(e).__name__)\n', output: 'IndexError' },
        { title: 'Catch AttributeError', starter: 'n = 42\ntry:\n    n.append(5)\nexcept AttributeError:\n    print("No Such Method")\n', output: 'No Such Method' },
      ],
      adv: [
        { title: 'Exception Chaining (raise ... from)', starter: 'try:\n    try:\n        int("abc")\n    except ValueError as err:\n        raise RuntimeError("Bad input") from err\nexcept RuntimeError as e:\n    print(f"{type(e).__name__} from {type(e.__cause__).__name__}")\n', output: 'RuntimeError from ValueError' },
        { title: 'Suppress Exceptions with contextlib', starter: 'import contextlib\nwith contextlib.suppress(ZeroDivisionError):\n    x = 1 / 0\nprint("Suppressed")\n', output: 'Suppressed' },
        { title: 'Traceback Extraction without Crashing', starter: 'import traceback\ntry:\n    1 / 0\nexcept ZeroDivisionError:\n    lines = traceback.format_exc().splitlines()\n    print("division by zero" in lines[-1])\n', output: 'True' },
        { title: 'Exception Hierarchy (issubclass)', starter: 'print(issubclass(ZeroDivisionError, ArithmeticError))\n', output: 'True' },
        { title: 'Custom Exception with Custom str', starter: 'class KnightError(Exception):\n    def __str__(self): return "Knight Out of Mana"\ntry: raise KnightError()\nexcept KnightError as e: print(e)\n', output: 'Knight Out of Mana' },
        { title: 'Clean Resource Closing with Finally', starter: 'resource_open = True\ntry:\n    raise ValueError()\nfinally:\n    resource_open = False\nprint(resource_open)\n', output: 'False' },
        { title: 'Exception Groups in Python 3.11+', starter: 'try:\n    raise ExceptionGroup("Multiple", [ValueError("A"), TypeError("B")])\nexcept ExceptionGroup as eg:\n    print(len(eg.exceptions))\n', output: '2' },
        { title: 'Validation Function with Raise', starter: 'def validate_hp(hp):\n    if hp < 0: raise ValueError("Negative HP")\n    return hp\ntry: validate_hp(-10)\nexcept ValueError as e: print(e)\n', output: 'Negative HP' },
        { title: 'Catch RecursionError', starter: 'def recurse(): return recurse()\ntry:\n    recurse()\nexcept RecursionError:\n    print("Max Depth Exceeded")\n', output: 'Max Depth Exceeded' },
        { title: 'Context Manager with __exit__ error handling', starter: 'class SuppressDiv:\n    def __enter__(self): return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        return exc_type is ZeroDivisionError\nwith SuppressDiv():\n    x = 10 / 0\nprint("Safely Handled")\n', output: 'Safely Handled' },
      ]
    }
  },

  // TOPIC 14: Modules
  {
    topicId: 'modules',
    file: 'topic14_modules.ts',
    nameEn: 'Modules',
    concepts: {
      beg: [
        { title: 'Import Math Module', starter: 'import math\nprint(int(math.sqrt(64)))\n', output: '8' },
        { title: 'Math Floor and Ceil', starter: 'import math\nprint(f"{math.floor(3.8)} {math.ceil(3.2)}")\n', output: '3 4' },
        { title: 'Math Pi Constant', starter: 'import math\nprint(round(math.pi, 2))\n', output: '3.14' },
        { title: 'Random Module Choice', starter: 'import random\nrandom.seed(42)\nchoices = ["Sword", "Bow", "Staff"]\nprint(random.choice(choices))\n', output: 'Sword' },
        { title: 'Random Integer (randint)', starter: 'import random\nrandom.seed(10)\nval = random.randint(1, 100)\nprint(val > 0)\n', output: 'True' },
        { title: 'Import with Alias (as)', starter: 'import math as m\nprint(m.pow(2, 3))\n', output: '8.0' },
        { title: 'Import Specific Function (from ... import)', starter: 'from math import gcd\nprint(gcd(24, 36))\n', output: '12' },
        { title: 'Datetime Current Date Format', starter: 'import datetime\nd = datetime.date(2026, 11, 16)\nprint(d.strftime("%Y-%m-%d"))\n', output: '2026-11-16' },
        { title: 'Check Module __name__', starter: 'import math\nprint(math.__name__)\n', output: 'math' },
        { title: 'Sys Module Version Info', starter: 'import sys\nprint(sys.version_info.major)\n', output: '3' },
      ],
      int: [
        { title: 'Collections Counter', starter: 'from collections import Counter\nc = Counter(["a", "b", "a", "c", "a"])\nprint(c.most_common(1)[0][0])\n', output: 'a' },
        { title: 'Collections Defaultdict', starter: 'from collections import defaultdict\nd = defaultdict(list)\nd["items"].append("Potion")\nprint(d["items"])\n', output: "['Potion']" },
        { title: 'Itertools Permutations', starter: 'import itertools\nperms = list(itertools.permutations([1, 2]))\nprint(perms)\n', output: '[(1, 2), (2, 1)]' },
        { title: 'Itertools Combinations', starter: 'import itertools\ncombs = list(itertools.combinations([1, 2, 3], 2))\nprint(len(combs))\n', output: '3' },
        { title: 'JSON Module Dumps & Loads', starter: 'import json\ns = json.dumps({"level": 10})\nprint(json.loads(s)["level"])\n', output: '10' },
        { title: 'String Constants Module', starter: 'import string\nprint(string.ascii_lowercase[:5])\n', output: 'abcde' },
        { title: 'Datetime Timedelta Calculation', starter: 'import datetime\nd1 = datetime.date(2026, 1, 1)\nd2 = datetime.date(2026, 1, 11)\nprint((d2 - d1).days)\n', output: '10' },
        { title: 'Functools lru_cache', starter: 'from functools import lru_cache\n@lru_cache(maxsize=None)\ndef fib(n): return n if n < 2 else fib(n-1) + fib(n-2)\nprint(fib(8))\n', output: '21' },
        { title: 'Math Factorial', starter: 'import math\nprint(math.factorial(6))\n', output: '720' },
        { title: 'UUID Generation Module', starter: 'import uuid\nu = uuid.UUID("12345678-1234-5678-1234-567812345678")\nprint(u.version is not None)\n', output: 'True' },
      ],
      adv: [
        { title: 'Inspect Module Function Signatures', starter: 'import inspect\ndef quest(hero: str, level: int = 1): pass\nsig = inspect.signature(quest)\nprint(list(sig.parameters.keys()))\n', output: "['hero', 'level']" },
        { title: 'Dataclasses Module in Python 3.7+', starter: 'from dataclasses import dataclass\n@dataclass\nclass Player:\n    name: str\n    hp: int = 100\np = Player("Hero")\nprint(f"{p.name}:{p.hp}")\n', output: 'Hero:100' },
        { title: 'Enum Module Enumerations', starter: 'from enum import Enum\nclass Role(Enum):\n    WARRIOR = 1\n    MAGE = 2\nprint(Role.WARRIOR.name)\n', output: 'WARRIOR' },
        { title: 'Hashlib SHA256 Hashing', starter: 'import hashlib\nh = hashlib.sha256(b"python").hexdigest()\nprint(len(h))\n', output: '64' },
        { title: 'Timeit Code Performance Timing Simulation', starter: 'import timeit\nt = timeit.timeit("sum([1, 2, 3])", number=1000)\nprint(t > 0)\n', output: 'True' },
        { title: 'Dis Module Python Bytecode Disassembly', starter: 'import dis\ndef add(a, b): return a + b\nops = [instr.opname for instr in dis.get_instructions(add)]\nprint("RETURN_VALUE" in ops)\n', output: 'True' },
        { title: 'Copy Module Deepcopy', starter: 'import copy\na = [[1]]\nb = copy.deepcopy(a)\nb[0][0] = 9\nprint(f"{a[0][0]} {b[0][0]}")\n', output: '1 9' },
        { title: 'Sys Module Platform Check', starter: 'import sys\nprint(type(sys.platform).__name__)\n', output: 'str' },
        { title: 'Pathlib Path Utilities', starter: 'from pathlib import Path\np = Path("dir/quest.py")\nprint(p.suffix)\n', output: '.py' },
        { title: 'Typing Module Generic Types', starter: 'from typing import List, Dict\ndef process(data: List[int]) -> int: return sum(data)\nprint(process([10, 20]))\n', output: '30' },
      ]
    }
  }
];

function generateTopicFile(topic) {
  const codeLines = [];
  codeLines.push("import { Challenge } from '../../types/challenge';");
  codeLines.push("import { buildChallenge, ChallengeDef } from './challengeBuilder';\n");
  codeLines.push("const rawDefs: ChallengeDef[] = [");

  const diffs = ['beg', 'int', 'adv'];
  const diffLabels = { beg: 'beginner', int: 'intermediate', adv: 'advanced' };

  diffs.forEach((dKey) => {
    const list = topic.concepts[dKey] || [];
    list.forEach((item, idx) => {
      const num = idx + 1;
      const id = `${topic.topicId.replace(/-/g, '_').substring(0, 3)}_${dKey}_${num < 10 ? '0' + num : num}`;
      const diff = diffLabels[dKey];
      const tc = item.input
        ? `{ id: 'tc1', input: ${JSON.stringify(item.input)}, expectedOutput: ${JSON.stringify(item.output)} }`
        : `{ id: 'tc1', expectedOutput: ${JSON.stringify(item.output)} }`;

      codeLines.push(`  {`);
      codeLines.push(`    num: ${num},`);
      codeLines.push(`    id: '${id}',`);
      codeLines.push(`    topicId: '${topic.topicId}',`);
      codeLines.push(`    difficulty: '${diff}',`);
      codeLines.push(`    starterCode: ${JSON.stringify(item.starter)},`);
      codeLines.push(`    en: {`);
      codeLines.push(`      title: ${JSON.stringify(item.title)},`);
      codeLines.push(`      objective: ${JSON.stringify('Master ' + item.title + ' in Python.')},`);
      codeLines.push(`      problem: ${JSON.stringify('Execute Python code to output: ' + item.output.replace(/\\n/g, ' '))},`);
      codeLines.push(`      clue: 'Observe the expected output and construct the logic.',`);
      codeLines.push(`      logic: 'Follow the Python language syntax.',`);
      codeLines.push(`      pseudocode: ${JSON.stringify(item.starter.trim())},`);
      codeLines.push(`      solution: ${JSON.stringify(item.starter.trim())},`);
      codeLines.push(`    },`);
      codeLines.push(`    hi: {`);
      codeLines.push(`      title: ${JSON.stringify(item.title)},`);
      codeLines.push(`      objective: ${JSON.stringify(item.title + ' का अभ्यास करें।')},`);
      codeLines.push(`      problem: ${JSON.stringify('सही आउटपुट प्राप्त करने के लिए कोड लिखें: ' + item.output.replace(/\\n/g, ' '))},`);
      codeLines.push(`      clue: 'पायथन सिंटैक्स का ध्यान रखें।',`);
      codeLines.push(`      logic: 'नियमों का पालन करते हुए कोड पूरा करें।',`);
      codeLines.push(`      pseudocode: ${JSON.stringify(item.starter.trim())},`);
      codeLines.push(`      solution: ${JSON.stringify(item.starter.trim())},`);
      codeLines.push(`    },`);
      codeLines.push(`    hinglish: {`);
      codeLines.push(`      title: ${JSON.stringify(item.title)},`);
      codeLines.push(`      objective: ${JSON.stringify(item.title + ' seekho aur test pass karo.')},`);
      codeLines.push(`      problem: ${JSON.stringify('Code complete karo expected output ke liye: ' + item.output.replace(/\\n/g, ' '))},`);
      codeLines.push(`      clue: 'Starter code me instruction follow karo.',`);
      codeLines.push(`      logic: 'Expected output laane ke liye logic run karo.',`);
      codeLines.push(`      pseudocode: ${JSON.stringify(item.starter.trim())},`);
      codeLines.push(`      solution: ${JSON.stringify(item.starter.trim())},`);
      codeLines.push(`    },`);
      codeLines.push(`    testCases: [${tc}],`);
      codeLines.push(`  },`);
    });
  });

  codeLines.push('];\n');
  codeLines.push(`export const ${topic.topicId.replace(/-/g, '_')}Challenges: Challenge[] = rawDefs.map(buildChallenge);`);

  const filePath = path.join(__dirname, '..', 'src', 'data', 'challenges', topic.file);
  fs.writeFileSync(filePath, codeLines.join('\n'), 'utf8');
  console.log(`Generated ${topic.file}`);
}

allTopics.forEach(generateTopicFile);
console.log('All 13 remaining topics successfully generated with 30 challenges each!');
