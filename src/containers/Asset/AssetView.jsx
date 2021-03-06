
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AssetView = (props) => {

    let history = useHistory();

    // HOOKS
    const [assetData, setAssetData] = useState({})
    const [modify, setModify] = useState({})
    const [card, setCard] = useState('');
    const [buttons] = useState({
        show: [],
        bId: '',
    });
    const [filterName, setFilterName] = useState({
        filterType: 'All',
    });
    const [view, setView] = useState({
        modifyView: 'hideCard',
        modifyViewP: 'showCard'
    })

    const [showHide, setShowHide] = useState(false)
    const [selector, setSelector] = useState('');


    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        viewAssetViews("All");
    }, []);

    const updateSelector = (e) => {
        setSelector({ ...selector, [e.target.name]: e.target.value })
    }


    const goToCreateAsset = () => {
        history.push("asset")
    }
    const viewAssetViews = async (val) => {
        setFilterName({ ...filterName, filterType: val });
        switch (val) {

            case "All":

                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/allassets`, { headers: { 'authorization': 'Bearer ' + token } });

                    setAssetData(res.data);

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

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/findasset`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setAssetData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "Model":
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
                break;
            default:
        }


    }

    const deleteAsset = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                asset_id: id,
            }

            await axios.delete(`https://heibackend.herokuapp.com/api/deleteasset`, { data: body, headers: { 'authorization': 'Bearer ' + token } });

            viewAssetViews("All");
        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = async (id) => {

        if (id) {
            try {

                let body = {
                    asset_id: id
                }
                let token = props.credentials?.token;

                let res = await axios.post(`https://heibackend.herokuapp.com/api/chooseasset`, body, { headers: { 'authorization': 'Bearer ' + token } });
                setModify(res.data.data);

            } catch (error) {
                console.log(error);
            }
        }

        // Switch view implemented
        const newModifyview = (view.modifyView === 'showCard') ? 'hideCard' : 'showCard';
        const newModifyviewP = (view.modifyViewP === 'showCard') ? 'hideCard' : 'showCard';
        setView({ modifyViewP: newModifyviewP, modifyView: newModifyview })

    }

    const hideCard = async (id) => {
        // e.preventDefault();

        try {
            let token = props.credentials.token;

            let body = {
                asset_id: id,
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

            await axios.put('https://heibackend.herokuapp.com/api/modifyasset', body, { headers: { 'authorization': 'Bearer ' + token } });

            // Switch view implemented
            const newModifyview = (view.modifyView === 'showCard') ? 'hideCard' : 'showCard';
            const newModifyviewP = (view.modifyViewP === 'showCard') ? 'hideCard' : 'showCard';
            setView({ modifyViewP: newModifyviewP, modifyView: newModifyview })

            viewAssetViews("All");

        } catch (error) {
            console.log(error);
        }
    }

    const showFunc = (id) => {
        buttons.bId = id;
        buttons.show = [];
        buttons.show.push(<div className="row flexEnd">
            <button className="sendButton" onClick={() => deleteAsset(id)}>Delete</button>
            <button className="sendButton" onClick={() => modifyBack(id)}>Modify</button></div>);
        setShowHide(!showHide)
    }

    if ((props.credentials.user?.isAdmin) && (assetData.data)) {
        return (
            <div className="viewAsset">
                <div className="content">
                    <h3>Modify asset</h3>
                    <div className={view.modifyViewP}>
                        <div className="newsCard"><h3>{filterName.filterType} Asset View</h3>
                            <div className="row">
                                <button className="sendButton" onClick={() => viewAssetViews("All")}>All</button>
                                <input className="searchBox" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewAssetViews("Name")}>NAME</button>

                                <input className="searchBox" name="model" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewAssetViews("Model")}>MODEL</button>
                                <button className="sendButton" onClick={() => goToCreateAsset()}> ADD</button>
                            </div>
                        </div>
                        <div className="row spaceEvenly column">
                            <div className="dataBox">Name</div>
                            <div className="dataBox">Model</div>
                            <div className="dataBox">Type</div>
                            <div className="dataBox">Quantity</div>
                        </div>

                        {assetData.data.map((val, index) => (
                            <div key={index}>
                                <div className="profileInfo row underline spaceEvenly" onClick={() => showFunc(val.id)}>
                                    <div className="dataBox">{val.name}</div>
                                    <div className="dataBox">{val.model}</div>
                                    <div className="dataBox">{val.type}</div>
                                    <div className="dataBox">{val.quantity}</div>
                                </div>
                                {(showHide && (buttons.bId === val.id)) && (<div className="center profileInfo">
                                    <div className="row underline">
                                        <div className="dataBox">Year</div>
                                        <div className="dataBox">S/N</div>
                                        <div className="dataBox">Warranty</div>
                                        <div className="dataBox">CCC</div>
                                    </div>
                                    <div className="row">
                                        <div className="dataBox">{val.year}</div>
                                        <div className="dataBox">{val.serialNumber}</div>
                                        <div className="dataBox">{val.warrantyExpiracyDate}</div>
                                        <div className="dataBox">{val.crossCheckCode}</div>
                                    </div>
                                </div>
                                )}

                                {(showHide && (buttons.bId === val.id)) && (<div className="row">
                                    <div className="flexEnd">{buttons.show}</div>
                                </div>
                                )}

                            </div>
                        ))}
                    </div>
                    {modify && (<div className={view.modifyView}>
                        <input className="teamDataBox" name="name" type="text" onChange={updateCard} placeholder="Name" defaultValue={modify.name} />
                        <input className="teamDataBox" name="model" type="text" onChange={updateCard} placeholder="Model" defaultValue={modify.model} />
                        <input className="teamDataBox" name="type" type="text" onChange={updateCard} placeholder="Type" defaultValue={modify.type} />
                        <input className="teamDataBox" name="serialNumber" type="text" onChange={updateCard} placeholder="Serial Number" defaultValue={modify.sn} />
                        <input className="teamDataBox" name="warranty" type="date" onChange={updateCard} placeholder="Warranty Expiracy Date" defaultValue={modify.warranty} />
                        <input className="teamDataBox" name="ccc" type="text" onChange={updateCard} placeholder="CrossCheckCode" defaultValue={modify.ccc} />
                        <input className="teamDataBox" name="quantity" type="text" onChange={updateCard} placeholder="Quantity" defaultValue={modify.quantity} />
                        <input className="teamDataBox" name="year" type="text" onChange={updateCard} placeholder="Purchase Year" defaultValue={modify.year} />
                        <br></br>
                        <div className="row">
                            <div><button className="sendButton" onClick={() => modifyBack()}>BACK</button></div>
                            <div><button className="sendButton" onClick={() => hideCard(modify.id)}>SAVE</button></div>
                        </div>
                    </div>
                    )}
                </div>


            </div>

        )

    } else if (assetData.data) {

        return (
            <div className="viewAsset">
                <div className="content">
                    <h3>Modify asset</h3>
                    <div className={"showCard"}>
                        <div className="newsCard"><h3>{filterName.filterType} Asset View</h3>
                            <div className="row">
                                <button className="sendButton" onClick={() => viewAssetViews("All")}>All</button>
                                <input className="searchBox" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewAssetViews("Name")}>NAME</button>

                                <input className="searchBox" name="model" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewAssetViews("Model")}>MODEL</button>
                            </div>
                        </div>
                        <div className="row spaceEvenly column">
                            <div className="dataBox">Name</div>
                            <div className="dataBox">Model</div>
                            <div className="dataBox">Type</div>
                            <div className="dataBox">Quantity</div>
                        </div>

                        {assetData.data.map((val, index) => (
                            <div key={index}>
                                <div className="profileInfo row underline spaceEvenly" onClick={() => showFunc(val.id)}>
                                    <div className="dataBox">{val.name}</div>
                                    <div className="dataBox">{val.model}</div>
                                    <div className="dataBox">{val.type}</div>
                                    <div className="dataBox">{val.quantity}</div>
                                </div>
                                {(showHide && (buttons.bId === val.id)) && (<div className="center profileInfo">
                                    <div className="row underline">
                                        <div className="dataBox">Year</div>
                                        <div className="dataBox">S/N</div>
                                        <div className="dataBox">Warranty</div>
                                        <div className="dataBox">CCC</div>
                                    </div>
                                    <div className="row">
                                        <div className="dataBox">{val.year}</div>
                                        <div className="dataBox">{val.serialNumber}</div>
                                        <div className="dataBox">{val.warrantyExpiracyDate}</div>
                                        <div className="dataBox">{val.crossCheckCode}</div>
                                    </div>
                                </div>
                                )}

                                {(showHide && (buttons.bId === val.id)) && (<div className="row">
                                    <div className="flexEnd">{buttons.show}</div>
                                </div>
                                )}

                            </div>
                        ))}
                    </div>
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