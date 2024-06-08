import React, { useState } from 'react'; 

import './App.css';

import Header from './components/Header.js';
import CategoryContainer from './components/categories/CategoryContainer.js';
import Footer from './components/Footer.js';
import ItemContainer from './components/items/ItemContainer.js';

import Login from './components/users/Login.js';

function App() {

    const [loginVisible, setLoginVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);

    const [userInfo, setUserInfo] = useState({});

	const setLogin = (value) => setLoginVisible(value);

    const setRegister = (value) => setRegisterVisible(value);

    const setUser = (value) => setUserInfo(value);

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
        <Header setLogin={setLogin} loginVisible={loginVisible} setRegister={setRegister} registerVisible={registerVisible} setUser={setUser} userInfo={userInfo}/> 
            <CategoryContainer />
            <ItemContainer rowAmount={3} colAmount={3}/>
        <Footer />
        </div>
    );
}

export default App;
