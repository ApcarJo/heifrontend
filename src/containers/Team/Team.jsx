
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Team = (props) => {

    let history = useHistory();

    // HOOKS
    const [teamData, setTeamData] = useState({})
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
        viewTeams("All");
    }, []);

    const goCreateTeam = () => {
        history.push(`/teamCreate`)
    }

    const viewTeams = async (val) => {

        switch (val) {
            case "All":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/allteams`, { headers: { 'authorization': 'Bearer ' + token } });
                    setTeamData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "Active":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/activeteam`, { headers: { 'authorization': 'Bearer ' + token } });

                    setTeamData(res.data);

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

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/findteam`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setTeamData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
        }
    }

    const deleteTeam = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                team_id: id,
            }

            await axios.delete(`https://heibackend.herokuapp.com/api/deleteteam`, { data: body, headers: { 'authorization': 'Bearer ' + token } });

            viewTeams("All");
        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = async (id) => {

        if (id) {
            try {

                let body = {
                    team_id: id,
                }

                let token = props.credentials?.token;

                setModify();
                let res = await axios.post(`https://heibackend.herokuapp.com/api/chooseteam`, body, { headers: { 'authorization': 'Bearer ' + token } });

                setModify(res.data.data);


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
                team_id: id,
                isFD: card.isFD,
                isUCL: card.isUCL,
                isUEL: card.isUEL,
                isSC: card.isSC,
                isCDR: card.isCDR,
            }

            await axios.put('https://heibackend.herokuapp.com/api/modifyteam', body, { headers: { 'authorization': 'Bearer ' + token } });

            const newModifyview = (view.modifyView === 'showCard') ? 'hideCard' : 'showCard';
            const newModifyviewP = (view.modifyViewP === 'showCard') ? 'hideCard' : 'showCard';
            setView({ modifyViewP: newModifyviewP, modifyView: newModifyview });

            viewTeams("All");

        } catch (error) {
            console.log(error);
        }
    }

    const showFunc = (id) => {
        buttons.bId = id;
        buttons.show = [];
        buttons.show.push(<div className="row flexEnd">
            <button className="sendButton" onClick={() => deleteTeam(id)}>Delete</button>
            <button className="sendButton" onClick={() => modifyBack(id)}>Modify</button></div>);
        setShowHide(!showHide)
    }

    if ((props.credentials.user?.isAdmin) && (teamData.data)) {
        return (
            <div className="viewTeam">
                <div className="content">
                    <h3>Teams</h3>
                    <div className={view.modifyViewP}>
                        <div className="newsCard">
                            <div className="filter row">
                                Filter:
                                <button className="sendButton" name="All" onClick={() => viewTeams("All")}>All</button>
                                <button className="sendButton" name="Active" onClick={() => viewTeams("Active")}>Active</button>
                                <input className="searchBox" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewTeams("Name")}>BY NAME</button>
                                <button className="sendButton" onClick={() => goCreateTeam()}>ADD</button>
                            </div>
                        </div>
                        <div className="row spaceEvenly">
                            <div className="dataBox">ID</div>
                            <div className="dataBox">Name</div>
                            <div className="dataBox">Stadium ID</div>
                        </div>
                        {teamData.data.map((val, index) => (
                            <div key={index}>
                                <div className="profileInfo center spaceEvenly" onClick={() => showFunc(val.id)}>
                                    <div className="row underline">
                                        <div className="dataBox">{val.id}</div>
                                        <div className="dataBox">{val.name}</div>
                                        <div className="dataBox">{val.stadium_id}</div>
                                    </div>
                                    <div className="center">{(showHide && (buttons.bId === val.id)) && (

                                        <div className="row">
                                            <div className="center">
                                                <div className="dataBox">isFD</div>
                                                <div className="dataBox">isUCL</div>
                                                <div className="dataBox">isUEL</div>
                                                <div className="dataBox">isSC</div>
                                                <div className="dataBox">isCDR</div>
                                            </div>
                                            <div className="center">
                                                <div className="dataBox">{(val.isFD === 0) ? "No" : "Yes"}</div>
                                                <div className="dataBox">{(val.isUCL === 0) ? "No" : "Yes"}</div>
                                                <div className="dataBox">{(val.isUEL === 0) ? "No" : "Yes"}</div>
                                                <div className="dataBox">{(val.isSC === 0) ? "No" : "Yes"}</div>
                                                <div className="dataBox">{(val.isCDR === 0) ? "No" : "Yes"}</div>
                                            </div>
                                        </div>
                                    )}</div>
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
                        <input className="teamDataBox" name="name" type="text" onChange={updateCard} defaultValue={modify.name} />
                        <input className="teamDataBox" name="isFD" type="text" onChange={updateCard} defaultValue={modify.isFD} />
                        <input className="teamDataBox" name="isUCL" type="text" onChange={updateCard} defaultValue={modify.isUCL} />
                        <input className="teamDataBox" name="isUEL" type="text" onChange={updateCard} defaultValue={modify.isUEL} />
                        <textarea className="teamDataBox" name="isSC" type="text" onChange={updateCard} defaultValue={modify.contact} />
                        <input className="teamDataBox" name="isCDR" type="text" onChange={updateCard} defaultValue={modify.information} />

                        <br></br>
                        <div className="row">
                            <button className="sendButton" onClick={() => modifyBack()}>BACK</button>
                            <button className="sendButton" onClick={() => modifyCard(modify.id)}>SAVE</button>

                        </div>
                    </div>
                    )}
                </div>
            </div >
        )

    } else if (teamData.data) {

        return (
            <div className="viewTeam">
                <div className="content">
                    <div className="newsCard">List of the clubs</div>
                    {teamData.data.map((val, index) => (
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