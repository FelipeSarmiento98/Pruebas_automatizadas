export class LoginPage {
    login() {
      cy.login(); 
    }
  }
  export const loginPage = new LoginPage();
  