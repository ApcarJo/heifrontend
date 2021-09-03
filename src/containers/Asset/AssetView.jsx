
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
    const [card, setCard] = useState('');

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
        viewAssetViews("all");
    }, []);

    const updateSelector = (e) => {
        setSelector({ ...selector, [e.target.name]: e.target.value })
    }

    const viewAssetViews = async (val) => {

        switch (val) {

            case "all":

                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/allassets`, { headers: { 'authorization': 'Bearer ' + token } });

                    setAssetData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "name":
                try {
                    let token = props.credentials?.token;

                    let body = {
                        name: selector.name,
                    }

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/findasset`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setAssetData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "model":
                try {
                    let token = props.credentials?.token;

                    let body = {
                        model: selector.model,
                    }

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/bymodel`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setAssetData(res.data);

                } catch (error) {
                    console.log(error);
                }

            default:
        }


    }

    const deleteAsset = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                asset_id: id,
            }

            let res = await axios.delete(`https://heibackend.herokuapp.com/api/deleteasset`, {data: body, headers: { 'authorization': 'Bearer ' + token } });

            viewAssetViews("all");
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

                let res = await axios.post(`https://heibackend.herokuapp.com/api/chooseasset`, body, { headers: { 'authorization': 'Bearer ' + token } });
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
                name: card.name,
                model: card.model,
                type: card.type,
                year: card.year,
                serialNumber: card.sn,
                warrantyExpiracyDate: card.warranty,
                crossCheckCode: card.ccc,
                quantity: card.quantity,
                isActive: card.isActive
            }


            let res = await axios.put('https://heibackend.herokuapp.com/api/modifyasset', body, { headers: { 'authorization': 'Bearer ' + token } });
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
                    <div className="subHeader">

                    </div>
                    <div className={view.modifyViewP}>
                        <div className="newsCard">Asset View
                            <div className="row">
                                Filter:
                                <input className="gwuData" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewAssetViews("name")}>By Name</button>

                                <input className="gwuData" name="model" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewAssetViews("model")}>By Model</button>
                            </div>
                        </div>

                        {assetData.data.map((val, index) => (
                            <div className="gwupdatecards" key={index}>
                                <div className="bbottom row">
                                    <div>Name: {val.name}</div>
                                    <div>Model: {val.model}</div>
                                    <div>Type: {val.type}</div>
                                </div>
                                <div className="gwInfo">

                                    <div>{val.infoUpdate}</div>
                                    <div className="row">
                                        <button className="sendButton" onClick={() => deleteAsset(val.id)}>Delete</button>
                                        <button className="sendButton" onClick={() => modifyBack(val.id)}>Modify</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={view.modifyView}>
                        <input className="gwuData" name="name" type="text" onChange={updateCard} placeholder="Name" defaultValue={modify.name} />

                        <input className="gwuData" name="model" type="text" onChange={updateCard} placeholder="Model" defaultValue={modify.model} />

                        <input className="gwuData" name="type" type="text" onChange={updateCard} placeholder="Type" defaultValue={modify.type} />
                        <input className="gwuData" name="serialNumber" type="text" onChange={updateCard} placeholder="Serial Number" defaultValue={modify.sn} />
                        <input className="gwuData" name="warranty" type="date" onChange={updateCard} placeholder="Warranty Expiracy Date" defaultValue={modify.warranty} />
                        <input className="gwuData" name="ccc" type="text" onChange={updateCard} placeholder="CrossCheckCode" defaultValue={modify.ccc} />
                        <input className="gwuData" name="quantity" type="text" onChange={updateCard} placeholder="Quantity" defaultValue={modify.quantity} />
                        <input className="gwuData" name="year" type="text" onChange={updateCard} placeholder="Purchase Year" defaultValue={modify.year} />

                        <br></br>
                        <div className="buttons">
                            <div><button className="sendButton" onClick={() => modifyBack()}>BACK</button></div>
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