const quizData = [
    {
        question: "How old are the Appalachian Mountains?",
        answers: {
            a: "200 million years old",
            b: "500 million years old",
            c: "1.2 billion years old",
            d: "2 billion years old"
        },
        correctAnswer: "c",
        feedback: {
            correct: "Great job! The Appalachian Mountains are indeed 1.2 billion years old. That's incredibly ancient!",
            incorrect: "The correct answer is 1.2 billion years old. The Appalachian Mountains are one of the oldest mountain ranges on Earth!"
        }
    },
    {
        question: "What type of rock is gneiss?",
        answers: {
            a: "Igneous",
            b: "Sedimentary",
            c: "Metamorphic",
            d: "Volcanic"
        },
        correctAnswer: "c",
        feedback: {
            correct: "Excellent! Gneiss is a metamorphic rock. It's formed by extreme heat and pressure over millions of years.",
            incorrect: "The correct answer is metamorphic. Gneiss is a type of metamorphic rock, which means it was transformed by heat and pressure."
        }
    },
    {
        question: "What is the Blue Ridge Escarpment also known as?",
        answers: {
            a: "The Green Wall",
            b: "The Blue Wall",
            c: "The Great Divide",
            d: "The Mountain Ridge"
        },
        correctAnswer: "b",
        feedback: {
            correct: "Well done! The Blue Ridge Escarpment is indeed known as the Blue Wall by the Cherokee people.",
            incorrect: "The correct answer is the Blue Wall. This is what the Cherokee people call the Blue Ridge Escarpment."
        }
    },
    {
        question: "How high does the Blue Ridge Escarpment rise from its base?",
        answers: {
            a: "1,000 feet",
            b: "2,000 feet",
            c: "3,000 feet",
            d: "4,000 feet"
        },
        correctAnswer: "c",
        feedback: {
            correct: "Fantastic! The Blue Ridge Escarpment rises over 3,000 feet from its base. That's really tall!",
            incorrect: "The correct answer is over 3,000 feet. The Blue Ridge Escarpment is a very tall mountain wall!"
        }
    },
    {
        question: "What does Odyssey wear that makes him look cool?",
        answers: {
            a: "A hat",
            b: "Sunglasses",
            c: "A scarf",
            d: "Boots"
        },
        correctAnswer: "b",
        feedback: {
            correct: "You got it! Odyssey wears cool sunglasses. He must look very stylish swimming around!",
            incorrect: "The correct answer is sunglasses. Odyssey is a cool otter who likes to wear sunglasses on his adventures!"
        }
    }
];

function buildQuiz() {
    const output = [];

    quizData.forEach((questionData, questionNumber) => {
        const answers = [];

        for (letter in questionData.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${questionData.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question-container">
                <div class="question">
                    <h2>Question ${questionNumber + 1}</h2>
                    <p>${questionData.question}</p>
                </div>
                <div class="answers">${answers.join('')}</div>
                <div class="feedback" id="feedback${questionNumber}"></div>
            </div>`
        );
    });

    quizElement.innerHTML = output.join('');

    // Add event listeners to all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', handleAnswerSelection);
    });
}

function handleAnswerSelection(e) {
    const selectedAnswer = e.target;
    const questionNumber = parseInt(selectedAnswer.name.replace('question', ''));
    const isCorrect = selectedAnswer.value === quizData[questionNumber].correctAnswer;

    const feedbackElement = document.getElementById(`feedback${questionNumber}`);
    feedbackElement.textContent = isCorrect ? quizData[questionNumber].feedback.correct : quizData[questionNumber].feedback.incorrect;
    feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;

    // Disable all radio buttons for this question
    document.querySelectorAll(`input[name="question${questionNumber}"]`).forEach(radio => {
        radio.disabled = true;
    });

    updateResults();
}

function updateResults() {
    let numCorrect = 0;
    quizData.forEach((_, questionNumber) => {
        const selectedAnswer = document.querySelector(`input[name="question${questionNumber}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === quizData[questionNumber].correctAnswer) {
            numCorrect++;
        }
    });

    resultsElement.textContent = `You've answered ${numCorrect} out of ${quizData.length} questions correctly!`;
}

const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');

buildQuiz();
