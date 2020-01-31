import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import Book from "./components/Book";
import { Route, Link } from "react-router-dom";
import Search from "./components/Search";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchResult: [],
    searchTerm: null
  };

  async componentDidMount() {
    let books = await BooksAPI.getAll();
    this.setState({ books: books });
  }

  handleSearch = async event => {
    const searchTerm = event.target.value;
    let searchResult = await BooksAPI.search(searchTerm);
    this.setState({ searchResult, searchTerm });
  };

  handleChangeShelf = async (id, event) => {
    let shelf = event.target.value;
    console.log("shelf that is clicked is " + shelf);
    let book = await BooksAPI.get(id);
    console.log(book);
    await BooksAPI.update(book, shelf);
    let books = await BooksAPI.getAll();
    this.setState({ books });
  };

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/search'
          component={() => (
            <Search
              searchTerm={this.state.searchTerm}
              onSearch={this.handleSearch}
              searchResult={this.state.searchResult}
              onChangeShelf={this.handleChangeShelf}
            />
          )}
        />

        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <div className='list-books-content'>
                <div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Currently Reading</h2>
                    <div className='bookshelf-books'>
                      <ol className='books-grid'>
                        {this.state.books
                          .filter(book => {
                            return book.shelf === "currentlyReading";
                          })
                          .map(book => {
                            return (
                              <li key={book.id}>
                                <Book
                                  title={book.title}
                                  id={book.id}
                                  author={book.authors[0]}
                                  coverImage={book.imageLinks.thumbnail}
                                  shelf={book.shelf}
                                  onChangeShelf={this.handleChangeShelf}
                                />
                              </li>
                            );
                          })}
                      </ol>
                    </div>
                  </div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Want to Read</h2>
                    <div className='bookshelf-books'>
                      <ol className='books-grid'>
                        {this.state.books
                          .filter(book => {
                            return book.shelf === "wantToRead";
                          })
                          .map(book => {
                            return (
                              <li key={book.id}>
                                <Book
                                  title={book.title}
                                  id={book.id}
                                  author={book.authors[0]}
                                  coverImage={book.imageLinks.thumbnail}
                                  shelf={book.shelf}
                                  onChangeShelf={this.handleChangeShelf}
                                />
                              </li>
                            );
                          })}
                      </ol>
                    </div>
                  </div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Read</h2>
                    <div className='bookshelf-books'>
                      <ol className='books-grid'>
                        {this.state.books
                          .filter(book => {
                            return book.shelf === "read";
                          })
                          .map(book => {
                            return (
                              <li key={book.id}>
                                <Book
                                  title={book.title}
                                  id={book.id}
                                  author={book.authors[0]}
                                  coverImage={book.imageLinks.thumbnail}
                                  shelf={book.shelf}
                                  onChangeShelf={this.handleChangeShelf}
                                />
                              </li>
                            );
                          })}{" "}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className='open-search'>
                <Link to='/search'>Add a Book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
