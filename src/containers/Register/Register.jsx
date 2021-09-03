
import React, { useState} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Register = (props) => {

    let history = useHistory();


    // Hook
    const [datosUser, setDatosUser] = useState(
        {
            name: '',
            email: '',
            codename: '',
            password: '',
            password2: ''
        });

    const [errors, setErrors] = useState({
        eName: '',
        eEmail: '',
        eCodename: '',
        ePassword: '',
        ePassword2: ''

    });

    // Handler
    const updateFormulario = (e) => {
        setDatosUser({ ...datosUser, [e.target.name]: e.target.value })
    }

    const applyRegister = async () => {
        // e.preventDefault();

        try {

            let body = {
                name: datosUser.name,
                email: datosUser.email,
                codename: datosUser.codename,
                password: datosUser.password,
            }

            console.log("esto es body", body);
            console.log("esto es datosUser", datosUser);


            if (datosUser.password === datosUser.password2) {
                await axios.post('https://heibackend.herokuapp.com/api/register', body);
                setTimeout(() => {
                    history.push(`/login`);
                }, 250);

            } else {
                setErrors({ ...errors, eValidate: 'Register could not be completed., please try again.' });
            }

        } catch {
            setErrors({ ...errors, eValidate: 'Register could not be completed., please try again.' });
        }

    }

    const checkError = (arg) => {
        switch (arg) {
            case 'name':
                if ((datosUser.name.length < 2) || (! /^[a-z ,.'-]+$/i.test(datosUser.name)) || (datosUser.name.length > 20)) {
                    setErrors({ ...errors, eName: 'Introduce un nombre válido' });
                } else {
                    setErrors({ ...errors, eName: '' });
                }
                break;

            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(datosUser.email)) {
                    setErrors({ ...errors, eEmail: 'Introduce un email válido 2' });
                } else {
                    setErrors({ ...errors, eEmail: '' });
                }

                break;

            case 'password':
                if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(datosUser.password)) {
                    setErrors({ ...errors, ePassword: '>8C, 1uppercase, 1 lowercase & 1 number.' });
                } else {
                    setErrors({ ...errors, ePassword: '' });
                }
                break;

            case 'codename':
                if (datosUser.codename.length < 2) {
                    setErrors({ ...errors, ePhone: 'Wrong codename' });
                } else {
                    setErrors({ ...errors, ePhone: '' });
                }
                break;

            case 'password2':
                if (datosUser.password !== datosUser.password2) {
                    setErrors({ ...errors, ePassword2: 'Password should be the same' });
                } else {
                    setErrors({ ...errors, ePassword2: '' });
                }
                break;

            default:
                break;
        }
    }

    return (
        <div className="viewRegister">
            <div className="content">
                <h3>Register</h3>
                {/* <pre>{JSON.stringify(datosUser, null, 2)}</pre> */}
                <div className="registerCard">
                    <div className="registerInput">
                        <input className="input" name="name" type="text" onChange={updateFormulario} onBlur={() => checkError("name")} placeholder="name" required />
                        <div className="errorsText">{errors.eName}</div>
                    </div>
                    <div className="registerInput">
                        <input className="input" name="email" type="text" onChange={updateFormulario} onBlur={() => checkError("email")} placeholder="email" required />
                        <div className="errorsText">{errors.eEmail}</div>
                    </div>

                    <div className="registerInput">
                        <input className="input" name="codename" type="text" onChange={updateFormulario} onBlur={() => checkError("phone")} placeholder="codename" required />

                        <div className="errorsText">{errors.eCodename}</div>
                    </div>
                    <div className="registerInput">
                        <input className="input" name="password" type="password" onChange={updateFormulario} onBlur={() => checkError("password")} placeholder="password"required />
                        <div className="errorsText">{errors.ePassword}
                        </div>
                    </div>
                    <div className="registerInput">
                        <input className="input" name="password2" type="password" onChange={updateFormulario} onBlur={() => checkError("password2")} placeholder="repeat password"required />

                        <div className="errorsText">{errors.ePassword2}</div>
                    </div>
                    <button className="sendButton" onClick={() => applyRegister()}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    calendar: state.calendar
}))(Register);