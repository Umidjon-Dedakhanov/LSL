import React from 'react';
import './Reviews.css'
import { Swiper, SwiperSlide } from "swiper/react";
import logoone from '../../assets/logos/logo.jpg';
import logotwo from '../../assets/logos/logo2.jpg';
import logothree from '../../assets/logos/binary.svg';
import logofour from '../../assets/logos/daily.jpg';
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./styles.css";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/core";
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);

const Reviews = () => {
    const items = [
        {
            image: "https://coachingsquare.in/wp-content/uploads/2021/06/IELTS-Coaching-Coaching-Square.webp",
            title: "After studying here I gained new knowledge and insights. The mentor was very friendly and guided me to get the knowledge I wanted. Thank you!",
            name: "John Doe",
            situation: "Bachelor at Sejong University",
            comment: '"I have studied different courses so far but I could not find a center like LSL. This is a center that helped me to feel sense of international certificates in a short period of time through commitment and passion. Thanks for all supportive teachers!"'
        },
        {
            image: "https://coachingsquare.in/wp-content/uploads/2021/06/IELTS-Coaching-Coaching-Square.webp",
            title: "After studying here I gained new knowledge and insights. The mentor was very friendly and guided me to get the knowledge I wanted. Thank you!",
            name: "John Doe",
            situation: "Bachelor at Sejong University",
            comment: '"Assalomu alaykum hurmatli ustoz Jaloliddin! Men Farg\'onadan Odina Gayupova sizni onlayn guruhlaringizda o\'qigandim. 7-mart kuni topshirgan Module 1 imtihonidan Band 3 oldim. Bugun natija chiqdi. Sizga katta rahmat bergan bilimlaringiz uchun! Ilohim bundanda bilimingiz ziyoda bo\'lsin!Ko\'plab talabgorlarni xursand qilishda davom eting! Ishlaringizga omad charchamang!"'
        },
        {
            image: "https://coachingsquare.in/wp-content/uploads/2021/06/IELTS-Coaching-Coaching-Square.webp",
            title: "After studying here I gained new knowledge and insights. The mentor was very friendly and guided me to get the knowledge I wanted. Thank you!",
            name: "John Doe",
            situation: "Bachelor at Sejong University",
            comment: '"Assalomu alaykum! Jaloliddin bergan bilimlarizga rozi buling. Mehnatlariz natijasi o\'laroq 2-moduledanam 3-moduledanam utibman. Attestatsiyadan ham 87ball bilan oliy toifaga utdim. Sizga kattakon rahmat, kelgusidagi faoliyatizda ulkan zafarlar tilayman. Doimo sog\' va salomat bo\'ling🤲🤲🤲"'
        }
    ]
    return (
        <>
       <div className="video_wrapper">
      <div className="container-w">
        <Swiper
          navigation={true}
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          className="mySwiper"
        >
          {
            items?.map((video, index, array) => 
              <SwiperSlide key={index} className="image_slider_change">
                <div className="review">
                  <span>{video.comment}</span>
                </div>
            </SwiperSlide>
              )
          }
        </Swiper>
      </div>
    </div>
        <div className="partners">
            <h1 className="partners__title">Our Partners</h1>
            <div className="partners__collection">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/British_Council_logo.svg/1200px-British_Council_logo.svg.png" alt="" />
                <img src="https://examseekers.files.wordpress.com/2018/05/tkt001b.png" alt="" />
                <img src="https://radiantknowledgeservices.com/assets/images/camasses1.png" alt="" />
                <img src={logoone} alt="" />
                <img src={logotwo} alt="" />
                <img src={logofour} alt="" />
                <img src={logothree} alt="" />
            </div>
        </div>
       </>
    )
}

export default Reviews
