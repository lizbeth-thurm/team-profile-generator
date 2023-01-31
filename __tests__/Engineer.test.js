const Employee = require("../lib/Employee");

describe("Employee", () => {

    describe("Creation", () => {
        it("should create an object with a name, id, email, and github", () => {
            const employee = new Employee("Charli", 1, "charlixcx@hyperpop.com", "charlixcx");

            expect(employee.name).toEqual("Charli");
            expect(employee.id).toEqual(1);
            expect(employee.email).toEqual("charlixcx@hyperpop.com");
            expect(employee.github).toEqual("charlixcx");
        });
    });
});