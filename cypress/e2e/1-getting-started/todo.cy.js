/// <reference types="cypress" />

describe('network', () => {
   it('Add to cart', () => {
     cy.visit("https://www.demoblaze.com/");
     cy.intercept("https://api.demoblaze.com/view").as("cartView");
     cy.request({
       method: "Post",
       url: "https://api.demoblaze.com/view",
       body:{"id":"1"}
     }).its("body.title").should("be.equal", "Samsung galaxy s6");
         //.its("body.price").should("be.equal", "360");



     cy.wait(1000);
     cy.getCookie("user").then((c) => {
       let userCookie = "user=" + (c.value).toString();

     // let userCookie = "user=" + cy.getCookie('user').its("value").toString();
      cy.request({
        method: "Post",
        url: "https://api.demoblaze.com/addtocart",
        body: {
          "id": guid(),
          "cookie": userCookie,
          "prod_id": 1,
          "flag": false
        }
      })
     });
     cy.on('window:alert',(message)=> {
       //assertions
       expect(message).to.contains('Product added');
       //cy.getCookie('user').should('exist');
     });
     cy.contains("Cart").click();
     cy.wait("@cartView");
     //cy.get('[id ="totalp"]').its("text()").should("be.equal", "360");
     cy.get('#totalp').should("have.text", "360");

     function guid() {
       function s4() {
         return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
       }
       return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
     }

  })
});
