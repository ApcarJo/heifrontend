
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
                    Name
                    <input className="teamDataBox" name="name" type="text" onChange={updateCard} placeholder="name" required />
                    Address
                    <input className="teamDataBox" name="address" type="text" onChange={updateCard} placeholder="address" />
                    Contact
                    <input className="teamDataBox" name="contact" type="text" onChange={updateCard} placeholder="contact" />
                    Contact Phone
                    <input className="teamDataBox" name="contactPhone" type="text" onChange={updateCard} placeholder="contactPhone" />
                    GLT status
                    <input className="teamDataBox" name="isGLT" type="text" onChange={updateCard} placeholder="isGLT" />
                    RRA Type
                    <input className="teamDataBox" name="isRobot" type="text" onChange={updateCard} placeholder="isRobot" />
                    Documents Link
                    <input className="teamDataBox" name="docsLink" type="text" onChange={updateCard} placeholder="docs Link" />
                    Picture of TV Compound
                    <input className="teamDataBox" name="tvCompound" type="text" onChange={updateCard} placeholder="tvCompound" />
                    Info
                    <input className="teamDataBox" name="information" type="text" onChange={updateCard} placeholder="information" />
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