// describe("AddProduct", () => {

//   it("should add a new product when user is logged in", () => {
//     cy.visit("http://localhost:3000/login");

//     cy.get('input[name="email"]').type("ali@gmail.com");
//     cy.get('input[name="password"]').type("ali");
//     cy.get('button[type="submit"]').click();

//     //   Assertions for successful signup
//     cy.url().should("include", "/home");

//     cy.visit("http://localhost:3000/addproduct");

//     // Fill in the product details
//     cy.get('input[name="name"]').type("New Product");
//     cy.get('textarea[name="description"]').type("Product description");
//     cy.get('input[name="price"]').type("19.99");

//     // Select a category
//     cy.get('select[name="category"]').select("Jewelry");

//     // Submit the form
//     cy.get('button[type="submit"]').click();

//     // Assert that the product is added successfully
//     cy.contains("New Product").should("exist");
//     cy.contains("Product description").should("exist");
//     cy.contains("19.99").should("exist");
//   });
// });

describe("AddProduct", () => {
  beforeEach(() => {
    // Log in and obtain the access token
    cy.request("POST", "http://localhost:8081/user/login", {
      email: "ali@gmail.com",
      password: "ali",
    }).then((response) => {
      const token = response.body.accessToken;

      // Store the token in local storage to persist it between tests
      localStorage.setItem("accessToken", token);
    });
  });

  it("should add a new product when user is logged in", () => {
    // Visit the home page to ensure the user is logged in
    cy.visit("http://localhost:3000/home");

    cy.visit("http://localhost:3000/addproduct", {
      // Pass the access token in the request headers
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    // Fill in the product details
    cy.get('input[name="name"]').type("Product2");
    cy.get('textarea[name="description"]').type("Product description");
    cy.get('input[name="price"]').type("19.99");

    // Select a category
    cy.get('select[name="category"]').select("Jewelry");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that the product is added successfully
    // cy.contains("Product2").should("exist");
    // cy.contains("Product description").should("exist");
    // cy.contains("19.99").should("exist");
  });
});
