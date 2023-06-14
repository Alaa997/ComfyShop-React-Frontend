describe("Login", () => {
  it("Should display an error message for missing credentials", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('button[type="submit"]').click();

    // Assertions for error messages
    cy.contains("This field is required!").should("be.visible");
  });

  it("Should log in a user", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("alaa2@gmail.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();

    //   Assertions for successful signup
    cy.url().should("include", "/home");
  });
});
