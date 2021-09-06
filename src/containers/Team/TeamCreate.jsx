
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

    console.log(stadiumData)
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
                stadium_id: "2",
            }

            await axios.post('https://heibackend.herokuapp.com/api/createteam', body, { headers: { 'authorization': 'Bearer ' + token } });

            setTimeout(() => {
                history.push(`/team`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    if ((props.credentials.user?.isAdmin)&&(stadiumData.length>1)) {
    return (
        <div className="createGwuView">
            <div className="content">
                <div className="showCard">
                    <input className="gwuData" name="name" type="text" onChange={updateCard} placeholder="name" required />
                    <input className="gwuData" name="isFD" type="text" onChange={updateCard} placeholder="isFD" />
                    <input className="gwuData" name="isUCL" type="text" onChange={updateCard} placeholder="isUCL" />
                    <input className="gwuData" name="isUEL" type="text" onChange={updateCard} placeholder="isUEL" />
                    <input className="gwuData" name="isSC" type="text" onChange={updateCard} placeholder="isSC" />
                    <input className="gwuData" name="isCDR" type="text" onChange={updateCard} placeholder="isCDR" />
                    <select className="gwuData" name="stadium_id" type="text" onChange={updateCard} required>{                   stadiumData.map((val, index)=> (
                        <option key={index} value={val.id} placeholder="Choose Stadium">{val.name}</option>
                    ))} </select>
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