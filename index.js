// import everything
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const fs = require("fs");
const path = require("path");
const { toNamespacedPath } = require("path");

const outputFile = path.join(path.resolve(__dirname, "dist"), "index.html");
const employeeArray = [];
function createManagerHTML(employee){
    return `
    <div>
        <h3>MANAGER</h3>
        <h4>${employee.getName()}</h4>
        <p>EMAIL: ${employee.getEmail()}</p>
        <p>OFFICE: ${employee.getOfficeNumber()}</p>
    </div>
    `
}

function generateHTML(){
    var html = `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EMPLOYEES</title>
    </head>
    <body>
        <div>
        
        `
    
    employeeArray.forEach((employee) => {
        switch (employee.getRole()){
            case "Manager":
                html += createManagerHTML(employee);
                break;
            // case "Engineer"
            default:
                html += ""
        }
    })
    
    html += `   </div>
    </body>
    </html>`

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
                    type:"list",
                    name:"testo",
                    message: "Make another?",
                    choices: ["YES", "NO"]
                }
            ]).then((resp) => {
                switch(resp.testo){
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

