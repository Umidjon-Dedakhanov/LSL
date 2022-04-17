import React, { useRef } from 'react';
import './Reviews.css'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import logoone from '../../assets/logos/partnerone.svg';

const Reviews = () => {
    const scrollPreview = useRef();
    const items = [
        {
            image: "https://coachingsquare.in/wp-content/uploads/2021/06/IELTS-Coaching-Coaching-Square.webp",
            title: "After studying here I gained new knowledge and insights. The mentor was very friendly and guided me to get the knowledge I wanted. Thank you!",
            name: "John Doe",
            situation: "Bachelor at Sejong University"
        },
        {
            image: "https://coachingsquare.in/wp-content/uploads/2021/06/IELTS-Coaching-Coaching-Square.webp",
            title: "After studying here I gained new knowledge and insights. The mentor was very friendly and guided me to get the knowledge I wanted. Thank you!",
            name: "John Doe",
            situation: "Bachelor at Sejong University"
        },
        {
            image: "https://coachingsquare.in/wp-content/uploads/2021/06/IELTS-Coaching-Coaching-Square.webp",
            title: "After studying here I gained new knowledge and insights. The mentor was very friendly and guided me to get the knowledge I wanted. Thank you!",
            name: "John Doe",
            situation: "Bachelor at Sejong University"
        }
    ]

    const swipeLeft = () => {
        scrollPreview.current.scrollBy({
            left: -1200,
            behavior: "smooth",
        });
    }

    const swipeRight = () => {
        scrollPreview.current.scrollBy({
            left: 1200,
            behavior: "smooth",
        });
    }
    return (
        <>
        <div className="main__carousel">
            <button className="review__arrows" onClick={swipeLeft}><FiChevronLeft/></button>
                <div className="main__reviews" ref={scrollPreview}>
                    {
                        items?.map((review, index) => 
                            <div key={index} className="review__item">
                                <div className="review__image">
                                    <img src={review?.image} alt="" />
                                </div>
                                <div className="review__content">
                                    <h1>{review?.title}</h1>
                                    <p>{review?.name}</p>
                                    <span>{review?.situation}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            <button className="review__arrows" onClick={swipeRight}><FiChevronRight/></button>
        </div>
        <div className="partners">
            <h1 className="partners__title">Our Partners</h1>
            <div className="partners__collection">
                <img src={logoone} alt="" />
                <img src={logoone} alt="" />
                <img src={logoone} alt="" />
                <img src={logoone} alt="" />
                <img src={logoone} alt="" />
                <img src={logoone} alt="" />
                <img src={logoone} alt="" />
                <img src={logoone} alt="" />
            </div>
        </div>
       </>
    )
}

export default Reviews
