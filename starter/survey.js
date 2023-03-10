import inquirer from "inquirer";

// fill the questions
const questions = [
  {
    type: "input",
    name: "firstName",
    message: "What's your first name?",
    validate: (input) => {
      if (!/\S/.test(input)) {
        return "Name cannot be empty";
      }
      if (!/^[a-zA-Z\s]*$/.test(input)) {
        return "Name can only contain letters and spaces";
      }
      return true;
    },
    filter: (input) =>
      input.replaceAll(" ", "").charAt(0).toUpperCase() +
      input.replaceAll(" ", "").toLowerCase().slice(1),
  },
  {
    type: "input",
    name: "emailAddress",
    message: (answers) =>
      `Hello, ${answers.firstName}! What's your gmail address?`,
    validate: (input) => {
      if (!/^[\w.-]+@gmail\.com$/.test(input)) {
        return "Email has to be a valid gmail address (xxx@gmail.com)";
      }
      return true;
    },
  },
  {
    type: "list",
    name: "isExperienced",
    message: "Are you an experienced developer?",
    choices: ["yes", "no"],
  },
  {
    type: "list",
    name: "yearsOfExperience",
    message: "How many years of experience you have with JavaScript?",
    choices: ["0-1", "1-3", "3-5", "5-10", "10+"],
    when: (answers) => {
      if (answers.isExperienced === "yes") {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    type: "checkbox",
    name: "jsLibraries",
    message: "How many javascript library do you know?",
    choices: ["React.js", "Vue", "Angular", "Node.js", "jQuery", "D3.js"],
    when: (answers) => {
      if (answers.isExperienced === "yes") {
        return true;
      }
      return false;
    },
    validate: (input) => {
      if (input.length > 0) {
        return true;
      } else {
        return "You need to select at least one javascript library.";
      }
    },
  },

  {
    type: "number",
    name: "expectedSalary",
    message: "What is your desired salary (IDR)?",
    when: (answers) => {
      if (answers.isExperienced === "yes") {
        return true;
      } else {
        return false;
      }
    },
    validate: (input) => {
      if (!isNaN(parseFloat(input))) {
        if (input > 0) {
          return true;
        }
        return "Salary cannot be 0";
      }
      return false || "Please enter a number";
    },
  },
  {
    type: "confirm",
    name: "confirmInput",
    message: "Are you sure you want to proceed with the given information?",
    default: true,
  },
];

// run your command
function runPrompt() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      if (answers.confirmInput === false) {
        // If the user is not sure, restart the prompt from the beginning
        return runPrompt();
      }
      console.log(JSON.stringify(answers, null, 2));
      console.log(`Thank you, ${answers.firstName}!`);
      console.log(`Your email address is ${answers.emailAddress}.`);
      if (answers.isExperienced === "yes") {
        console.log(`You are an experienced developer.`);
      } else {
        console.log(`You are not an experienced developer yet.`);
      }
      if (answers.isExperienced === "no") {
        console.log("need to learn more.");
      } else {
        const numLibraries = answers.jsLibraries.length;
        if (numLibraries < 3) {
          console.log("You have some knowledge of javascript libraries.");
        } else if (numLibraries < 6) {
          console.log("You have a good knowledge of javascript libraries.");
        } else {
          console.log(
            "You have a perfect knowledge of JS libraries. You're a genius!"
          );
        }
        console.log(
          `You know the following JavaScript libraries: ${answers.jsLibraries.join(
            ", "
          )}.`
        );
        console.log(
          `Your expected salary is Rp.${answers.expectedSalary},00-.`
        );
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Your console environment is not supported!");
      } else {
        console.log(error);
      }
    });
}

// call the function to start the survey prompt
runPrompt();
