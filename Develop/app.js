const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const workMates = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function generateManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your manager?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the ID number for your manager?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the email for your manager?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the office number for your manager?",
      },
    ])
    .then(function (result) {
      console.log(result);
      const freshManager = new Manager(
        result.name,
        result.id,
        result.email,
        result.officeNumber
      );
      workMates.push(freshManager);
      generateTeam();
    });
}
generateManager();

function generateTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addMate",
        message: "Shall we add a workmate?",
        choices: [
          "Sure, add a Manager",
          "Sure, add an Engineer",
          "Sure, add an Intern",
          "No that's ok team has been assembled",
        ],
      },
    ])
    .then(function (data) {
      switch (data.addMate) {
        case "Sure, add a Manager":
          generateManager();
          break;
        case "Sure, add an Intern":
          generateIntern();
          break;
        case "Sure, add an Engineer":
          generateEngineer();
          break;
        case "No that's ok team has been assembled":
          makeTeam();
          break;
      }
    });
}

function generateEngineer() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of your Engineer?",
      },
      {
        name: "id",
        type: "input",
        message: "What is the ID number for your Engineer?",
      },
      {
        name: "email",
        type: "input",
        message: "What is the email for your Engineer?",
      },
      {
        name: "github",
        type: "input",
        message: "What is the GitHub username of your Engineer?",
      },
    ])
    .then(function (result) {
      const freshEngineer = new Engineer(
        result.name,
        result.id,
        result.email,
        result.github
      );
      workMates.push(freshEngineer);
      generateTeam();
    });
}

function generateIntern() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of your Intern?",
        },
        {
          name: "id",
          type: "input",
          message: "What is the ID number for your Intern?",
        },
        {
          name: "email",
          type: "input",
          message: "What is the email for your Intern?",
        },
        {
          name: "school",
          type: "input",
          message: "What school is your Intern from?",
        },
      ])
      .then(function (result) {
        const freshIntern = new Intern(
          result.name,
          result.id,
          result.email,
          result.school
        );
        workMates.push(freshIntern);
        generateTeam();
      });
  }

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


function makeTeam() {
    fs.writeFileSync(outputPath, render(workMates), "utf8");
}



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
