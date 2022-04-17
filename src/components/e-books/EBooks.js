import React from 'react';
import './EBooks.css';

const EBooks = () => {
    const books = [
        {bookTitle: "IELTS Cambridge books", url: "url"},
        {bookTitle: "IELTS Cambridge books", url: "url"},
        {bookTitle: "IELTS Cambridge books", url: "url"},
        {bookTitle: "IELTS Cambridge books", url: "url"},
        {bookTitle: "IELTS Cambridge books", url: "url"},
        {bookTitle: "IELTS Cambridge books", url: "url"},
    ]
    return (
        <div className="main__ebooks">
            <h1 className="ebooks__title">eBooks</h1>
            <div className="ebooks__container">
                {
                    books.map((book, index) => 
                        <div key={index} className="ebook">
                            <div className="ebook__image"></div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default EBooks
