describe('Blog app', function()
{
  // clean test database and create new user
  beforeEach(function()
  {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.addUser({
      name: 'Vlad',
      username: 'ukitta',
      password: 'ukitta'
    })
    cy.visit('http://localhost:3000')
  })

  it('login form is displayed by default', function()
  {
    cy.contains('log in to the blog application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function()
  {
    it ('succeeds with correct credentials', function()
    {
      cy.get('#loginUsernameInput')
        .type('ukitta')
      cy.get('#loginPasswordInput')
        .type('ukitta')
      cy.get('#loginButton')
        .click()

      cy.contains('blogs')
      cy.contains('add new blog!')
    })

    it ('fails with wrong credentials', function()
    {
      cy.get('#loginUsernameInput')
        .type('ukitta')
      cy.get('#loginPasswordInput')
        .type('wrong')
      cy.get('#loginButton')
        .click()

      cy.contains('Failed to login! Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function()
  {
    beforeEach(function()
    {
      cy.login({
        username: 'ukitta',
        password: 'ukitta'
      })
    })

    it('user can create new blog', function()
    {
      // create 1st blog
      cy.createBlog({title: 'test title', author: 'test author', url: 'testsite.com'})
      // say this one creates 2 blogs instead of 1
      cy.createBlog({title: 'bugged', author: 'bugged', url: 'bugged.com'})

      // check whether 1st blog has rendered
      cy.get('#blogs')
        .contains('test author')
        .contains('test title')

      // check whether 2nd blog  has rendered
      cy.get('#blogs')
        .contains('bugged')
        .contains('bugged')

      cy.get('#blogs')
        .get('.blog')
        .should('have.length', 2)
    })

    it('user can like the blog', function()
    {
      cy.createBlog({title: 'test title', author: 'test author', url: 'testsite.com'})
      cy.get('.viewButton')
        .click()

      cy.get('.likeButton')
        .click()

      cy.get('.blog')
        .contains('test title')
        .contains('Likes: 1')
    })

    it('user can delete the created blog', function()
    {
      cy.createBlog({title: 'test title', author: 'test author', url: 'testsite.com'})

      cy.get('.viewButton')
        .click()

      cy.get('.removeButton')
        .click()

      cy.get('html')
        .should('not.contain', 'test title test author')
    })

    it('other users can\'t delete the created blog', function()
    {
      cy.createBlog({title: 'test title', author: 'test author', url: 'testsite.com'})

      cy.get('#logoutButton')
        .click()

      cy.addUser({
        name: 'other',
        username: 'other',
        password: 'other'
      })

      cy.login(
        {
          username: 'other',
          password: 'other'
        })

      cy.get('.blog')
        .get('.viewButton')
        .click()

      cy.get('removeButton')
        .should('not.exist')
    })

    it.only('blogs are in sorted order (like-wise)', function()
    {
      cy.createBlog({title: 'first', author: 'test author', url: 'testsite.com'})
      cy.createBlog({title: 'second', author: 'test author', url: 'testsite.com'})
      cy.createBlog({title: 'third', author: 'test author', url: 'testsite.com'})

      cy.likeBlog('third test author')
      cy.likeBlog('third test author')
      cy.likeBlog('second test author')

      cy.get('.blog')
        .then (($blogs) =>
        {
          let maxLikes = 1000
          cy.wrap($blogs)
            .each(($blog) =>
            {
              cy.wrap($blog)
                .children('.viewButton')
                .click()


              cy.wrap($blog)
                .get('.blogLikes')
                .then($likes =>
                {
                  const likesString = String($likes.text())
                  const currentLikes = Number(likesString.charAt(7))
                  expect(maxLikes).to.satisfy(num => num >= currentLikes)
                  maxLikes = currentLikes
                })


              cy.wrap($blog)
                .children('.viewButton')
                .click()
            })
        })
    })

  })
})