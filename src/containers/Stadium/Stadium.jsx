
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Team = (props) => {

    let history = useHistory();

    // HOOKS
    const [stadiumData, setStadiumData] = useState({})
    const [modify, setModify] = useState({})
    const [card, setCard] = useState({});
    const [view, setView] = useState({
        modifyView: 'hideCard',
        modifyViewP: 'showCard'
    });
    const [buttons] = useState({
        show: [],
        bId: '',
    });

    const [selector, setSelector] = useState('');
    const [showHide, setShowHide] = useState(false);


    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    const updateSelector = (e) => {
        setSelector({ ...selector, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        viewStadiums("All");
    }, []);


    const viewStadiums = async (val) => {

        switch (val) {
            case "All":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/allstadiums`, { headers: { 'authorization': 'Bearer ' + token } });
                    setStadiumData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "Active":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/activestadium`, { headers: { 'authorization': 'Bearer ' + token } });

                    setStadiumData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "Name":
                try {
                    let token = props.credentials?.token;

                    let body = {
                        name: selector.name,
                    }

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/findstadium`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setStadiumData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
        }
    }

    const deleteStadium = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                stadium_id: id,
            }

            await axios.delete(`https://heibackend.herokuapp.com/api/deletestadiums`,  { data: body, headers: { 'authorization': 'Bearer ' + token } });

            viewStadiums("All");
        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = async (id) => {

        if (id) {
            try {

                let body = {
                    stadium_id: id
                }
                let token = props.credentials?.token;
                setModify();
                let res = await axios.post(`https://heibackend.herokuapp.com/api/choosestadium`, body, { headers: { 'authorization': 'Bearer ' + token } });

                res.data.data.map((val) => {
                setModify(val);
                });

            } catch (error) {
                console.log(error);
            }
        }
        // Switch view implemented
        const newModifyview = (view.modifyView === 'showCard') ? 'hideCard' : 'showCard';
        const newModifyviewP = (view.modifyViewP === 'showCard') ? 'hideCard' : 'showCard';
        setView({ modifyViewP: newModifyviewP, modifyView: newModifyview });

    }

    const modifyCard = async (id) => {

        try {
            let token = props.credentials.token;

            let body = {
                stadium_id: id,
                name: card.name,
                address: card.address,
                tvCompound: card.tvCompound,
                contact: card.contact,
                isGLT: card.isGLT,
                isRobot: card.isRobot,
                rraCover: card.rraCover,
                information: card.information,
            }

            await axios.put('https://heibackend.herokuapp.com/api/modifystadiums', body, { headers: { 'authorization': 'Bearer ' + token } });

            const newModifyview = (view.modifyView === 'showCard') ? 'hideCard' : 'showCard';
            const newModifyviewP = (view.modifyViewP === 'showCard') ? 'hideCard' : 'showCard';
            setView({ modifyViewP: newModifyviewP, modifyView: newModifyview });

            viewStadiums("All");

        } catch (error) {
            console.log(error);
        }
    }

    const showFunc = (id) => {
        buttons.bId = id;
        buttons.show = [];
        buttons.show.push(<div className="row flexEnd">
            <button className="sendButton" onClick={() => deleteStadium(id)}>Delete</button>
            <button className="sendButton" onClick={() => modifyBack(id)}>Modify</button></div>);
        setShowHide(!showHide)
    }

    if ((props.credentials.user?.isAdmin) && (stadiumData.data)) {
        return (
            <div className="viewStadium">
                <div className="content">
                    <div className={view.modifyViewP}>
                        <div className="newsCard">STADIUMS
                            <div className="row">
                                Filter:
                                <button className="sendButton" name="All" onClick={() => viewStadiums("All")}>All</button>
                                <button className="sendButton" name="Active" onClick={() => viewStadiums("Active")}>Active</button>
                                <input className="gwuData" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewStadiums("Name")}>By Name</button>

                            </div>
                        </div>
                        <div className="row underline spaceEvenly">
                            <div className="dataBox">Name</div>
                            <div className="dataBox">Address</div>
                            <div className="dataBox">Contact</div>
                            <div className="dataBox">GLT</div>
                            <div className="dataBox">Robot</div>
                        </div>
                        {stadiumData.data.map((val, index) => (
                            <div key={index}>
                                <div className="profileInfo center spaceEvenly" onClick={() => showFunc(val.id)}>
                                    <div className="row">
                                        <div className="dataBox">{val.name}</div>
                                        <div className="dataBox">{val.address}</div>
                                        <div className="dataBox">{val.contact}</div>
                                        <div className="dataBox">{(val.isGLT===0) ? "No" : "Yes"}</div>
                                        <div className="dataBox">{(val.isRobot===0) ? "No" : "Yes"}</div>
                                    </div>

                                    {(showHide && (buttons.bId === val.id)) && (
                                        <div className="gwInfo">
                                            <div>{val.information}</div>
                                        </div>
                                    )}
                                </div>
                                {(showHide && (buttons.bId === val.id)) && (
                                    <div className="row">
                                        <div className="flexEnd">{buttons.show}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Swtich visibility */}   
                    {modify && (<div className={view.modifyView}>
                        <input className="gwuData" name="name" type="text" onChange={updateCard} defaultValue={modify.name} />

                        <input className="gwuData" name="address" type="text" onChange={updateCard} defaultValue={modify.address} />
                        <input className="gwuData" name="isGLT" type="text" onChange={updateCard} defaultValue={modify.isGLT} />
                        <input className="gwuData" name="isRobot" type="text" onChange={updateCard} defaultValue={modify.isRobot} />

                        <textarea className="gwuData" name="contact" type="text" onChange={updateCard} defaultValue={modify.contact} />

                        <input className="gwuData" name="information" type="text" onChange={updateCard} defaultValue={modify.information} />
                        <br></br>
                        <div className="row">
                            <button className="sendButton" onClick={() => modifyBack()}>BACK</button>
                            <button className="sendButton" onClick={() => modifyCard(modify.id)}>SAVE</button>

                        </div>
                    </div>
                    )}
                </div>
            </div>
        )

    } else if (stadiumData.data) {

        return (
            <div className="viewTeam">
                <div className="content">
                    <div className="newsCard">List of the clubs</div>
                    {stadiumData.data.map((val, index) => (
                        <div className="teamcards" key={index}>
                            <div className="row">
                                <div>{val.name}</div>
                                <div>{val.roles}</div>
                                <div>{val.id}</div>

                            </div>
                            <div className="gwInfo">

                                <div>{val.infoUpdate}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return "Loading";
    }
}

export default connect((state) => ({
    credentials: state.credentials
}))(Team);