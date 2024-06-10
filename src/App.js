import React, { useState } from 'react'; 

import './App.css';

import Header from './components/Header.js';
import CategoryContainer from './components/categories/CategoryContainer.js';
import Footer from './components/Footer.js';
import ItemContainer from './components/items/ItemContainer.js';

import Login from './components/users/Login.js';
import Cart from './components/Cart.js';

import cartImg from './img/cart.png';

function App() {

    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);

    const [cartShow, setShowCart] = useState(false);

    const [userInfo, setUserInfo] = useState({});

	const setLogin = (value) => setLoginVisible(value);

    const setRegister = (value) => setRegisterVisible(value);

    const setUser = (value) => setUserInfo(value);

    const toggleShowCart = (show) => {
        const overlay = document.querySelector(".overlay");
        const cart = document.querySelector(".cart-container");
        overlay.style.display = show ? "block" : "none";
        cart.style.display = show ? "flex" : "none";
    }

    if (loginVisible) {
        return (
            <div className="App">
                <Header setLogin={setLogin} loginVisible={loginVisible} setRegister={setRegister} registerVisible={registerVisible} setUser={setUser} userInfo={userInfo}/>
                    <Login setLogin={setLogin} setRegister={setRegister} registerVisible={registerVisible} setUser={setUser}/>
                <Footer />
            </div>
        )
    }

    return (
        <div className="App">
            <div className="overlay">
                <div className="cart-container">
                    <Cart/>
                </div>
            </div>
            <div className="content">
                <Header setLogin={setLogin} loginVisible={loginVisible} setRegister={setRegister} registerVisible={registerVisible} setUser={setUser} userInfo={userInfo}/> 
                    <CategoryContainer />
                    <ItemContainer rowAmount={3} colAmount={3} userInfo={userInfo}/>
                    <div className="cart-img" style={{display: userInfo.authenticated ? "block" : "none"}} onClick={() => { setShowCart(prev => !prev); toggleShowCart(!cartShow)}}><img src={cartImg} alt="Your cart"/></div>
                <Footer />
            </div>
            
        </div>
    );
}

export default App;
