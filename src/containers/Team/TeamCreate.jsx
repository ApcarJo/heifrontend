
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const StadiumCreate = (props) => {

    let history = useHistory();

    // Hook
    const [card, setCard] = useState({});
    const [stadiumData, setStadiumData] = useState({})

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
                name: card.name,
                isFD: card.isFD,
                isUCL: card.isUCL,
                isUEL: card.isUEL,
                isSC: card.isSC,
                isCDR: card.isCDR,
                stadium_id: card.stadium_id,
            }

            await axios.post('https://heibackend.herokuapp.com/api/createteam', body, { headers: { 'authorization': 'Bearer ' + token } });

            setTimeout(() => {
                history.push(`/team`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    if ((props.credentials.user?.isAdmin) && (stadiumData.length > 0)) {
        return (
            <div className="createGwuView">
                <div className="content">
                    <h3>Create new team</h3>
                    <div className="showCard">
                        Name of the Club
                        <input className="teamDataBox" name="name" type="text" onChange={updateCard} placeholder="name" required />
                        First Divison
                        <input className="teamDataBox" name="isFD" type="text" onChange={updateCard} placeholder="isFD" />
                        UEFA Champions League
                        <input className="teamDataBox" name="isUCL" type="text" onChange={updateCard} placeholder="isUCL" />
                        UEFA Europe League
                        <input className="teamDataBox" name="isUEL" type="text" onChange={updateCard} placeholder="isUEL" />
                        Spain Super Coup
                        <input className="teamDataBox" name="isSC" type="text" onChange={updateCard} placeholder="isSC" />
                        Copa del Rey
                        <input className="teamDataBox" name="isCDR" type="text" onChange={updateCard} placeholder="isCDR" />
                        Stadium Name
                        <select className="teamDataBox" name="stadium_id" type="text" onChange={updateCard} required>
                            <option value="Null" selected> "Choose Stadium" </option>
                            {stadiumData.map((val, index) => (
                                <option key={index} value={val.id} >{val.name}</option>
                            ))}
                        </select>
                        <br></br>
                        <button className="sendButton" onClick={() => createCard()}>CREATE</button>
                    </div>
                </div>
            </div>

        )
    } else {
        return "Loaging";
    }
}

export default connect((state) => ({
    credentials: state.credentials
}))(StadiumCreate);