import { TopicMeta } from '../types/challenge';

export const TOPICS: TopicMeta[] = [
  {
    id: 'variables',
    order: 1,
    levelRequired: 1,
    icon: 'Variable',
    titles: {
      en: 'Variables & Data Types',
      hi: 'वेरिएबल्स और डेटा प्रकार',
      hinglish: 'Variables & Data Types',
    },
    descriptions: {
      en: 'Learn how to store numbers, floats, booleans, and assign values in Python.',
      hi: 'पायथन में संख्याएं, बूलियन और मान स्टोर करना सीखें।',
      hinglish: 'Python me values store karna, numbers aur boolean types seekho.',
    },
  },
  {
    id: 'operators',
    order: 2,
    levelRequired: 2,
    icon: 'Calculator',
    titles: {
      en: 'Operators',
      hi: 'ऑपरेटर्स (Operators)',
      hinglish: 'Math & Logic Operators',
    },
    descriptions: {
      en: 'Perform arithmetic, comparisons, logical operations, and modulus math.',
      hi: 'अंकगणित, तुलना और तार्किक गणनाएं करना सीखें।',
      hinglish: 'Arithmetic calculation, comparisons aur logical operators use karna.',
    },
  },
  {
    id: 'user-input',
    order: 3,
    levelRequired: 3,
    icon: 'Terminal',
    titles: {
      en: 'User Input',
      hi: 'उपयोगकर्ता इनपुट (User Input)',
      hinglish: 'User Input lena',
    },
    descriptions: {
      en: 'Capture dynamic input using input() and convert strings to integers or floats.',
      hi: 'input() फ़ंक्शन से डेटा लें और टाइप कास्टिंग करें।',
      hinglish: 'User se interactive input() lena aur type casting (int/float) karna.',
    },
  },
  {
    id: 'strings',
    order: 4,
    levelRequired: 4,
    icon: 'Type',
    titles: {
      en: 'Strings',
      hi: 'स्ट्रिंग्स (Strings)',
      hinglish: 'Strings Mastery',
    },
    descriptions: {
      en: 'Master string indexing, slicing, concatenation, methods, and f-strings.',
      hi: 'स्ट्रिंग स्लाइसिंग, मेथड्स और f-strings में महारत हासिल करें।',
      hinglish: 'String slicing, upper/lower methods aur cool f-strings seekho.',
    },
  },
  {
    id: 'conditionals',
    order: 5,
    levelRequired: 5,
    icon: 'GitFork',
    titles: {
      en: 'Conditional Statements',
      hi: 'कंडीशनल स्टेटमेंट्स (if / else)',
      hinglish: 'Conditionals (if, elif, else)',
    },
    descriptions: {
      en: 'Make intelligent decisions in your code with if, elif, and else logic.',
      hi: 'if, elif और else का उपयोग करके निर्णय लेने वाला कोड लिखें।',
      hinglish: 'Decisions lena: if, elif aur else statements ka magic.',
    },
  },
  {
    id: 'loops',
    order: 6,
    levelRequired: 6,
    icon: 'Repeat',
    titles: {
      en: 'Loops',
      hi: 'लूप्स (Loops)',
      hinglish: 'Loops (for & while)',
    },
    descriptions: {
      en: 'Repeat actions seamlessly using for-in loops, while loops, and range().',
      hi: 'for और while लूप्स के साथ कोड को दोहराना और range() का उपयोग करना।',
      hinglish: 'for loops, while loops aur range() se repetitive tasks automate karo.',
    },
  },
  {
    id: 'functions',
    order: 7,
    levelRequired: 7,
    icon: 'Code2',
    titles: {
      en: 'Functions',
      hi: 'फ़ंक्शंस (Functions)',
      hinglish: 'Functions (def & return)',
    },
    descriptions: {
      en: 'Create reusable, modular blocks of code with def, arguments, and return statements.',
      hi: 'def और return के साथ पुन: प्रयोज्य कोड ब्लॉक्स बनाएं।',
      hinglish: 'Modular reusable code: def functions, parameters aur return values.',
    },
  },
  {
    id: 'lists',
    order: 8,
    levelRequired: 8,
    icon: 'ListFilter',
    titles: {
      en: 'Lists',
      hi: 'लिस्ट्स (Lists)',
      hinglish: 'Python Lists',
    },
    descriptions: {
      en: 'Store ordered collections, modify items with append/pop, and slice lists.',
      hi: 'ऑर्डर्ड कलेक्शन्स बनाएं, append/pop और लिस्ट स्लाइसिंग सीखें।',
      hinglish: 'Ordered elements store karna, append, pop, sort aur list indexing.',
    },
  },
  {
    id: 'tuples',
    order: 9,
    levelRequired: 9,
    icon: 'Layers',
    titles: {
      en: 'Tuples',
      hi: 'टुपल्स (Tuples)',
      hinglish: 'Immutable Tuples',
    },
    descriptions: {
      en: 'Understand immutable collections, packing/unpacking, and tuple safety.',
      hi: 'अपरिवर्तनीय (immutable) कलेक्शन्स और टुपल अनपैकिंग सीखें।',
      hinglish: 'Immutable data types, tuple packing/unpacking aur fixed records.',
    },
  },
  {
    id: 'dictionaries',
    order: 10,
    levelRequired: 10,
    icon: 'BookOpen',
    titles: {
      en: 'Dictionaries',
      hi: 'डिक्शनरीज़ (Dictionaries)',
      hinglish: 'Key-Value Dictionaries',
    },
    descriptions: {
      en: 'Organize high-performance data with key-value pairs, keys(), and values().',
      hi: 'की-वैल्यू पेयर (key-value) के साथ तेज़ डेटा मैपिंग और एक्सेस सीखें।',
      hinglish: 'Key-value pairs, nested dicts aur fast dictionary lookups.',
    },
  },
  {
    id: 'sets',
    order: 11,
    levelRequired: 11,
    icon: 'Component',
    titles: {
      en: 'Sets',
      hi: 'सेट्स (Sets)',
      hinglish: 'Unique Sets',
    },
    descriptions: {
      en: 'Work with unique elements, eliminate duplicates, and perform union/intersections.',
      hi: 'अद्वितीय तत्वों के साथ काम करें, डुप्लिकेट हटाएं और सेट ऑपरेशंस करें।',
      hinglish: 'Unique items only, union, intersection aur duplicates remove karna.',
    },
  },
  {
    id: 'file-handling',
    order: 12,
    levelRequired: 12,
    icon: 'FileText',
    titles: {
      en: 'File Handling',
      hi: 'फ़ाइल हैंडलिंग (File Handling)',
      hinglish: 'File Read & Write',
    },
    descriptions: {
      en: 'Read and write virtual files safely using open(), with blocks, and readlines().',
      hi: 'open() और with स्टेटमेंट के साथ फ़ाइलों को पढ़ें और लिखें।',
      hinglish: 'Files open karna, text read & write karna using "with open()".',
    },
  },
  {
    id: 'exceptions',
    order: 13,
    levelRequired: 13,
    icon: 'AlertTriangle',
    titles: {
      en: 'Exception Handling',
      hi: 'एक्सेप्शन हैंडलिंग (try / except)',
      hinglish: 'Error Handling (try-except)',
    },
    descriptions: {
      en: 'Build bulletproof software handling errors with try, except, else, and finally.',
      hi: 'try और except के साथ गलतियों को समझदारी से संभालें।',
      hinglish: 'Crashes prevent karo: try, except, ValueError handling and finally.',
    },
  },
  {
    id: 'modules',
    order: 14,
    levelRequired: 14,
    icon: 'Package',
    titles: {
      en: 'Modules',
      hi: 'मॉड्यूल और लाइब्रेरीज़ (Modules)',
      hinglish: 'Standard Modules',
    },
    descriptions: {
      en: 'Leverage Python built-in standard modules like math, random, and datetime.',
      hi: 'पायथन के अंतर्निहित मॉड्यूल जैसे math, random और datetime का उपयोग करें।',
      hinglish: 'Built-in modules import karna: math, random, datetime aur custom logic.',
    },
  },
];
