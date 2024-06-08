import React, { useEffect, useState } from 'react';

import '../../css/login.css';

const Login = (props) => {

    const { setLogin, setRegister, registerVisible, setUser } = props;

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");
    
    const changePlaceholder = (target, value) => target.placeholder ? target.placeholder = "" : target.placeholder = value;

    useEffect(() => {
        const enterPress = async (e) => {
            if (e.keyCode === 13) {
                let form = registerVisible ? document.getElementById("register-form") : document.getElementById("login-form");
                let inputs = form.querySelectorAll("input");
                let values = {};
                inputs.forEach(x => values[x.name] = x.value);
                const req = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(values)
                });
                const res = await req.json();
                console.log(res);
                if (req.ok) {
                    setUser({ authenticated: true, display_name: res.display_name });
                    setRegister(false);
                    setLogin(false);
                }
            }
        }

        window.addEventListener("keyup", enterPress);

        return () => {
            window.removeEventListener("keyup", enterPress);
        }
    }, [setLogin, setRegister, registerVisible, setUser]);


    if (registerVisible) {
        document.title = "Register ― Rest-y";
        return (
            <>
                <div className="login-container">
                    <h1>Register your account</h1>
                    <form action='/register' method="POST" name="register_form" id='register-form'>
                        <label htmlFor="email" aria-label="Email" className="form-label">Email</label>
                        <input id="email" type="text" value={email} required name="email" onChange={(e) => { setEmail(e.target.value); }} 
                        onFocus={(e) => {changePlaceholder(e.target, "Ex: example@mail.com");}} onBlur={(e) => {changePlaceholder(e.target, "Ex: example@mail.com");}}
                        placeholder="Ex: example@mail.com"></input>
                        <label htmlFor='username' aria-label="Username" className="form-label">Username</label>
                        <input id="username" type="text" value={username} required name="username" onChange={(e) => { setUsername(e.target.value); }}
                        onFocus={(e) => {changePlaceholder(e.target, "Ex: username1234");}} onBlur={(e) => {changePlaceholder(e.target, "Ex: username1234");}}
                        placeholder="Ex: username1234"></input>
                        <label htmlFor='password' aria-label="Password" className="form-label">Password</label>
                        <input id="password" type="text" value={password} required name="password" onChange={(e) => { setPassword(e.target.value); }} 
                        onFocus={(e) => {changePlaceholder(e.target, "Ex: password1234");}} onBlur={(e) => {changePlaceholder(e.target, "Ex: password1234");}}
                        placeholder="Ex: password1234"></input>
                    </form>
                    <p className="action-prompt">Already created an account?<br></br><span id="action-link" onClick={() => setRegister(false)}>Click to login here</span></p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="login-container">
                <h1 className="login-header">Login to Rest-y</h1>
                <form action='/login' method="POST" name="login_form" id="login-form">
                    <label htmlFor='username' aria-label="Username" className="form-label">Username</label>
                    <input id="username" type="text" value={username} required name="username" onChange={(e) => { setUsername(e.target.value); }}
                    onFocus={(e) => {changePlaceholder(e.target, "Ex: username1234");}} onBlur={(e) => {changePlaceholder(e.target, "Ex: username1234");}}
                    placeholder="Ex: username1234"></input>
                    <label htmlFor='password' aria-label="Password" className="form-label">Password</label>
                    <input id="password" type="text" value={password} required name="password" onChange={(e) => { setPassword(e.target.value); }}
                    onFocus={(e) => {changePlaceholder(e.target, "Ex: password1234");}} onBlur={(e) => {changePlaceholder(e.target, "Ex: password1234");}}
                    placeholder="Ex: password1234"></input>
                </form>
                <p className="action-prompt">New user?<br/><span id="action-link" onClick={() => setRegister(true)}>Create an account here</span></p>
            </div>
        </>
    );
}

export default Login;