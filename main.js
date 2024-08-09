// Array of quiz questions, each with answers, the correct answer, and feedback
const questions = [
    {
        question: "What is the name of the Red Ranger in Power Rangers Dino Charge?",
        answers: ["Tyler", "Chase", "Riley", "Koda"],
        correct: "Tyler",
        feedback: "The Red Ranger's name is Tyler Navarro."
    },
    {
        question: "What ancient dinosaur fossil do the Rangers find their Energems with?",
        answers: ["T-Rex", "Pterodactyl", "Triceratops", "Stegosaurus"],
        correct: "T-Rex",
        feedback: "The Energems are found with various fossils, but Tyler's Energem is found with a T-Rex fossil."
    },
    {
        question: "What color Ranger is Shelby Watkins?",
        answers: ["Pink", "Blue", "Green", "Purple"],
        correct: "Pink",
        feedback: "Shelby Watkins is the Pink Ranger."
    },
    {
        question: "Who is the mentor to the Dino Charge Rangers?",
        answers: ["Keeper", "Zordon", "Gosei", "Alpha 5"],
        correct: "Keeper",
        feedback: "Keeper is the mentor to the Dino Charge Rangers."
    },
    {
        question: "Which villain seeks the Energems?",
        answers: ["Sledge", "Rita Repulsa", "Lord Zedd", "Goldar"],
        correct: "Sledge",
        feedback: "Sledge is the main villain seeking the Energems."
    },
    {
        question: "Which country was Power Rangers Dino Charge filmed in?",
        answers: ["Australia", "Canada", "United States", "New Zealand"],
        correct: "New Zealand",
        feedback: "Power Rangers Dino Charge was filmed in New Zealand."
    },
    {
        question: "How many Energems are there in total?",
        answers: ["8", "10", "12", "15"],
        correct: "10",
        feedback: "There are a total of 10 Energems."
    }
];

// Tracks the current question index
let currentQuestionIndex = 0;
// Tracks the user's score
let score = 0;

// Selects the HTML elements where content will be displayed
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

// Function to start or restart the quiz
function startQuiz() {
    currentQuestionIndex = 0; // Reset the question index to the first question
    score = 0; // Reset the score to 0
    nextBtn.style.display = 'block'; // Show the "Next" button
    restartBtn.style.display = 'none'; // Hide the "Start Quiz Again" button
    scoreDisplay.innerHTML = ''; // Clear any previous score display
    showQuestion(currentQuestionIndex); // Show the first question
}

// Function to display the current question and answers
function showQuestion(index) {
    questionContainer.innerHTML = `
        <p>${questions[index].question}</p>
        ${questions[index].answers.map((answer, i) => 
            `<button onclick="checkAnswer('${answer}', ${index})" class="btn">${answer}</button>`
        ).join('')}
    `;
    nextBtn.style.display = 'none'; // Hide the "Next" button until an answer is selected
}

// Function to check if the selected answer is correct
function checkAnswer(answer, index) {
    if (answer === questions[index].correct) {
        score++; // Increase score if the answer is correct
        alert(`Correct! ${questions[index].feedback}`); // Notify user it's correct
    } else {
        alert(`Incorrect! ${questions[index].feedback}`); // Notify user it's incorrect
    }
    currentQuestionIndex++; // Move to the next question
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex); // Show the next question if there are more
    } else {
        endQuiz(); // End the quiz if all questions are answered
    }
}

// Function to display the final score and feedback
function endQuiz() {
    questionContainer.innerHTML = ''; // Clear the question container
    nextBtn.style.display = 'none'; // Hide the "Next" button
    restartBtn.style.display = 'block'; // Show the "Start Quiz Again" button
    let pass = score >= Math.ceil(questions.length / 2); // Determine if user passed
    scoreDisplay.innerHTML = `
        <h2>Your score: ${score}/${questions.length}</h2>
        <h3>${pass ? 'You passed!' : 'You did not pass. Better luck next time!'}</h3>
        ${!pass ? '<p>Here are some details to help you improve:</p>' : ''}
        <ul>
            ${questions.map((q, index) => {
                return `
                    <li>
                        <strong>${q.question}</strong><br>
                        Correct Answer: ${q.correct}<br>
                        ${score <= index ? q.feedback : ''}
                    </li>
                `;
            }).join('')}
        </ul>
    `;
}

// Function to restart the quiz by calling startQuiz
function restartQuiz() {
    startQuiz();
}

// Event listener to move to the next question when the "Next" button is clicked
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex); // Show the next question
    } else {
        endQuiz(); // End the quiz if no more questions
    }
});

// Start the quiz when the page loads
startQuiz();
