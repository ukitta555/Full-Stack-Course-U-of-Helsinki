import React from 'react'

const BookList = ({books, selectedGenre}) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter(book => {
              if (!selectedGenre) {
                return true
              }
              else {
                if (book.genres.includes(selectedGenre)) {
                  return true
                }
                else return false
              }
            })
            .map(book =>
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default BookList