const Manager = require("../lib/Manager");

describe("Manager", () => {

    describe("Creation", () => {
        it("should create an object with a name, id, email, and office", () => {
            const employee = new Intern("Gaga", 1, "ladygaga@badromance.org", "143");

            expect(employee.name).toEqual("Gaga");
            expect(employee.id).toEqual(1);
            expect(employee.email).toEqual("ladygaga@badromance.org");
            expect(employee.office).toEqual("143");
        });
    });
});