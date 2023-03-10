const Employee = require("../lib/Employee");

describe("Employee", () => {

    describe("Creation", () => {
        it("should create an object with a name, id, and email.  Should return employee position when getting role.", () => {
            const employee = new Employee("Taylor", 1, "tswift@taylorswift.org");

            expect(employee.name).toEqual("Taylor");
            expect(employee.id).toEqual(1);
            expect(employee.email).toEqual("tswift@taylorswift.org");
            
            expect(employee.getRole()).toEqual("Employee");
        });
    });

});