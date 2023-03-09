import inquirer from "inquirer";

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
        return "You have to choose at least one library";
      }
    },
  },

  {
    type: "number",
    name: "expectedSalary",
    message: "What is your desired salary?",
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
];

// run your command
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });
