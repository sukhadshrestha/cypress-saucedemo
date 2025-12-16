describe('Purchase Flow', () => {
let userData;
    before(() => {
        cy.fixture('user').then((data)=>{
            userData = data;
        })
    })

  it('completes purchase flow', () => {
    cy.visit('/')

    cy.login(userData.validUser.username, userData.validUser.password);
    cy.url().should('include', '/inventory.html')

    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Onesie');

    cy.getAttr('shopping-cart-link').click();
    cy.url().should('include', '/cart.html');

    cy.contains('Sauce Labs Backpack').should('be.visible');
    cy.contains('Sauce Labs Onesie').should('be.visible');

    cy.getAttr('checkout').click();

    cy.getAttr('firstName').type(userData.userCheckout.firstname);
    cy.getAttr('lastName').type(userData.userCheckout.lastname);
    cy.getAttr('postalCode').type(userData.userCheckout.zipcode);

    cy.getAttr('continue').click();

    cy.contains('Checkout: Overview').should('be.visible');

    cy.getAttr('finish').click();

    cy.contains('Thank you for your order!').should('be.visible');
  })
})