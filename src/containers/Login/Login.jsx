
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

                if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email)) {
                    setMensajeError({ ...msgError, eEmail: "Please, enter your email" });
                } else {
                    setMensajeError({ ...msgError, eEmail: "" });
                }
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

        try {
            // A continuamos, generamos el body para enviar los datos por axios
            let body = {
                email: credentials.email,
                password: credentials.password
            }

            console.log(credentials);
            // Envío por axios
            let res = await axios.post(`heibackend.herokuapp.com/api/login`, body);
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
            <div className="content">
                <h3>Login</h3>
                {/* <pre>{JSON.stringify(credentials, null,2)}</pre> */}
                <div className="loginCard">

                    <div className="loginInput">
                        <input className="input" name="email" type="text" onChange={updateCredentials} onBlur={() => checkError("email")} placeholder="user" required />
                    </div>
                    <div className="errorsText">{msgError.eEmail}</div>
                    <div className="loginInput">
                        <input className="input" name="password" type="password" onChange={updateCredentials} onBlur={() => checkError("password")} placeholder="password" required />
                    </div>
                    <div className="errorsText">{msgError.ePassword}</div>
                    <div className="sendButton" onClick={() => logeame()}>Login</div>
                    <div>{msgError.eValidate}</div>
                </div>
            </div>
        </div>
    )
}

export default connect()(Login);