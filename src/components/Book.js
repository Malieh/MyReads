import React from 'react';

const Book = props => {
 let style = {
    width: 128,
    height: 193,
    backgroundImage: 'url(' + props.coverImage + ')'
 }

  return (
    <div className='book'>
      <div className='book-top'>
        <div
          className='book-cover'
          style={style}
        ></div>
        <div className='book-shelf-changer'>
          <select value={ props.shelf} onChange={e => props.onChangeShelf(props.id,e)}>
            <option value='move' disabled>
              Move to...
            </option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
        <div className='book-title'>{props.title}</div>
      <div className='book-authors'>{props.author}</div>
    </div>
  );
};

export default Book;
