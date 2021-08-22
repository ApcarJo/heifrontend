
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'; 
import Calendar from '../../components/Datepicker/Datepicker';

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

        if (datosUser.password === datosUser.password2) {
        await axios.post('http://127.0.0.1:8000/api/register', body);
        setTimeout(() => {
            history.push(`/login`);
        }, 250);

        } else {
            setErrors({...errors, eValidate: 'Register could not be completed., please try again.'});
            }

        } catch {
             setErrors({...errors, eValidate: 'Register could not be completed., please try again.'});
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
                if (datosUser.codename.length < 3) {
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
    // const errorStyle = (arg) => {

    //     let errorDefault = "name";
    //     let errorWarning = "red";

    //     if (errors.eName !== '') {
    //         return errorWarning;
    //     }

    //     return errorDefault;
    // }
    return (
        <div className="RegisterView">
            <div className="content">
                {/* <pre>{JSON.stringify(datosUser, null, 2)}</pre> */}
                <div className="profileCard">
                    <div className="box1">
                        
                        <form className="form">
                            <input className="input" name="name" type="text" onChange={updateFormulario} onBlur={() => checkError("name")} required />

                            <label className="lbl-nombre">
                                <span className="text-nomb">Name</span>
                            </label>
                        </form>
                        <div className="errorsText">{errors.eName}</div>
                    </div>
                    <div className="box1">
                        
                        <form className="form">
                            <input className="input" name="email" type="text" onChange={updateFormulario} onBlur={() => checkError("email")} required />
                            <label className="lbl-nombre">
                                <span className="text-nomb">Email</span>
                            </label>
                        </form>
                        <div className="errorsText">{errors.eEmail}</div>
                    </div>
                    <div className="box1">
                        
                        <form className="form">
                            <input className="input" name="codename" type="text" onChange={updateFormulario} onBlur={() => checkError("phone")} required />
                            <label className="lbl-nombre">
                                <span className="text-nomb">Codename</span>
                            </label>
                        </form>
                        <div className="errorsText">{errors.eCodename}</div>
                    </div>
                    <div className="box1">
                        
                        <form className="form">
                            <input className="input" name="password" type="password" onChange={updateFormulario} onBlur={() => checkError("password")} required />
                            <label className="lbl-nombre">
                                <span className="text-nomb">Password</span>
                            </label>
                        </form>
                        <div className="errorsText">{errors.ePassword}</div>
                    </div>
                    <div className="box1">
                        
                        <form className="form">
                            <input className="input" name="password2" type="password" onChange={updateFormulario} onBlur={() => checkError("password2")} required />
                            <label className="lbl-nombre">
                                <span className="text-nomb">Repeat Password</span>
                            </label>
                        </form>
                        <div className="errorsText">{errors.ePassword2}</div>
                    </div>

                    {/* <input className="name2" name="iDate" type="date" onChange={updateFormulario} onBlur={()=>checkError("iDate")} placeholder="postal code"></input><br></br>
                <div>{errors.eIDate}</div> */}
                    {/* onBlur={()=>checkError("password")} */}

                    <button className="sendButton" onClick={() => applyRegister()}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    calendar: state.calendar
}))(Register);