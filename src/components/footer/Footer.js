import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiOutlineMail } from "react-icons/ai";
import { BsInstagram, BsTelegram, BsYoutube } from "react-icons/bs";
import { BiMap, BiPhoneCall } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer_body">
      <footer>
        <div className="footer_container">
          <div className="sec aboutus">
            <h2>About Us</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. 
            </p>
            <ul className="sci">
              <li>
                <a href="/">
                  <FaFacebookF className="FaFacebookF" />
                </a>
              </li>
              <li>
                <a href="/">
                  <AiOutlineTwitter className="AiOutlineTwitter" />
                </a>
              </li>
              <li>
                <a href="/">
                  <BsInstagram className="BsInstagram" />
                </a>
              </li>
              <li>
                <a href="/">
                  <BsTelegram className="BsTelegram" />
                </a>
              </li>
              <li>
                <a href="/">
                  <BsYoutube className="BsYoutube" />
                </a>
              </li>
            </ul>
          </div>
          <div className="sec quickLinks">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Books</a>
              </li>
              <li>
                <a href="/">IELTS</a>
              </li>
              <li>
                <a href="/">Help</a>
              </li>
              <li>
                <a href="/">TKT imthonga kirish</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
          <div className="sec contact">
            <h2>Contact Info</h2>
            <ul className="info">
              <li>
                <span>
                  <BiMap />
                </span>
                <span>
                  123-uy, Boburshox ko'cha
                  <br />
                  Namangan shahar, 160100,
                  <br />
                  Uzbekistan
                </span>
              </li>
              <li>
                <span>
                  <BiPhoneCall />{" "}
                </span>
                <span>
                  <a href="tel:901234567">+998-90-123-45-67</a>
                  <br />
                  <a href="tel:901234567">+998-90-123-45-67</a>
                </span>
              </li>
              <li>
                <span>
                  <AiOutlineMail />{" "}
                </span>
                <p>
                  <a href="mailto:someone@gmail.com">someone@gmail.com</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="copyrightText">
        <p>
          Copyright ©️ {new Date().getFullYear()} LSL Education center. All
          Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;