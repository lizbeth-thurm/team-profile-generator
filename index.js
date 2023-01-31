// import dependencies and files
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const fs = require("fs");
const path = require("path");
const { toNamespacedPath } = require("path");
const Employee = require("./lib/Employee");

// establish output path
const outputFile = path.join(path.resolve(__dirname, "dist"), "index.html");

// empty array for storing employee information
const employeeArray = [];

// function to create HTML for managers
function createManagerHTML(employee) {
    return `
    <div>
        <h3>MANAGER</h3>
        <h4>${employee.getName()}</h4>
        <p>ID: ${employee.getId()}</p>
        <p>EMAIL: ${employee.getEmail()}</p>
        <p>OFFICE: ${employee.getOfficeNumber()}</p>
    </div>
    `
}

// function to create HTML for engineers
function createEngineerHTML(employee) {
    return `
    <div>
        <h3>ENGINEER</h3>
        <h4>${employee.getName()}</h4>
        <p>ID: ${employee.getId()}</p>
        <p>EMAIL: ${employee.getEmail()}</p>
        <p>GITHUB: ${employee.getGithub()}</p>
    </div>
    `
}

// function to create HTML for interns
function createInternHTML(employee) {
    return `
    <div>
        <h3>INTERN</h3>
        <h4>${employee.getName()}</h4>
        <p>ID: ${employee.getId()}</p>
        <p>EMAIL: ${employee.getEmail()}</p>
        <p>SCHOOL: ${employee.getSchool()}</p>
    </div>
    `
}

// function to generate HTML for app
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
            switch (employee.getRole()) {
                case "Manager":
                    return createManagerHTML(employee);
                    break;
                case "Engineer":
                    return createEngineerHTML(engineer);
                    break;
                case "Intern":
                    return createInternHTML(intern);
                    break;
                default:
                    break;
            }
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


    // write HTML to index.html file in dist folder
    fs.writeFileSync(outputFile, html, "utf-8");
    console.log("Write successful; please check dist folder for index.html");
    process.exit();
}


// inquire for classes

// main inquirer to start selection
function mainPrompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Please select the position of the employee you would like to add or select the generate option to generate the site.",
            choices: ["Manager", "Engineer", "Intern", "Generate"]
        }
    ]).then((resp) => {
        switch (resp.choice) {
            case "Manager":
                createManager();
                break;
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            case "Generate":
                generateHTML();
                break;
            case "Default":
                generateHTML();
                break;
        }
    })
}

// function for creating manager
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
                        mainPrompt();
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

// function for creating engineer
function createEngineer() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "name",
                message: "What is the engineer's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the engineer's ID?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineer's email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the engineer's GitHub username?"
            }
        ]
    )
        .then((answers) => {
            console.log(answers)
            employeeArray.push(new Engineer(answers.name, answers.id, answers.email, answers.github));

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
                        mainPrompt();
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

// function for creating intern
function createIntern() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "name",
                message: "What is the intern's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the intern's id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the intern's email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is the intern's school?"
            }
        ]
    )
        .then((answers) => {
            console.log(answers)
            employeeArray.push(new Intern(answers.name, answers.id, answers.email, answers.school));

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
                        mainPrompt();
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

mainPrompt();

