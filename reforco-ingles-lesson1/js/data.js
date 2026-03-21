export const ROUTES = [
  "home",
  "vocabulary",
  "whats-this",
  "yes-no",
  "about",
  "dialogue",
  "chant",
  "final-quiz",
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
