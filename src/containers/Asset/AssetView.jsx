
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AssetView = (props) => {

    let history = useHistory();

    // HOOKS
    const [assetData, setAssetData] = useState({})
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

    useEffect(() => {
        viewAssetViews();
    }, []);

    const updateSelector = (e) => {
        setSelector({...selector, [e.target.name]: e.target.value })
    }

    const viewAssetViews = async () => {

        try {
            let token = props.credentials?.token;

            let res = await axios.get(`http://127.0.0.1:8000/api/allassets`, { headers: { 'authorization': 'Bearer ' + token } });

            setAssetData(res.data);

        } catch (error) {
            console.log(error);
        }


    }

    const viewAssetByName = async () => {

        try {
            let token = props.credentials?.token;
            let body = {
                name: selector.name,
            }

            let res = await axios.post(`http://127.0.0.1:8000/api/findasset`, body, { headers: { 'authorization': 'Bearer ' + token } });

            setAssetData(res.data);

        } catch (error) {
            console.log(error);
        }


    }


    const deleteAsset = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                Asset_id: id,
            }

            let res = await axios.delete(`http://127.0.0.1:8000/api/deleteasset`, body, { headers: { 'authorization': 'Bearer ' + token } });

            // viewAssets();
        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = async (id) => {

        if (id) {
            try {
                let body = {
                    Asset_id: id
                }
                let token = props.credentials?.token;
                console.log(token, "es el token", id, "la id es ")

                let res = await axios.post(`http://127.0.0.1:8000/api/chooseasset`, body, { headers: { 'authorization': 'Bearer ' + token } });
                setModify(res.data.data);

            } catch (error) {
                console.log(error);
            }
        }


        // Switch view implemented

        (view.modifyView === 'profileCard') ? view.modifyView = 'modifyCard' : view.modifyView = 'profileCard';

        (view.modifyViewP === 'profileCard') ? view.modifyViewP = 'modifyCard' : view.modifyViewP = 'profileCard';

        //console.log(view.modifyView, view.modifyViewP);
        viewAssetViews();

    }

    const modifyCard = async (id) => {
        // e.preventDefault();

        try {
            let token = props.credentials.token;

            let body = {
                Asset_id: id,
                title: card.title,
                roles: card.roles,
                infoUpdate: card.infoUpdate,
                img: card.img,
                isActive: card.isActive
            }


            let res = await axios.put('http://127.0.0.1:8000/api/modifyasset', body, { headers: { 'authorization': 'Bearer ' + token } });
            console.log(res);

            setTimeout(() => {
                history.push(`/assetview`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    if ((props.credentials.user?.isAdmin == true) && (assetData.data)) {
        return (
            <div className="viewAsset">
                <div className="content">
                    <div className={view.modifyViewP}>
                        <div className="newsCard">Last GameWeek2 Updates</div>
                        {assetData.data.map((val, index) => (
                            <div className="gwupdatecards" key={index}>
                                <div className="bbottom row">
                                    <div>Name: {val.name}</div>
                                    <div>Model: {val.model}</div>
                                    <div>Type: {val.type}</div>
                                </div>
                                <div className="gwInfo">

                                    <div>{val.infoUpdate}</div>
                                    <button className="sendButton" onClick={() => deleteAsset(val.id)}>Delete</button>
                                    <button className="sendButton" onClick={() => modifyBack(val.id)}>Modify</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={view.modifyView}>
                        <input className="gwuData" name="title" type="text" onChange={updateCard} defaultValue={modify.name} />

                        <input className="gwuData" name="roles" type="text" onChange={updateCard} defaultValue={modify.model} />

                        <input className="gwuData" name="infoUpdate" type="text" onChange={updateCard} defaultValue={modify.type} />

                        <input className="gwuData" name="img" type="text" onChange={updateCard} defaultValue={modify.img} />
                        <br></br>
                        <div className="buttons">
                            <div><button className="sendButton" onClick={modifyBack}>BACK</button></div>
                            <div><button className="sendButton" onClick={() => modifyCard(modify.id)}>SAVE</button></div>
                        </div>
                    </div>
                </div>


            </div>

        )

    } else if (assetData.data) {

        return (
            <div className="viewGWupdate">
                <div className="content">
                    <div className="newsCard">Last GameWeek 3 Updates</div>
                    {assetData.data.map((val, index) => (
                        <div className="gwupdatecards" key={index}>
                            <div className="row">
                                <div>Name: {val.name}</div>
                                <div>Model: {val.model}</div>
                                <div>Type: {val.type}</div>
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
}))(AssetView);