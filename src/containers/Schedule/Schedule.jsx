
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const GwScheduleCreate = (props) => {

    // WORK IN PROGRESS

    let history = useHistory();


    // Hook
    const [stadiumData, setStadiumData] = useState({})
    const [card, setCard] = useState({});


    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        checkStadiums();
    }, []);

    const checkStadiums = async () => {
        try {
            let token = props.credentials?.token;

            let res = await axios.get(`https://heibackend.herokuapp.com/api/allstadiums`, { headers: { 'authorization': 'Bearer ' + token } });
            setStadiumData(res.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const createCard = async () => {

        try {
            let token = props.credentials.token;

            let body = {
                gw: card.gw,
                Competition: card.Competition,
                date: card.date,
                kickOff: card.kickOff,
                stadium_id: card.stadium_id,
                isMDMinus: card.isMDMinus,
                vlan: card.vlan,
                port: card.port,
            }

            await axios.post('https://heibackend.herokuapp.com/api/creategwschedule', body, { headers: { 'authorization': 'Bearer ' + token } });

            setTimeout(() => {
                history.push(`/`);
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
                    GW
                    <input className="teamDataBox" name="GW" type="text" onChange={updateCard} placeholder="GW" required />
                    Competition
                    <input className="teamDataBox" name="Competition" type="text" onChange={updateCard} placeholder="Competition" />
                    Date
                    <input className="teamDataBox" name="Date" type="text" onChange={updateCard} placeholder="Date" />
                    KickOff
                    <input className="teamDataBox" name="KickOff" type="text" onChange={updateCard} placeholder="KickOff" />
                    Stadium
                    <select className="teamDataBox" name="stadium_id" type="text" onChange={updateCard} required>
                            <option value="Null" selected> "Choose Stadium" </option>
                            {stadiumData.map((val, index) => (
                                <option key={index} value={val.id} >{val.name}</option>
                            ))}
                        </select>
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
}))(GwScheduleCreate);