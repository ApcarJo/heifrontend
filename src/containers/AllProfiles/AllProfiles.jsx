

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AllProfiles = (props) => {

    let history = useHistory();

    // HOOKS
    const [profileData, setProfileData] = useState({})
    // const [allNames, setAllNames] = useState({})
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
        viewUsers("all");
    }, []);

    const updateSelector = (e) => {
        setSelector({ ...selector, [e.target.name]: e.target.value })
    }

    const viewUsers = async (val) => {

        switch (val) {

            case "all":

                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`http://127.0.0.1:8000/api/allusers`, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

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

                    let res = await axios.post(`http://127.0.0.1:8000/api/finduser`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "active":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`http://127.0.0.1:8000/api/activeusers`, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "archive":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`http://127.0.0.1:8000/api/findarchiveuser`, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "role":
                try {
                    let token = props.credentials?.token;

                    let body = {
                        name: selector.role,
                    }

                    let res = await axios.post(`http://127.0.0.1:8000/api/userrole`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            default:
        }


    }

    const deleteUser = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                id: id,
            }

            let res = await axios.delete(`http://127.0.0.1:8000/api/deleteuser`, body, { headers: { 'authorization': 'Bearer ' + token } });

        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = async (id) => {

        if (id) {
            try {
                let body = {
                    user_id: id
                }
                let token = props.credentials?.token;

                let res = await axios.post(`http://127.0.0.1:8000/api/chooseuser`, body, { headers: { 'authorization': 'Bearer ' + token } });
                setModify(res.data.data);

            } catch (error) {
                console.log(error);
            }
        }


        // Switch view implemented

        (view.modifyView === 'profileCard') ? view.modifyView = 'modifyCard' : view.modifyView = 'profileCard';

        (view.modifyViewP === 'profileCard') ? view.modifyViewP = 'modifyCard' : view.modifyViewP = 'profileCard';

        viewUsers();

    }

    const modifyCard = async (id) => {
        // e.preventDefault();

        try {
            let token = props.credentials.token;

            let body = {
                user_id: id,
                name: card.name,
                surname1: card.surname1,
                surname2: card.surname2,
                email: card.email,
                codename: card.codename,
                phone: card.phone,
                picture: card.picture,
                nif: card.nif,
                license: card.license,
                postalcode: card.postalcode,
                address: card.address,
                city: card.city,
                role: card.role,
                isAdmin: card.isAdmin,
                isArchive: card.isArchive,
                isActive: card.isActive
            }


            let res = await axios.put('http://127.0.0.1:8000/api/modifyuser', body, { headers: { 'authorization': 'Bearer ' + token } });

            setTimeout(() => {
                history.push(`/allprofiles`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    if ((props.credentials.user?.isAdmin == true) && (profileData.data)) {
        return (
            <div className="viewAsset">
                <div className="content">
                    <div className="subHeader">

                    </div>
                    <div className={view.modifyViewP}>
                        <div className="newsCard">Profiles List View
                            <div className="row">
                                Filter:
                                <button className="sendButton" name="isActive" onClick={viewUsers("active")}>Active Users</button>
                                <button className="sendButton" onClick={viewUsers("archive")}>Archive Users</button>

                                <input className="gwuData" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={viewUsers("name")}>User's Name</button>
                                <input className="gwuData" name="role" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={viewUsers("role")}>User's Role</button>
                                
                            </div>
                        </div>

                        {profileData.data.map((val, index) => (
                            <div className="gwupdatecards" key={index}>
                                <div className="bbottom row">
                                    <div>Name: {val.name}</div>
                                    <div>Name: {val.surname1}</div>
                                    <div>Name: {val.codename}</div>
                                    <div>Name: {val.email}</div>
                                    <div>Name: {val.phone}</div>
                                    <div>Name: {val.city}</div>
                                    <div>role: {val.role}</div>
                                    <div>Type: {val.type}</div>
                                </div>
                                <div className="gwInfo">

                                    <div>{val.infoUpdate}</div>
                                    <button className="sendButton" onClick={() => deleteUser(val.id)}>Delete</button>
                                    <button className="sendButton" onClick={() => modifyBack(val.id)}>Modify</button>
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
                            <div><button className="sendButton" onClick={modifyBack}>BACK</button></div>
                            <div><button className="sendButton" onClick={() => modifyCard(modify.id)}>SAVE</button></div>
                        </div>
                    </div>
                </div>


            </div>

        )

    } else if (profileData.data) {

        return (
            <div className="viewGWupdate">
                <div className="content">
                    <div className="newsCard">Last GameWeek 3 Updates</div>
                    {profileData.data.map((val, index) => (
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
}))(AllProfiles);