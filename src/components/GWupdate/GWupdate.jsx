
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


    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        viewGWUpdates();
    }, []);

    const viewGWUpdates = async () => {

        try {
            let token = props.credentials?.token;

            let res = await axios.get(`http://127.0.0.1:8000/api/allgwupdates`, { headers: { 'authorization': 'Bearer ' + token } });

            setGwUpdateData(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteGWU = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                id: id,
            }
 
            let res = await axios.delete(`http://127.0.0.1:8000/api/deletegwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });

            // viewGWUpdates();
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

                let res = await axios.post(`http://127.0.0.1:8000/api/choosegwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });
                setModify(res.data.data);

            } catch (error) {
                console.log(error);
            }
        } 


            // Switch view implemented

            (view.modifyView === 'profileCard') ? view.modifyView = 'modifyCard' : view.modifyView = 'profileCard';

            (view.modifyViewP === 'profileCard') ? view.modifyViewP = 'modifyCard' : view.modifyViewP = 'profileCard';

            //console.log(view.modifyView, view.modifyViewP);
            viewGWUpdates();
        
    }

    const modifyCard = async (id) => {
        // e.preventDefault();

        try {
            let token = props.credentials.token;
            console.log("esto es card", card)
            console.log("esto es id", id)

            let body = {
                Gwupdate_id: id,
                title: card.title,
                roles: card.roles,
                infoUpdate: card.infoUpdate,
                img: card.img,
                isActive: card.isActive
            }


            let res = await axios.put('http://127.0.0.1:8000/api/modifygwupdate', body, { headers: { 'authorization': 'Bearer ' + token } });
            console.log(res);

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
                        <div className="newsCard">Last GameWeek2 Updates</div>
                        {gwUpdateData.data.map((val, index) => (
                            <div className="gwupdatecards" key={index}>
                                <div className="bbottom row">
                                    <div>{val.title}</div>
                                    <div>{val.roles}</div>
                                    <div>{val.id}</div>
                                </div>
                                <div className="gwInfo">

                                    <div>{val.infoUpdate}</div>
                                    <button className="sendButton" onClick={() => deleteGWU(val.id)}>Delete</button>
                                    <button className="sendButton" onClick={() => modifyBack(val.id)}>Modify</button>
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
                            <button className="sendButton" onClick={modifyBack}>BACK</button>
                            <button className="sendButton" onClick={()=>modifyCard(modify.id)}>SAVE</button>

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