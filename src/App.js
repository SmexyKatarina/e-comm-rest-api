import React, { useState } from 'react'; 

import './App.css';

import Header from './components/Header.js';
import CategoryContainer from './components/categories/CategoryContainer.js';
import Footer from './components/Footer.js';
import ItemContainer from './components/items/ItemContainer.js';

import Login from './components/Login.js';

function App() {

    const [loginVisible, setLoginVisible] = useState(false);

	const setLogin = (value) => setLoginVisible(value);

    if (loginVisible) {
        return (
            <div className="App">
                <Header setLogin={setLogin} loginVisible={loginVisible}/>
                    <Login />
                <Footer />
            </div>
        )
    }

    return (
        <div className="App">
        <Header setLogin={setLogin} loginVisible={loginVisible}/> 
            <CategoryContainer />
            <ItemContainer rowAmount={3} colAmount={3}/>
        <Footer />
        </div>
    );
}

export default App;
