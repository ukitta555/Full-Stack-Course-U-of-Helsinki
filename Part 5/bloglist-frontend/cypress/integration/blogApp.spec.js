describe('Blog app', function()
{
  // clean test database and create new user
  beforeEach(function()
  {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user =
    {
      name: 'Vlad',
      username: 'ukitta',
      password: 'ukitta'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is displayed by default', function()
  {
    cy.contains('log in to the blog application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})