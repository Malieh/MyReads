import React from "react";

const BookShelf = props => {
  return (
    <div className='bookshelf-books'>
      <ol className='books-grid'>
        {this.state.books
          .filter(book => {
            return book.shelf === "currentlyReading";
          })
          .map(book => {
            return (
              <li>
                <Book
                  title={book.title}
                  key={book.id}
                  author={book.authors[0]}
                  coverImage={book.imageLinks.thumbnail}
                  shelf={book.shelf}
                />
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default BookShelf;
