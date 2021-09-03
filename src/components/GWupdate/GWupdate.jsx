
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const GWupdate = (props) => {

    let history = useHistory();

    // HOOKS
    const [gwUpdateData, setGwUpdateData] = useState({})
    const [deleteCard, setDeleteCard] = useState({})
    const [modify, setModify] = useState({})
    const [card, setCard] = useState(
        {
            date: '',
            title: '',
            roles: '',
            infoUpdate: '',
            img: ''
        });

    const [view, setView] = useState({
        modifyView: 'modifyCard',
        modifyViewP: 'profileCard'
    })

    const [selector, setSelector] = useState('');


    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    const updateSelector = (e) => {
        setSelector({ ...selector, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        viewGWUpdates("all");
    }, []);


    const viewGWUpdates = async (val) => {

        switch (val) {
            case "all":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/allgwupdates`, { headers: { 'authorization': 'Bearer ' + token } });

                    setGwUpdateData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "active":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/activegwupdate`, { headers: { 'authorization': 'Bearer ' + token } });

                    setGwUpdateData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "title":
                try {
                    let token = props.credentials?.token;

                    let body = {
                        title: selector.title,
                    }

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/findgwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setGwUpdateData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "archive":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/showarchived`, { headers: { 'authorization': 'Bearer ' + token } });

                    setGwUpdateData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
        }
    }

    const deleteGWU = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                gwupdate_id: id,
            }

            let res = await axios.delete(`https://heibackend.herokuapp.com/api/deletegwupdate`,  {data: body, headers: { 'authorization': 'Bearer ' + token } });

            viewGWUpdates("all");
        } catch (error) {
            console.log(error);
        }
    }

    const archiveGWU = async (id) => {

        try {
            let token = props.credentials?.token;

            let body = {
                id: id
            }

            let res = await axios.put(`https://heibackend.herokuapp.com/api/archivegwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });

            viewGWUpdates();

        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = async (id) => {

        if (id) {
            try {

                let body = {
                    gwupdate_id: id
                }
                let token = props.credentials?.token;
                console.log(props.credentials, "esto es credentials de modify");

                let res = await axios.post(`https://heibackend.herokuapp.com/api/choosegwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });
                setModify(res.data.data);

            } catch (error) {
                console.log(error);
            }
        }


        // Switch view implemented

        (view.modifyView === 'profileCard') ? view.modifyView = 'modifyCard' : view.modifyView = 'profileCard';

        (view.modifyViewP === 'profileCard') ? view.modifyViewP = 'modifyCard' : view.modifyViewP = 'profileCard';

        viewGWUpdates();

    }

    const modifyCard = async (id) => {

        try {
            let token = props.credentials.token;

            let body = {
                Gwupdate_id: id,
                title: card.title,
                roles: card.roles,
                infoUpdate: card.infoUpdate,
                img: card.img,
                isActive: card.isActive
            }

            let res = await axios.put('https://heibackend.herokuapp.com/api/modifygwupdate', body, { headers: { 'authorization': 'Bearer ' + token } });

            viewGWUpdates();

            setTimeout(() => {
                history.push(`/gwupdate`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    if ((props.credentials.user?.isAdmin == true) && (gwUpdateData.data)) {
        return (
            <div className="viewGWupdate">
                <div className="content">
                    <div className={view.modifyViewP}>
                        <div className="newsCard">Last GameWeek Updates
                            <div className="row">
                                Filter:
                                <button className="sendButton" name="isActive" onClick={()=>viewGWUpdates("active")}>Active GWU</button>
                                <button className="sendButton" onClick={()=>viewGWUpdates("archive")}>Archive GWU</button>

                                <input className="gwuData" name="title" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={()=>viewGWUpdates("title")}>GWU's Title</button>

                            </div>
                        </div>
                        {gwUpdateData.data.map((val, index) => (
                            <div className="gwupdatecards" key={index}>
                                <div className="bbottom row">
                                    <div>{val.title}</div>
                                    <div>{val.roles}</div>
                                    <div>{val.id}</div>
                                </div>
                                <div className="gwInfo">
                                    <div className="row">
                                        <div>{val.infoUpdate}</div>
                                        <button className="sendButton" onClick={() => deleteGWU(val.id)}>Delete</button>
                                        <button className="sendButton" onClick={() => archiveGWU(val.id)}>Archive</button>
                                        <button className="sendButton" onClick={() => modifyBack(val.id)}>Modify</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={view.modifyView}>
                        <input className="gwuData" name="title" type="text" onChange={updateCard} defaultValue={modify.title} />

                        <input className="gwuData" name="roles" type="text" onChange={updateCard} defaultValue={modify.roles} />

                        <textarea className="gwuData" name="infoUpdate" type="text" onChange={updateCard} defaultValue={modify.infoUpdate} />

                        <input className="gwuData" name="img" type="text" onChange={updateCard} defaultValue={modify.img} />
                        <br></br>
                        <div className="buttons">
                            <button className="sendButton" onClick={()=>modifyBack}>BACK</button>
                            <button className="sendButton" onClick={() => modifyCard(modify.id)}>SAVE</button>

                        </div>
                    </div>
                </div>


            </div>

        )

    } else if (gwUpdateData.data) {

        return (
            <div className="viewGWupdate">
                <div className="content">
                    <div className="newsCard">Last GameWeek 3 Updates</div>
                    {gwUpdateData.data.map((val, index) => (
                        <div className="gwupdatecards" key={index}>
                            <div className="row">
                                <div>{val.title}</div>
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
}))(GWupdate);