
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const StadiumCreate = (props) => {

    let history = useHistory();


    // Hook
    const [card, setCard] = useState({});


    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    const createCard = async () => {

        try {
            let token = props.credentials.token;

            let body = {
                name: card.name,
                address: card.address,
                contact: card.contact,
                contactPhone: card.contactPhone,
                isGLT: card.isGLT,
                isRobot: card.isRobot,
                docsLink: card.docsLink,
                tvCompound: card.tvCompound,
                information: card.information
            }

            await axios.post('https://heibackend.herokuapp.com/api/createstadiums', body, { headers: { 'authorization': 'Bearer ' + token } });

            setTimeout(() => {
                history.push(`/stadiums`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    if (props.credentials.user?.isAdmin) {
    return (
        <div className="createGwuView">
            <div className="content">
                <div className="showCard">
                    <input className="gwuData" name="name" type="text" onChange={updateCard} placeholder="name" required />
                    <input className="gwuData" name="address" type="text" onChange={updateCard} placeholder="address" />
                    <input className="gwuData" name="contact" type="text" onChange={updateCard} placeholder="contact" />
                    <input className="gwuData" name="contactPhone" type="text" onChange={updateCard} placeholder="contactPhone" />
                    <input className="gwuData" name="isGLT" type="text" onChange={updateCard} placeholder="isGLT" />
                    <input className="gwuData" name="isRobot" type="text" onChange={updateCard} placeholder="isRobot" />
                    <input className="gwuData" name="docsLink" type="text" onChange={updateCard} placeholder="docs Link" />
                    <input className="gwuData" name="tvCompound" type="text" onChange={updateCard} placeholder="tvCompound" />
                    <input className="gwuData" name="information" type="text" onChange={updateCard} placeholder="information" />
                    <br></br>
                    <button className="sendButton" onClick={() => createCard()}>CREATE</button>
                </div>
            </div>
        </div>

    )
    } else {
        {history.push(`/home`)}
    }
}

export default connect((state) => ({
    credentials: state.credentials
}))(StadiumCreate);