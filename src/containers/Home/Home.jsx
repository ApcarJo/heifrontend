
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { UPDATE_USER, LOGIN } from '../../redux/types';

const Home = (props) => {

    let history = useHistory();

    // Hooks
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [msgError, setMensajeError] = useState({ eEmail: '', ePassword: '', eValidate: '' });

    // Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return(
        <div className="viewHome">
            <div className="content">Hello, this is Home</div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Home);