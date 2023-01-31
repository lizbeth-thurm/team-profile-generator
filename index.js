// import everything
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const fs = require("fs");
const path = require("path");
const { toNamespacedPath } = require("path");
const Employee = require("./lib/Employee");

const outputFile = path.join(path.resolve(__dirname, "dist"), "index.html");

const employeeArray = [];

function createManagerHTML(employee) {
    return `
    <div>
        <h3>MANAGER</h3>
        <h4>${employee.getName()}</h4>
        <p>EMAIL: ${employee.getEmail()}</p>
        <p>OFFICE: ${employee.getOfficeNumber()}</p>
    </div>
    `
}

function generateHTML() {
    console.log(employeeArray);
    var html =
        `
    <!doctype html>
    <html lang="en">
    
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
            integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        <link rel="stylesheet" href="./style.css">
    
        <title>The Team</title>
    
    </head>
    
    <body>
    
        <div>
            <h1>
    THE TEAM
            </h1>
        </div>
    
        <div class="p-3 mb-2 bg-primary text-white border border-dark rounded">

${employeeArray.map((employee) => {
    // getrole switch statements...
    return createManagerHTML(employee);
        })
    }

    </div>
    
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"></script>
    </body>
    
    </html>
`

console.log("HTML", html);

    fs.writeFileSync(outputFile, html, "utf-8");
    console.log("Write successful; please check dist folder for index.html");
    process.exit();
}


// inquire for classes
function createManager() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "name",
                message: "What is the manager's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the manager's ID?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the manager's email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the manager's office number?"
            }
        ]
    )
        .then((answers) => {
            console.log(answers)
            employeeArray.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber));

            // main prompt
            // Setting 
            inquirer.prompt([
                {
                    type: "list",
                    name: "choice",
                    message: "Make another?",
                    choices: ["YES", "NO"]
                }
            ]).then((resp) => {
                switch (resp.choice) {
                    case "YES":
                        createManager();
                        break;
                    default:
                        generateHTML();
                }
            })
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}

// add instances to array [{},{}]


// generate string

createManager();

