export const ROUTES = [
  "home",
  "vocabulary",
  "whats-this",
  "yes-no",
  "about",
  "dialogue",
  "chant",
  "final-quiz",
  "exam",
];

export const vocabulary = [
  { id: "book", label: "book", emoji: "📘" },
  { id: "notepad", label: "notepad", emoji: "🗒️" },
  { id: "boy", label: "boy", emoji: "👦" },
  { id: "girl", label: "girl", emoji: "👧" },
  { id: "car", label: "car", emoji: "🚗" },
  { id: "dinosaur", label: "dinosaur", emoji: "🦖" },
  { id: "binder", label: "binder", emoji: "📒" },
  { id: "folder", label: "folder", emoji: "📁" },
  { id: "highlighter", label: "highlighter", emoji: "🖍️" },
];

export const phraseBank = {
  hi: "Hi.",
  hey: "Hey.",
  comeIn: "Come in.",
  whatsThis: "What’s this?",
  surprise: "It’s a surprise.",
  isBook: "Is it a book?",
  yes: "Yes, it is.",
  no: "No, it’s not.",
  isCars: "Is it about cars?",
  aboutCars: "It’s a book about cars.",
  aboutDinosaurs: "Oh! It’s about dinosaurs!",
  thanks: "Thanks a lot.",
  welcome: "You’re welcome.",
};

export const dialogue = [
  { speaker: "Grandpa", text: phraseBank.hi },
  { speaker: "Mike", text: `${phraseBank.hey} ${phraseBank.comeIn}` },
  { speaker: "Mike", text: phraseBank.whatsThis },
  { speaker: "Grandpa", text: phraseBank.surprise },
  { speaker: "Mike", text: phraseBank.isBook },
  { speaker: "Grandpa", text: phraseBank.yes },
  { speaker: "Mike", text: phraseBank.isCars },
  { speaker: "Grandpa", text: phraseBank.no },
  { speaker: "Mike", text: phraseBank.aboutDinosaurs },
  { speaker: "Mike", text: phraseBank.thanks },
  { speaker: "Grandpa", text: phraseBank.welcome },
];

export const chantLines = [
  "Hey, Grandpa",
  "Come in",
  "What’s this?",
  "It’s a surprise.",
  "Is it a book?",
  "It’s a book about cars.",
  "Oh! It’s about dinosaurs!",
  "Thanks a lot.",
];

export const yesNoQuestions = [
  { emoji: "📘", question: "Is it a book?", correct: "yes" },
  { emoji: "🦖", question: "Is it a book?", correct: "no" },
  { emoji: "🚗", question: "Is it a car?", correct: "yes" },
  { emoji: "📁", question: "Is it a binder?", correct: "no" },
  { emoji: "📒", question: "Is it a binder?", correct: "yes" },
  { emoji: "👧", question: "Is it a boy?", correct: "no" },
];

export const finalQuizQuestions = [
  {
    type: "choice",
    emoji: "🦖",
    prompt: "What’s this?",
    options: ["dinosaur", "book", "car"],
    answer: "dinosaur",
  },
  {
    type: "choice",
    emoji: "🖍️",
    prompt: "What’s this?",
    options: ["folder", "highlighter", "notepad"],
    answer: "highlighter",
  },
  {
    type: "yesno",
    emoji: "📁",
    prompt: "Is it a folder?",
    answer: "yes",
  },
  {
    type: "yesno",
    emoji: "👦",
    prompt: "Is it a girl?",
    answer: "no",
  },
  {
    type: "choice",
    emoji: "📘",
    prompt: "It’s a book about...?",
    options: ["cars", "folders", "notepads"],
    answer: "cars",
  },
];

export const examConfig = {
  lessonId: "lesson1",
  lessonTitle: "Lesson 1 - A Book",
  pageTitle: "Assessment - Lesson 1",
  questions: [
    {
      id: "l1-q1",
      prompt: "What is Grandpa's surprise?",
      context: "Choose the best answer based on the dialogue.",
      options: ["It’s a book.", "It’s a folder.", "It’s a highlighter.", "It’s a car."],
      answer: "It’s a book.",
    },
    {
      id: "l1-q2",
      prompt: "Which answer correctly completes this exchange?",
      context: "Mike: Is it a book? Grandpa: ...",
      options: ["Yes, it is.", "No, I’m not.", "It’s a surprise.", "Come in."],
      answer: "Yes, it is.",
    },
    {
      id: "l1-q3",
      prompt: "Mike first guesses the book is about...",
      options: ["cars", "dinosaurs", "notepads", "folders"],
      answer: "cars",
    },
    {
      id: "l1-q4",
      prompt: "After Grandpa says 'No, it’s not.', what does Mike discover?",
      options: [
        "It’s about dinosaurs.",
        "It’s about girls.",
        "It’s a folder about cars.",
        "It’s not a book.",
      ],
      answer: "It’s about dinosaurs.",
    },
    {
      id: "l1-q5",
      prompt: "Which sentence uses 'about' correctly?",
      options: [
        "It’s a book about cars.",
        "It’s a car about books.",
        "It’s about a folder girl.",
        "About is a dinosaur.",
      ],
      answer: "It’s a book about cars.",
    },
    {
      id: "l1-q6",
      prompt: "Which pair contains only school objects from the lesson?",
      options: [
        "binder + highlighter",
        "boy + folder",
        "girl + dinosaur",
        "car + grandpa",
      ],
      answer: "binder + highlighter",
    },
    {
      id: "l1-q7",
      prompt: "If the image shows 📁, what is the best question to ask first?",
      options: ["What’s this?", "Are you Mike?", "Thanks a lot.", "Come in."],
      answer: "What’s this?",
    },
    {
      id: "l1-q8",
      prompt: "Choose the correct negative answer for a wrong guess.",
      options: ["No, it’s not.", "Yes, it is.", "You’re welcome.", "Hi."],
      answer: "No, it’s not.",
    },
    {
      id: "l1-q9",
      prompt: "What comes right after 'Thanks a lot.' in the dialogue?",
      options: ["You’re welcome.", "Oh! It’s about dinosaurs!", "Hi.", "Is it a book?"],
      answer: "You’re welcome.",
    },
    {
      id: "l1-q10",
      prompt: "Which sequence matches the story best?",
      options: [
        "surprise -> book -> cars guess -> dinosaurs reveal",
        "book -> thanks -> come in -> dinosaur",
        "folder -> cars -> book -> welcome",
        "hi -> highlighter -> no -> folder",
      ],
      answer: "surprise -> book -> cars guess -> dinosaurs reveal",
    },
  ],
};
