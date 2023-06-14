describe("Signup", () => {
  it("Should successfully sign up a new user", () => {
    cy.visit("http://localhost:3000/signup");

    cy.get('input[name="firstName"]').type("Alaa");
    cy.get('input[name="lastName"]').type("Tarakji");
    cy.get('input[name="email"]').type("alaa3@gmail.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('input[name="address"]').type("123 Street, City");

    cy.get('button[type="submit"]').click();

    //   Assertions for successful signup
    cy.url().should("include", "/login");
  });
});
