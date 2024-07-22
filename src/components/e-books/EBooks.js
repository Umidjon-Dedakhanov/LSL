import React from 'react';
import './EBooks.css';
import glossary from '../../assets/ebooks/Glossary.png'
import handbook from '../../assets/ebooks/Handbook for teachers.png'
import direct from '../../assets/ebooks/Direct to (macmelan).png'
import writing from '../../assets/ebooks/Ielts Writing.png'
import modules from '../../assets/ebooks/Modules 1,2,3.png'
import activities from '../../assets/ebooks/Training activities.png'

const EBooks = () => {
    const books = [
        {bookTitle: "TKT Glossary", img: glossary, url: "https://drive.google.com/file/d/1xju4KqMwKFvLDJ0UX8LMo3gLENJeDYa7/view?usp=sharing"},
        {bookTitle: "TKT Mdules 1-3", img: handbook, url: "https://drive.google.com/uc?export=download&id=1RLcy9Qa6HqXrBpjGjeXYiwBtltPatLUL"},
        {bookTitle: "Direct To IELTS", img: direct, url: "https://drive.google.com/uc?export=download&id=1_4tdXWz0W1vxiniaL-LIGX5u0UCLLzOU"},
        {bookTitle: "IELTS Advantage", img: writing, url: "https://drive.google.com/uc?export=download&id=1Vq5DM1wv0JxUi8NhdFOdCzbhcPJXJXa3"},
        {bookTitle: "TKT Training Activities", img: activities, url: "https://drive.google.com/uc?export=download&id=1SmbdhS3B76GQeOqp8LVxc2Am-5VW293P"},
        {bookTitle: "TKT Modules 1,2 and 3", img: modules, url: "url"},
    ]
    return (
        <div className="main__ebooks">
            <h1 className="ebooks__title">eBooks</h1>
            <div className="ebooks__container">
                {
                    books.map((book, index) => 
                        <div key={index} className="ebook">
                            <div className="ebook__image">
                                <img src={book.img} alt="." />
                            </div>
                            <div className="text">
                                <span>{book.bookTitle}</span>
                                <a href={book.url}>(Download) </a>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default EBooks
