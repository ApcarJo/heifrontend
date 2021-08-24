

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

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/allusers`, { headers: { 'authorization': 'Bearer ' + token } });

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

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/finduser`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "active":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/activeusers`, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "archive":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/findarchiveuser`, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "role":
                try {
                    let token = props.credentials?.token;

                    let body = {
                        role: selector.role,
                    }

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/userrole`, body, { headers: { 'authorization': 'Bearer ' + token } });

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

            let res = await axios.delete(`https://heibackend.herokuapp.com/api/deleteuser`, body, { headers: { 'authorization': 'Bearer ' + token } });

        } catch (error) {
            console.log(error);
        }
    }

    const archiveUser = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                id: id,
            }

            let res = await axios.post(`https://heibackend.herokuapp.com/api/archiveuser`, body, { headers: { 'authorization': 'Bearer ' + token } });

        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = async (id) => {
        console.log("a modify se venir")
        if (id) {
            try {
                let body = {
                    user_id: id
                }
                let token = props.credentials?.token;

                let res = await axios.post(`https://heibackend.herokuapp.com/api/chooseuser`, body, { headers: { 'authorization': 'Bearer ' + token } });
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

            let res = await axios.put('https://heibackend.herokuapp.com/api/modifyuser', body, { headers: { 'authorization': 'Bearer ' + token } });

            setTimeout(() => {
                history.push(`/allprofiles`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    if ((props.credentials.user?.isAdmin == true) && (profileData.data)) {
        return (
            <div className="viewAllProfiles">
                <div className="content">
                    <div className="subHeader">

                    </div>
                    <div className={view.modifyViewP}>
                        <div className="newsCard">Profiles List View
                            <div className="row">
                                Filter:
                                <button className="sendButton" name="isActive" onClick={() => viewUsers("active")}>Active Users</button>
                                <button className="sendButton" onClick={() => viewUsers("archive")}>Archive Users</button>

                                <input className="gwuData" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewUsers("name")}>User's Name</button>
                                <input className="gwuData" name="role" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewUsers("role")}>User's Role</button>

                            </div>
                        </div>

                        {profileData.data.map((val, index) => (
                            <div className="gwupdatecards" key={index}>
                                <div className="bbottom row">
                                    <div>Name: {val.name}</div>
                                    <div>Surname: {val.surname1}</div>
                                    <div>CodeName: {val.codename}</div>
                                    <div>Email: {val.email}</div>
                                    <div>Phone: {val.phone}</div>
                                    <div>City: {val.city}</div>
                                    <div>Role: {val.role}</div>
                                </div>
                                <div className="gwInfo">

                                    <div className="row">
                                        <button className="sendButton" onClick={() => deleteUser(val.id)}>Delete</button>
                                        <button className="sendButton" onClick={() => archiveUser(val.id)}>Archive</button>
                                        <button className="sendButton" onClick={() => modifyBack(val.id)}>Modify</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={view.modifyView}>
                        <input className="gwuData" name="name" type="text" onChange={updateCard} placeholder="Name" defaultValue={modify.name} />
                        <input className="gwuData" name="surname1" type="text" onChange={updateCard} placeholder="Surname2" defaultValue={modify.surname1} />
                        <input className="gwuData" name="surname2" type="text" onChange={updateCard} placeholder="Surname2" defaultValue={modify.surname2} />
                        <input className="gwuData" name="codename" type="text" onChange={updateCard} placeholder="Codename" defaultValue={modify.codename} />
                        <input className="gwuData" name="email" type="text" onChange={updateCard} placeholder="Email" defaultValue={modify.email} />
                        <input className="gwuData" name="phone" type="text" onChange={updateCard} placeholder="Phone" defaultValue={modify.phone} />
                        <input className="gwuData" name="nif" type="text" onChange={updateCard} placeholder="NIF" defaultValue={modify.nif} />
                        <input className="gwuData" name="license" type="text" onChange={updateCard} placeholder="Drive License" defaultValue={modify.license} />
                        <input className="gwuData" name="postalcode" type="text" onChange={updateCard} placeholder="Postal Code" defaultValue={modify.postalcode} />
                        <input className="gwuData" name="address" type="text" onChange={updateCard} placeholder="Address" defaultValue={modify.address} />
                        <input className="gwuData" name="city" type="text" onChange={updateCard} placeholder="City" defaultValue={modify.city} />
                        <input className="gwuData" name="role" type="text" onChange={updateCard} placeholder="Role" defaultValue={modify.role} />
                        <input className="gwuData" name="isAdmin" type="text" onChange={updateCard} placeholder="isAdmin" defaultValue={modify.isAdmin} />
                        <input className="gwuData" name="isArchive" type="text" onChange={updateCard} placeholder="isArchive" defaultValue={modify.isArchive} />
                        <input className="gwuData" name="isActive" type="text" onChange={updateCard} placeholder="isActive" defaultValue={modify.isActive} />

                        <br></br>
                        <div className="buttons">
                            <div><button className="sendButton" onClick={() => modifyBack()}>BACK</button></div>
                            <div><button className="sendButton" onClick={() => modifyCard(modify.id)}>SAVE</button></div>
                        </div>
                    </div>
                </div>


            </div>

        )

    } else if ((props.credentials.user?.isAdmin == false) && (profileData.data)) {

        return (
            <div className="viewGWupdate">
                <div className="content">
                    <div className="newsCard">Last GameWeek Updates</div>
                    {profileData.data.map((val, index) => (
                        <div className="gwupdatecards" key={index}>
                            <div className="bbottom row">
                                <div>Name: {val.name}</div>
                                <div>Surname: {val.surname1}</div>
                                <div>CodeName: {val.codename}</div>
                                <div>Email: {val.email}</div>
                                <div>Phone: {val.phone}</div>
                                <div>City: {val.city}</div>
                                <div>Role: {val.role}</div>
                                <div>Type: {val.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        )
    } else {
        return "Loading";
    }
}

export default connect((state) => ({
    credentials: state.credentials
}))(AllProfiles);