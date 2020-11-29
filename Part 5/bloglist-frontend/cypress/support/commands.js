// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('createBlog', function ({ title, author, url }) {
  // click on the toggle button
  cy.contains('add new blog!')
    .click()

  // fill in all inputs
  cy.get('#author')
    .type(author)

  cy.get('#url')
    .type(url)

  cy.get('#title')
    .type(title)

  // add new blog
  cy.get('#createNewBlogButton')
    .click()

})

Cypress.Commands.add ('addUser', function ({ name, username, password }) {
  const user =
    {
      name: name,
      username: username,
      password: password
    }
  cy.request('POST', 'http://localhost:3001/api/users', user)
})


Cypress.Commands.add('login', function (credentials)
{
  cy.request(
    'POST',
    'http://localhost:3001/api/login',
    credentials)
    .then( response =>
    {
      localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(response.body)
      )
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add ('likeBlog', function(text) {
  cy.get('#blogs')
    .contains(text)
    .as('blog')

  cy.get('#blogs')
    .get('@blog')
    .children('.viewButton')
    .click()

  cy.get('@blog')
    .get('.likeButton')
    .click()

  cy.get('#blogs')
    .get('@blog')
    .children('.viewButton')
    .click()
})