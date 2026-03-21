export const ROUTES = [
  "home",
  "words-first",
  "instructors",
  "swimming-class",
  "pet-shop",
  "counting",
  "whats-this",
  "final-quiz",
  "exam",
];

export const vocabulary = [
  { id: "man", label: "man", emoji: "👨", category: "people" },
  { id: "woman", label: "woman", emoji: "👩", category: "people" },
  { id: "swimming-instructor", label: "swimming instructor", emoji: "🏊", category: "instructors" },
  { id: "judo-instructor", label: "judo instructor", emoji: "🥋", category: "instructors" },
  { id: "riding-instructor", label: "riding instructor", emoji: "🏇", category: "instructors" },
  { id: "ski-instructor", label: "ski instructor", emoji: "⛷️", category: "instructors" },
  { id: "cat", label: "cat", emoji: "🐱", category: "animals" },
  { id: "kitten", label: "kitten", emoji: "🐈", category: "animals" },
  { id: "dog", label: "dog", emoji: "🐶", category: "animals" },
  { id: "puppy", label: "puppy", emoji: "🐕", category: "animals" },
  { id: "gerbil", label: "gerbil", emoji: "🐹", category: "animals" },
  { id: "pet-shop", label: "pet shop", emoji: "🏪", category: "places" },
  { id: "cushion", label: "cushion", emoji: "🛋️", category: "objects" },
  { id: "one", label: "one", emoji: "1️⃣", category: "numbers" },
  { id: "two", label: "two", emoji: "2️⃣", category: "numbers" },
  { id: "three", label: "three", emoji: "3️⃣", category: "numbers" },
  { id: "four", label: "four", emoji: "4️⃣", category: "numbers" },
  { id: "five", label: "five", emoji: "5️⃣", category: "numbers" },
  { id: "six", label: "six", emoji: "6️⃣", category: "numbers" },
];

export const phraseBank = {
  tiredQuestion: "Are you tired?",
  yesIAm: "Yes, I am.",
  notTired: "I’m not tired. I’m fine.",
  whatAboutYou: "What about you?",
  twoMoreLaps: "Come on, boys. Two more laps.",
  oneMoreLap: "Come on, Sam. One more lap.",
  fourMoreLaps: "Come on, girls. Four more laps.",
  howAreYou: "Hi, Kelly. How are you?",
  upset: "I’m kind of upset.",
  whatsWrong: "What’s wrong?",
  kittenMissing: "One kitten is missing.",
  calmDown: "Calm down. Let’s look for it.",
  underCushion: "Look! It’s here, under this cushion.",
  yesItIs: "Yes, it is.",
  noImNot: "No, I’m not.",
};

export const swimmingDialogue = [
  { speaker: "Instructor", text: "Are you tired, Phil?" },
  { speaker: "Phil", text: phraseBank.yesIAm },
  { speaker: "Phil", text: "What about you, Fred?" },
  { speaker: "Fred", text: phraseBank.notTired },
  { speaker: "Instructor", text: phraseBank.twoMoreLaps },
  { speaker: "Phil", text: "OK. OK." },
];

export const petShopDialogue = [
  { speaker: "Liz", text: phraseBank.howAreYou },
  { speaker: "Kelly", text: phraseBank.upset },
  { speaker: "Mrs. Wilson", text: phraseBank.whatsWrong },
  { speaker: "Kelly", text: phraseBank.kittenMissing },
  { speaker: "Mrs. Wilson", text: phraseBank.calmDown },
  { speaker: "Liz", text: phraseBank.underCushion },
  { speaker: "Kelly", text: "Oh! Great, Liz!" },
];

export const instructorQuestions = [
  { emoji: "🥋", question: "Are you a judo instructor?", correct: "yes" },
  { emoji: "🏊", question: "Are you a swimming instructor?", correct: "yes" },
  { emoji: "🏇", question: "Are you a ski instructor?", correct: "no" },
  { emoji: "⛷️", question: "Are you a riding instructor?", correct: "no" },
  { emoji: "🏇", question: "Are you a riding instructor?", correct: "yes" },
  { emoji: "⛷️", question: "Are you a ski instructor?", correct: "yes" },
];

export const countingQuestions = [
  { emoji: "🛋️", prompt: "How many cushions?", answer: "two", count: 2 },
  { emoji: "🐹", prompt: "How many gerbils?", answer: "four", count: 4 },
  { emoji: "🐱", prompt: "How many cats?", answer: "five", count: 5 },
  { emoji: "🐶", prompt: "How many dogs?", answer: "six", count: 6 },
];

export const whatIsItQuestions = [
  { emoji: "🐕", prompt: "What is it?", answer: "puppy", options: ["puppy", "kitten", "gerbil"] },
  { emoji: "🐹", prompt: "What is it?", answer: "gerbil", options: ["cat", "gerbil", "dog"] },
  { emoji: "🏪", prompt: "What is it?", answer: "pet shop", options: ["pet shop", "cushion", "swimming class"] },
  { emoji: "🛋️", prompt: "What is it?", answer: "cushion", options: ["cushion", "kitten", "woman"] },
];

export const finalQuizQuestions = [
  {
    type: "choice",
    emoji: "🏊",
    prompt: "Are you a swimming instructor?",
    options: ["Yes, I am.", "No, I’m not."],
    answer: "Yes, I am.",
  },
  {
    type: "choice",
    emoji: "🐈",
    prompt: "What is it?",
    options: ["kitten", "puppy", "gerbil"],
    answer: "kitten",
  },
  {
    type: "choice",
    emoji: "🐹🐹🐹🐹",
    prompt: "How many gerbils?",
    options: ["three", "four", "five"],
    answer: "four",
  },
  {
    type: "choice",
    emoji: "😟",
    prompt: "How is Kelly?",
    options: ["She is kind of upset.", "She is a rider.", "She is a kitten."],
    answer: "She is kind of upset.",
  },
  {
    type: "choice",
    emoji: "🛋️",
    prompt: "Look! It’s here, under this...",
    options: ["pet shop", "cushion", "pool"],
    answer: "cushion",
  },
];

export const examConfig = {
  lessonId: "lesson2",
  lessonTitle: "Lesson 2 - Swimming Class and Pet Shop",
  pageTitle: "Assessment - Lesson 2",
  questions: [
    {
      id: "l2-q1",
      prompt: "How does Phil answer the question 'Are you tired?'",
      options: ["Yes, I am.", "No, it’s not.", "I’m a kitten.", "Come in."],
      answer: "Yes, I am.",
    },
    {
      id: "l2-q2",
      prompt: "What does Fred say about himself?",
      options: [
        "I’m not tired. I’m fine.",
        "One kitten is missing.",
        "I’m a judo instructor.",
        "It’s a puppy.",
      ],
      answer: "I’m not tired. I’m fine.",
    },
    {
      id: "l2-q3",
      prompt: "What does the swimming instructor ask the boys to do?",
      options: ["Two more laps.", "Look under this cushion.", "Ride the horse.", "Feed the kitten."],
      answer: "Two more laps.",
    },
    {
      id: "l2-q4",
      prompt: "Why is Kelly kind of upset?",
      options: [
        "One kitten is missing.",
        "She is tired after six laps.",
        "She lost a binder.",
        "She is at a ski class.",
      ],
      answer: "One kitten is missing.",
    },
    {
      id: "l2-q5",
      prompt: "Who asks 'What’s wrong?'",
      options: ["Mrs. Wilson", "Phil", "Sam", "The gerbil"],
      answer: "Mrs. Wilson",
    },
    {
      id: "l2-q6",
      prompt: "Where is the missing kitten found?",
      options: ["Under this cushion.", "At the pool.", "Inside the pet shop door.", "On the horse."],
      answer: "Under this cushion.",
    },
    {
      id: "l2-q7",
      prompt: "Which pair names baby animals from the lesson?",
      options: ["kitten and puppy", "cat and woman", "dog and man", "gerbil and pet shop"],
      answer: "kitten and puppy",
    },
    {
      id: "l2-q8",
      prompt: "Which answer correctly completes the question 'Are you a swimming instructor?'",
      options: ["Yes, I am.", "Yes, it is.", "No, it’s a pet shop.", "How are you?"],
      answer: "Yes, I am.",
    },
    {
      id: "l2-q9",
      prompt: "Choose the correct written number from the lesson.",
      context: "The group has four gerbils.",
      options: ["four", "for", "forty", "five"],
      answer: "four",
    },
    {
      id: "l2-q10",
      prompt: "Which sequence matches the pet shop story best?",
      options: [
        "How are you? -> upset -> missing kitten -> look for it -> under this cushion",
        "Two more laps -> upset -> pet shop -> skiing -> puppy",
        "Are you tired? -> Come in -> cars -> dinosaurs -> thanks",
        "Judo instructor -> gerbil -> four laps -> cushion -> goodbye",
      ],
      answer: "How are you? -> upset -> missing kitten -> look for it -> under this cushion",
    },
  ],
};
