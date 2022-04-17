import React, { useEffect, useState } from 'react';
import './Home.css';
import Banner from '../../components/banner/Banner'
import Header from '../../components/header/Header'
import Trending from '../../components/trending/Trending';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import BasicAnalytics from '../../components/basic-analytics/BasicAnalytics';
import Reviews from '../../components/review-carousel/Reviews';
import EBooks from '../../components/e-books/EBooks';
import Footer from '../../components/footer/Footer';
import { FiX } from 'react-icons/fi';
import registration_services from '../../api/registration-services';

const Home = () => {
    const [popup, setPopup] = useState(true);
    const [registeredUser, setRegistredUser] = useState(null);
    const [success, setSuccess] = useState('');
    const [registration, setRegistration] = useState({firstname: "", lastname: "", password: "", phone: ""});
    const [error, setError] = useState('');
    useEffect(() => {
        if(popup){
            document.body.style.overflow = "hidden"
        }
        else{
            document.body.style.overflow = "auto"
        }
    }, [popup])
    
    useEffect(() => {
        const validateForm = () => {
            if(!registration.firstname && !registration.lastname && !registration.password){
                setError("Please provide all information!");
            }
            else if(registration.firstname.trim().length < 4 || registration.lastname.trim().length < 4 ){
                setError("Lastname or Firstname is too short!")
            }
            else if(registration.password.trim().length === 0){
                setError("Please create the password!")
            }
            else if(registration.password.trim().length < 8){
                setError("Please lengthen your password to 8 characters!")
            }
            else{
                setError(false)
            }
        }
        validateForm()
    }, [registration])


    const handleUserRegistration = async (e) => {
        e.preventDefault();
        if(!error){
           await registration_services.post("/", registration)
            .then(user => {
                setRegistredUser(user.data)
                setSuccess(user.data.message)
            })
            .catch((err) => {
                setError(err?.response.data.message)
                console.log(err.response)
            })
        }
    }
    console.log(registeredUser);
    return (
        <div className="main">
            <Header setPopup={setPopup}/>
            <Banner/>
            <div className="main__container">
                <Switch>
                    <Route to="/:tabid">
                        <Trending/>
                    </Route>
                </Switch>
                <BasicAnalytics/>
                <Reviews/>
                <EBooks/>
                <Footer/>
            </div>
            {
                popup && 
                <>
                    <div className="fade"></div>
                    <div className="popup">
                        <div className="controller" onClick={() => setPopup(false)}> <FiX /></div>
                        <h1 className="popup__title">Register for TKT Online Test</h1>
                      <form onSubmit={e => handleUserRegistration(e)}>
                          {
                              error && <p className="error__handler">{error}</p>
                          }
                          {
                              success && <p className="status__handler">{success}</p>
                          }
                        <input  required value={registration.firstname} onChange={e => setRegistration({...registration, firstname: e.target.value})} className="popup_inputs" type="text" placeholder="Your Firstname" />
                        <input  required value={registration.lastname} onChange={e => setRegistration({...registration, lastname: e.target.value})} className="popup_inputs" type="text" placeholder="Your Lastname" />
                        <input  required value={registration.password} onChange={e => setRegistration({...registration, password: e.target.value})} className="popup_inputs" type="password" placeholder="Create your password"/>
                        <input  required value={registration.phone} onChange={e => setRegistration({...registration, phone: e.target.value})} className="popup_inputs" type="text" placeholder="+998911234567"/>
                        <button type="submit" className="popup_btn">Register</button>
                      </form>
                    </div>
                </>
            }
        </div>
    )
}

export default Home
