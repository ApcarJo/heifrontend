
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

const Login = (props) => {

    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [msgError, setMensajeError] = useState({ eEmail: '', ePassword: '', eValidate: '' });

    // Handler
    const updateCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {

    }, []);


    useEffect(() => {

    });

    const checkError = async (arg) => {

        switch (arg) {

            case 'email':

                if (credentials.email.length < 1) {
                    setMensajeError({ ...msgError, eEmail: "Please, enter your email" });
                } else {
                    setMensajeError({ ...msgError, eEmail: "" });
                }

                // let body = {
                //     email: credentials.email
                // }

                // let role = await axios.post('http://localhost:3006/clients/email', body);

                // if (role.data !== null){
                //     setStatusRole({...statusRole, roleStatus: 'client'});
                // }

                // if (role.data == null){
                //     role = await axios.post('http://localhost:3006/dentists/email', body);
                //     if (role.data !== null) { 
                //         setStatusRole({...statusRole, roleStatus: 'dentist'});
                //     } 
                // }
                break;

            case 'password':

                if (credentials.password.length < 1) {
                    setMensajeError({ ...msgError, ePassword: "Please, enter your password" });
                } else {
                    setMensajeError({ ...msgError, ePassword: "" });
                }
                break;

            default:
                break;
        }
    }

    const logeame = async () => {
        // if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.state.email) ) {
        try {
            // A continuamos, generamos el body para enviar los datos por axios
            let body = {
                email: credentials.email,
                password: credentials.password
            }
            // Envío por axios
            let res = await axios.post(`http://127.0.0.1:8000/api/login`, body);
            // let token = res.data.token;
            //
            props.dispatch({ type: LOGIN, payload: res.data });

            // redirección
            setTimeout(() => {
                history.push(`/profile`);
            }, 250);

        } catch {
            setMensajeError({ ...msgError, eValidate: 'Wrong email or password' });
        }
    }

    return (
        <div className="viewLogin">
            <h3>Login</h3>
            {/* <pre>{JSON.stringify(credentials, null,2)}</pre> */}
            <div className="loginCard">

                <div className="errorsText">{msgError.eEmail}</div>

                <input className="input" name="email" type="text" onChange={updateCredentials} onBlur={() => checkError("email")} required />

                <div className="errorsText">{msgError.ePassword}</div>

                <input className="input" name="password" type="password" onChange={updateCredentials} onBlur={() => checkError("password")} required />

                <div className="sendButton" onClick={() => logeame()}>Login</div>
                <div>{msgError.eValidate}</div>
            </div>

        </div>
    )
}

export default connect()(Login);