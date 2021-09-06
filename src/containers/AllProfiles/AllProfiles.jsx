

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const AllProfiles = (props) => {

    // HOOKS
    const [profileData, setProfileData] = useState({})
    const [modify, setModify] = useState({})
    const [card, setCard] = useState('');
    const [buttons] = useState({
        show: [],
        bId: '',
    });

    const [view, setView] = useState({
        modifyView: 'hideCard',
        modifyViewP: 'showCard',
    })

    const [showHide, setShowHide] = useState(false);
    const [selector, setSelector] = useState('');


    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        viewUsers("All");
    }, []);

    const updateSelector = (e) => {
        setSelector({ ...selector, [e.target.name]: e.target.value })
    }

    const viewUsers = async (val) => {

        switch (val) {

            case "All":

                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/allusers`, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

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

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/finduser`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "Active":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/activeusers`, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "Archive":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/findarchiveuser`, { headers: { 'authorization': 'Bearer ' + token } });

                    setProfileData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "Role":
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
                user_id: id,
            }

            await axios.delete(`https://heibackend.herokuapp.com/api/deleteuser`, { data: body, headers: { 'authorization': 'Bearer ' + token } });
            viewUsers("All");
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

            await axios.put(`https://heibackend.herokuapp.com/api/archiveuser`, body, { headers: { 'authorization': 'Bearer ' + token } });
            viewUsers("Archive");
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
                setModify();
                let res = await axios.post(`https://heibackend.herokuapp.com/api/chooseuser`, body, { headers: { 'authorization': 'Bearer ' + token } });
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

    const modifyUser = async (id) => {

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

            await axios.put('https://heibackend.herokuapp.com/api/modifyuser', body, { headers: { 'authorization': 'Bearer ' + token } });

            const newModifyview = (view.modifyView === 'showCard') ? 'hideCard' : 'showCard';
            const newModifyviewP = (view.modifyViewP === 'showCard') ? 'hideCard' : 'showCard';
            setView({ modifyViewP: newModifyviewP, modifyView: newModifyview });
            viewUsers("All");

        } catch (error) {
            console.log(error);
        }
    }

    const showFunc = (id) => {
        buttons.bId = id;
        buttons.show = [];
        buttons.show.push(<div className="row flexEnd">
            <button className="sendButton" onClick={() => deleteUser(id)}>Delete</button>
            <button className="sendButton" onClick={() => archiveUser(id)}>Archive</button>
            <button className="sendButton" onClick={() => modifyBack(id)}>Modify</button></div>);
        setShowHide(!showHide)
    }


    if ((props.credentials.user?.isAdmin) && (profileData?.data)) {
        return (
            <div className="viewAllProfiles">
                <div className="content">
                    <div className="subHeader">

                    </div>
                    <div className={view.modifyViewP}>
                        <div className="newsCard">Profiles List View
                            <div className="row">
                                Filter:
                                <button className="sendButton" name="allUsers" onClick={() => viewUsers("All")}>All Users</button>
                                <button className="sendButton" name="isActive" onClick={() => viewUsers("Active")}>Active Users</button>
                                <button className="sendButton" onClick={() => viewUsers("Archive")}>Archive Users</button>

                                <input className="userData" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewUsers("Name")}>User's Name</button>
                                <input className="userData" name="role" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewUsers("Role")}>User's Role</button>

                            </div>
                        </div>
                        <div className="row underline spaceEvenly">
                            <div className="dataBox">Name</div>
                            <div className="dataBox">Surname</div>
                            <div className="dataBox">CodeName</div>
                            <div className="dataBox">Email</div>
                            <div className="dataBox">Phone</div>
                            <div className="dataBox">City</div>
                            <div className="dataBox">Role</div>
                        </div>

                        {profileData.data.map((val, index) => (
                            <div key={index}>
                                <div className="profileInfo row underline spaceEvenly" onClick={() => showFunc(val.id)}>
                                    <div className="dataBox">{val.name}</div>
                                    <div className="dataBox">{val.surname1}</div>
                                    <div className="dataBox">{val.codename}</div>
                                    <div className="dataBox">{val.email}</div>
                                    <div className="dataBox">{val.phone}</div>
                                    <div className="dataBox">{val.city}</div>
                                    <div className="dataBox">{val.role}</div>
                                </div>
                                {(showHide && (buttons.bId === val.id)) && (<div className="row">
                                    <div className="flexEnd">{buttons.show}</div>
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Swtich visibility */}
                    {modify && (<div className={view.modifyView}>
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
                        <div className="row">
                            <button className="sendButton" onClick={() => modifyBack()}>BACK</button>
                            <button className="sendButton" onClick={() => modifyUser(modify.id)}>SAVE</button>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        )

    } else if ((props.credentials?.user) && (profileData?.data)) {

        return (
            <div className="viewAllProfiles">
                <div className="content">
                    <div className="subHeader">

                    </div>
                    <div className="showCard">
                        <div className="newsCard">Profiles List View
                            <div className="row">
                                Filter:
                                <button className="sendButton" name="allUsers" onClick={() => viewUsers("All")}>All Users</button>
                                <button className="sendButton" name="isActive" onClick={() => viewUsers("Active")}>Active Users</button>
                                <button className="sendButton" onClick={() => viewUsers("Archive")}>Archive Users</button>

                                <input className="userData" name="name" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewUsers("Name")}>User's Name</button>
                                <input className="userData" name="role" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewUsers("Role")}>User's Role</button>

                            </div>
                        </div>
                        <div className="row underline spaceEvenly">
                            <div className="dataBox">Name</div>
                            <div className="dataBox">Surname</div>
                            <div className="dataBox">CodeName</div>
                            <div className="dataBox">Email</div>
                            <div className="dataBox">Phone</div>
                            <div className="dataBox">City</div>
                            <div className="dataBox">Role</div>
                        </div>

                        {profileData.data.map((val, index) => (
                            <div key={index}>
                                <div className="profileInfo row underline spaceEvenly" onClick={() => showFunc(val.id)}>
                                    <div className="dataBox">{val.name}</div>
                                    <div className="dataBox">{val.surname1}</div>
                                    <div className="dataBox">{val.codename}</div>
                                    <div className="dataBox">{val.email}</div>
                                    <div className="dataBox">{val.phone}</div>
                                    <div className="dataBox">{val.city}</div>
                                    <div className="dataBox">{val.role}</div>
                                </div>
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
}))(AllProfiles);