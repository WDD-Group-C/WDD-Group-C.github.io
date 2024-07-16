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
let programStarted = false;



const questions = [
  // Step 1: Personal Details
  [
    { text: "Your Name:", type: "Name" },
    { text: "Gender:", type: "Gender" },
    { text: "Age:", type: "Age" },
    { text: "Occupation", type: "Occupation" }
  ],

  // Step 2: Contact Information
  [
    { text: "Tel:", type: "Tel" },
    { text: "Email:", type: "Email" },
    { text: "Surname:", type: "Surname" }
  ],

  // Step 3: Motivation and Contribution
  [
    { text: "Reason For Joining:", type: "Motivation" },
    { text: "Contribution:", type: "Contribution" },
    { text: "Future Goals:", type: "Achievement" },
    { text: "Commitment:", type: "Commitment" },
    { text: "Contribution Priority:", type: "Priority" }
  ]
];

// Calculate total number of questions
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
  }
  else if ((currentStep + 1 ) == 2) {
    stepQuestion = "Contact Information"
  }
  else {
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

  
// Function to handle Next button click
nextButton.addEventListener("click", function() {
  let answer = promptBox.textContent.trim();
  if (answer === "") {
    nextButton.classList.add("animate-border");
    nextButton.disable = true;

    // Remove animation class after animation completes
    setTimeout(function() {
      nextButton.classList.remove("animate-border");
    }, 1000);

    return; // Exit function if answer is empty
  }


  outputContainer.innerHTML += `${questions[currentStep][currentQuestion].type}: ${answer}<br>`;
  currentQuestion++;

  if (currentQuestion >= questions[currentStep].length) {
    currentStep++;
    currentQuestion = 0;
    if (currentStep >= questions.length) {
      progressBar.value = 100;
      progressText.textContent = "Profile completed 100%";
      nextButton.style.display = "none";
      skipButton.style.display = "none";
      steps.style.display = "none";
      startButton.style.display = "none";

      // Add <br> after the last element in outputContainer
      outputContainer.innerHTML += "<br>";
      
      return;
    }
    addStepSeparator();
  }
  updatePrompt(); // Update prompt for the next question
  // Update progress
  let completedQuestions = questions
    .slice(0, currentStep) // Consider all completed steps
    .reduce((acc, curr) => acc + curr.length, 0) + currentQuestion; // Add completed questions in current step
  let percentCompleted = Math.floor((completedQuestions / totalQuestions) * 100);
  progressBar.value = percentCompleted;
  progressText.textContent = `Profile completed ${percentCompleted}%`;
});


// Function to handle Skip button click
skipButton.addEventListener("click", function() {
  let skippedType = questions[currentStep][currentQuestion].type;
  outputContainer.innerHTML += `<span>${skippedType}: </span><span contenteditable="true" spellcheck="false">Skipped</span><br>`;
  currentQuestion++;
  if (currentQuestion >= questions[currentStep].length) {
    currentStep++;
    currentQuestion = 0;
    if (currentStep >= questions.length) {
      progressBar.value = 100;
      progressText.textContent = "Profile completed 100%";
      nextButton.style.display = "none";
      skipButton.style.display = "none";
      steps.style.display = "none";
      startButton.style.display = "none";

      // Add <br> after the last element in outputContainer
      outputContainer.innerHTML += "<br>";

      return;
    }
    addStepSeparator();
  }
  updatePrompt(); // Update prompt for the next question
  // Update progress
  let completedQuestions = questions
    .slice(0, currentStep) // Consider all completed steps
    .reduce((acc, curr) => acc + curr.length, 0) + currentQuestion; // Add completed questions in current step
  let percentCompleted = Math.floor((completedQuestions / totalQuestions) * 100);
  progressBar.value = percentCompleted;
  progressText.textContent = `Profile completed ${percentCompleted}%`;})



// Function to add  separator after each step
function addStepSeparator() {
  let separator = document.createElement("hr");
  separator.className = "step-separator";
  outputContainer.appendChild(separator);
  outputContainer.innerHTML += "STEP" + " " + (currentStep + 1);
  outputContainer.innerHTML += "<br><br>";

}

promptBox.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) { // Check if Enter key is pressed
    event.preventDefault(); // Prevent default behavior (new line or form submission)
    promptBox.blur();
  }
});

// Add event listener to the outputContainer for keydown events on contenteditable spans
outputContainer.addEventListener("keydown", function(event) {
  if (event.target.matches("[contenteditable='true']")) { // Check if the target is a contenteditable span
    if (event.keyCode === 40 || event.keyCode === 38) { // Check if down or up arrow key is pressed
      event.preventDefault(); // Prevent default scrolling behavior

      // Find all contenteditable spans inside outputContainer
      let editableElements = outputContainer.querySelectorAll("[contenteditable='true']");
      
      // Find the index of the current element
      let currentIndex = Array.from(editableElements).indexOf(event.target);
      
      // Determine the direction based on the pressed key
      let direction = (event.keyCode === 40) ? 1 : -1; // 1 for down, -1 for up
      
      // Start iterating from the current index + direction
      let nextIndex = currentIndex + direction;
      
      // Loop until a valid element is found or we reach the boundaries
      while (nextIndex >= 0 && nextIndex < editableElements.length) {
        let nextElement = editableElements[nextIndex];
        
        // Check if the next element is a separator or "Skipped"
        let isSeparator = nextElement.classList.contains("step-separator");
        let isSkipped = nextElement.textContent.trim() === "Skipped";
        
        if (isSeparator || isSkipped) {
          nextElement.focus(); // Focus on the next 'Skipped' element found
          break; // Exit the loop once a valid element is found and focused
        }
        
        // Move to the next index in the specified direction
        nextIndex += direction;
      }
    } else if (event.keyCode === 13) { // Check if Enter key is pressed
      event.preventDefault(); // Prevent default behavior (new line or form submission)
      let currentElement = event.target;
      
      // Check if the current element was "Skipped" and has been changed
      if (currentElement.textContent.trim() !== "Skipped") {
        currentElement.blur(); // Remove focus from the element
        currentElement.removeAttribute("contenteditable"); // Remove contenteditable attribute
      }
      else {
        currentElement.blur();
      }
    }
  }
});

// Add event listener to detect clicks outside the outputContainer
document.addEventListener("click", function(event) {

  // Find all contenteditable spans inside outputContainer
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
  }
  else {
    startProgram(); // Call the function to start the program
    programStarted = true;
  }
}, { once: true }); // Execute the event listener only once

// Add event listener to the window for keydown events
window.addEventListener("keypress", function(event) {
  if (!programStarted && event.keyCode === 13) { // Check if Enter key is pressed
    event.preventDefault(); // Prevent default behavior
    startProgram(); // Call the function to start the program

  } else if (programStarted && !event.target.matches("[contenteditable='true']")) {
    // If program has started and the key is not in contenteditable span
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

