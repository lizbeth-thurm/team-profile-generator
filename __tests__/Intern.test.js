const Intern = require("../lib/Intern");

describe("Intern", () => {

    describe("Creation", () => {
        it("should create an object with a name, id, email, and school. Should return employee position when getting role", () => {
            const employee = new Intern("Laura", 1, "laurales@gecs.gov", "GEC");

            expect(employee.name).toEqual("Laura");
            expect(employee.id).toEqual(1);
            expect(employee.email).toEqual("laurales@gecs.gov");
            expect(employee.school).toEqual("GEC");

            expect(employee.getRole()).toEqual("Intern");
        });
    });
});