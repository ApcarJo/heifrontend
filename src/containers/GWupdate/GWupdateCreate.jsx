
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const GWupdateCreate = (props) => {

    let history = useHistory();


    // Hook
    const [card, setCard] = useState(
        {
            date: '',
            title: '',
            roles: '',
            infoUpdate: '',
            img: ''
        });


    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    const createCard = async () => {
        // e.preventDefault();

        try {
            let token = props.credentials.token;

            let body = {
                date: "2021-09-21",
                title: card.title,
                roles: card.roles,
                infoUpdate: card.infoUpdate,
                img: card.img,
                isActive: card.isActive
            }

            await axios.post('https://heibackend.herokuapp.com/api/creategwupdate', body, { headers: { 'authorization': 'Bearer ' + token } });

            setTimeout(() => {
                history.push(`/gwupdate`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="createGwuView">
            <div className="content">
                <div className="showCard">
                    Title
                    <input className="teamDataBox" name="title" type="text" onChange={updateCard} placeholder="Title" required />
                    Roles
                    <input className="teamDataBox" name="roles" type="text" onChange={updateCard} placeholder="Roles" />
                    Info
                    <textarea className="teamDataBox" name="infoUpdate" type="text" onChange={updateCard} placeholder="Info" required />
                    Img Link
                    <input className="teamDataBox" name="img" type="text" onChange={updateCard} placeholder="Img link" required />
                    <br></br>
                    <button className="sendButton" onClick={() => createCard()}>CREATE</button>
                </div>
            </div>
        </div>

    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(GWupdateCreate);