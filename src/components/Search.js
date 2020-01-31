import React from "react";

import Book from "./Book";
import { Link } from "react-router-dom";

const Search = props => {
  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link className='close-search' to='/'>
          Close
        </Link>
        <div className='search-books-input-wrapper'>
          {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
          <input
            type='text'
            placeholder='Search by title or author'
            value={props.searchTerm || ""}
            onChange={e => props.onSearch(e)}
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {Array.isArray(props.searchResult) &&
            props.searchResult.length &&
            props.searchResult.map((book, index) => {
              if (book.imageLinks) {
                return (
                  <li key={`${props.id}${index}`}>
                    <Book
                      title={book.title}
                      id={book.id}
                      key={book.id}
                      coverImage={book.imageLinks.thumbnail}
                      shelf={book.shelf}
                      onChangeShelf={props.onChangeShelf}
                    />
                  </li>
                );
              }
              return (
                <li key={props.id}>
                  <Book
                    title={book.title}
                    id={book.id}
                    key={book.id}
                    shelf={book.shelf}
                    onChangeShelf={props.onChangeShelf}
                  />
                </li>
              );
            })}
          {!Array.isArray(props.searchResult) && (
            <h2>Nothing Found! Try another Term</h2>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Search;
