// Constants needed for functionality

const steps = document.getElementById("steps");
const stepText = document.getElementById("stepText");
const questionText = document.getElementById("questionText");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const outputContainer = document.getElementById("output");
const outputText = document.getElementById("outputText");
const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const skipButton = document.getElementById("skipButton");
const promptBox = document.getElementById("promptBox");


let currentStep = 0;
let currentQuestion = 0;
let programStarted = false; // Flag to avoid program starting twice



const questions = [
    // Step 1: Personal Details
    [{
            text: "Your Name:",
            type: "Name"
        },
        {
            text: "Gender:",
            type: "Gender"
        },
        {
            text: "Age:",
            type: "Age"
        },
        {
            text: "Occupation",
            type: "Occupation"
        }
    ],

    // Step 2: Contact Information
    [{
            text: "Tel:",
            type: "Tel"
        },
        {
            text: "Email:",
            type: "Email"
        },
        {
            text: "Surname:",
            type: "Surname"
        }
    ],

    // Step 3: Motivation and Contribution
    [{
            text: "Reason For Joining:",
            type: "Motivation"
        },
        {
            text: "Contribution:",
            type: "Contribution"
        },
        {
            text: "Future Goals:",
            type: "Achievement"
        },
        {
            text: "Commitment:",
            type: "Commitment"
        },
        {
            text: "Contribution Priority:",
            type: "Priority"
        }
    ]
];

// Calculate total number of questions for progress bar
const totalQuestions = questions.reduce((acc, curr) => acc + curr.length, 0);


// Function to start the program
function startProgram() {

    heading.classList.add("move-up");
    startButton.classList.add("move-up");

    steps.style.display = "inline-block";
    steps.classList.add("fade-in");

    progressBar.style.display = "inline-block";
    progressBar.classList.add("fade-in");

    progressText.style.display = "block";
    progressText.classList.add("fade-in");

    outputContainer.style.display = "block";
    outputContainer.classList.add("fade-in");

    outputText.style.display = "block";
    outputText.classList.add("fade-in");

    // Focus on the promptBox initially after pressing the start button
    promptBox.focus();

    programStarted = true;

    updatePrompt();

}


// Function to update prompt with current question
function updatePrompt() {
    let currentStepQuestions = questions[currentStep];
    let question = currentStepQuestions[currentQuestion];
    let stepQuestion = "";

    if ((currentStep + 1) == 1) {
        stepQuestion = "Personal Details"
    } else if ((currentStep + 1) == 2) {
        stepQuestion = "Contact Information"
    } else {
        stepQuestion = "Motivation And Contribution"
    }


    // Template literal to display the current step and current question
    stepText.textContent = `STEP ${currentStep + 1} : ${stepQuestion} | Question ${currentQuestion + 1}/${currentStepQuestions.length}`;
    questionText.textContent = question.text;
    promptBox.textContent = ""; // Clear previous answer

    if (currentStep === 0 && currentQuestion === 0) {
        outputContainer.innerHTML += "<br>";
        outputContainer.innerHTML += "STEP 1";
        outputContainer.innerHTML += "<br><br>";
    }

}

// Function to update output container with the user's answer
function updateOutput(answer) {
    let type = questions[currentStep][currentQuestion].type;
    outputContainer.innerHTML += `${type}: ${answer}<br>`;
}

// Function to handle advancing to the next question or step
function advanceToNext() {
    currentQuestion++;
    if (currentQuestion >= questions[currentStep].length) {
        currentStep++;
        currentQuestion = 0;
        if (currentStep >= questions.length) {
            completeProfile();
            return;
        }
        addStepSeparator();
    }
    updatePrompt();
}

// Function to update progress bar
function updateProgress() {
    let completedQuestions = questions
        .slice(0, currentStep)
        .reduce((acc, curr) => acc + curr.length, 0) + currentQuestion;
    let percentCompleted = Math.floor((completedQuestions / totalQuestions) * 100);
    progressBar.value = percentCompleted;
    progressText.textContent = `Profile completed ${percentCompleted}%`;
}

// Function to handle profile completion
function completeProfile() {
    progressBar.value = 100;
    progressText.textContent = "Profile completed 100%";
    steps.style.display = "none";
    startButton.style.display = "none";
    outputContainer.innerHTML += "<br>";
}

// Next button event handler
nextButton.addEventListener("click", function() {
    let answer = promptBox.textContent.trim();
    if (answer === "") {
        nextButton.classList.add("animate-border");
        nextButton.disable = true;
        setTimeout(function() {
            nextButton.classList.remove("animate-border");
        }, 1000);
        return;
    }
    updateOutput(answer);
    advanceToNext();
    updateProgress();
});

// Skip button event handler
skipButton.addEventListener("click", function() {
    outputContainer.innerHTML += `<span>${questions[currentStep][currentQuestion].type}: </span><span contenteditable="true" spellcheck="false">Skipped</span><br>`;
    advanceToNext();
    updateProgress();
});


// Function to add a separator line after each step in the output
function addStepSeparator() {
    let separator = document.createElement("hr");
    separator.className = "step-separator";
    outputContainer.appendChild(separator);
    outputContainer.innerHTML += "STEP" + " " + (currentStep + 1);
    outputContainer.innerHTML += "<br><br>";

}

// Event listener to promptBox to detect the enter key being pressed
promptBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed
        event.preventDefault();
        promptBox.blur(); // remove focus from the prompt box when enter is pressed
    }
});

// Add event listener to the outputContainer for keydown events on contenteditable spans to traverse between Skipped prompts
// Allows user to go back to skipped prompts
outputContainer.addEventListener("keydown", function(event) {
    if (event.target.matches("[contenteditable='true']")) { // Check if the target is a contenteditable span
        if (event.key === "ArrowDown" || event.key === "ArrowUp") { // Check if down or up arrow key is pressed
            event.preventDefault();

            let editableElements = outputContainer.querySelectorAll("[contenteditable='true']");
            let currentIndex = Array.from(editableElements).indexOf(event.target);

            // Determine the direction based on the pressed key. 1 for down, -1 for up
            let direction = (event.key === "ArrowDown") ? 1 : -1;

            let nextIndex = currentIndex + direction;

            while (nextIndex >= 0 && nextIndex < editableElements.length) {
                let nextElement = editableElements[nextIndex];

                // Check if the next element is a separator or "Skipped"
                let isSeparator = nextElement.classList.contains("step-separator");
                let isSkipped = nextElement.textContent.trim() === "Skipped";

                if (isSeparator || isSkipped) {
                    nextElement.focus(); // Focus on the next 'Skipped' element found
                    break;
                }

                // Move to the next index in the specified direction
                nextIndex += direction;
            }
        } else if (event.key === "Enter") {
            event.preventDefault();
            let currentElement = event.target;

            // Check if the current element was "Skipped" and has been changed
            if (currentElement.textContent.trim() !== "Skipped") {
                currentElement.blur(); // Remove focus
                currentElement.removeAttribute("contenteditable"); // Remove contenteditable attribute as the value is not "Skipped"
            } else {
                currentElement.blur(); // Remove focus
            }
        }
    }
});

// Add event listener to detect clicks outside the outputContainer
document.addEventListener("click", function() {

    let editableElements = outputContainer.querySelectorAll("[contenteditable='true']");

    // Loop through each editable element
    editableElements.forEach(element => {
        // Check if the element's text content is not "Skipped"
        if (element.textContent.trim() !== "Skipped") {
            element.removeAttribute("contenteditable"); // Remove contenteditable attribute
        }
    });
});


// Add event listener to the Start button for click events
startButton.addEventListener("click", function() {
    if (programStarted == true) {
        return
    } else {
        startProgram(); // Call the function to start the program
        programStarted = true;
    }
}, {
    once: true
}); // Execute the event listener only once

// Add event listener to the window for keydown events
window.addEventListener("keypress", function(event) {
    if (!programStarted && event.key === "Enter") {
        event.preventDefault();
        startProgram();

    } else if (programStarted && !event.target.matches("[contenteditable='true']")) {
        switch (event.key) {
            case "n":
            case "N":
                if (nextButton.style.display !== "none") {
                    event.preventDefault();
                    nextButton.click(); // Trigger Next button click
                }
                break;

            case "s":
            case "S":
                if (skipButton.style.display !== "none") {
                    event.preventDefault();
                    skipButton.click(); // Trigger Skip button click
                }
                break;

            case "p":
            case "P":
                event.preventDefault();
                promptBox.focus(); // Focus on the promptBox
                break;

            default:
                break;
        }
    }
});