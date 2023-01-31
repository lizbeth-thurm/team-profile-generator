const Engineer = require("../lib/Engineer");

describe("Engineer", () => {

    describe("Creation", () => {
        it("should create an object with a name, id, email, and github. Should return employee position when getting role", () => {
            const employee = new Engineer("Charli", 1, "charlixcx@hyperpop.com", "charlixcx");

            expect(employee.name).toEqual("Charli");
            expect(employee.id).toEqual(1);
            expect(employee.email).toEqual("charlixcx@hyperpop.com");
            expect(employee.github).toEqual("charlixcx");
            
            expect(employee.getRole()).toEqual("Engineer");
        });
    });
});