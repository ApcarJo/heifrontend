
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


const Profile = (props) => {

    // HOOKS
    const [userData, setUserData] = useState({})

    const [view, setView] = useState({
        modifyView: 'modifyCard',
        modifyViewP: 'profileCard'
    })

    // HANDLERS
    const updateUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    // STATES
    useEffect(() => {
        viewProfile();
    }, []);

    const viewProfile = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                user_id: props.credentials.user?.id,
            }

            let res = await axios.post(`https://heibackend.herokuapp.com/api/chooseuser`, body, { headers: { 'authorization': 'Bearer ' + token } });
            setUserData(res?.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    const modifyProfile = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                user_id: userData.id,
                name: userData.name,
                surname1: userData.surname1,
                surname2: userData.surname2,
                email: userData.email,
                phone: userData.phone,
                picture: userData.picture,
                nif: userData.nif,
                license: userData.license,
                postalcode: userData.postalcode,
                address: userData.address,
                city: userData.city,
                role: userData.role,
                isActive: userData.isActive,
                password: userData.password
            }

            await axios.put(`https://heibackend.herokuapp.com/api/modifyuser`, body, { headers: { 'authorization': 'Bearer ' + token } });

            modifyBack();

        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = () => {

        // Switch view implemented
            const newModifyview = (view.modifyView === 'profileCard') ? 'modifyCard' : 'profileCard';
            const newModifyviewP = (view.modifyViewP === 'profileCard') ? 'modifyCard' : 'profileCard';
            setView({modifyViewP: newModifyviewP, modifyView: newModifyview})
    }

    if (props.credentials?.user) {
        return (
            <div className="viewProfile">
                <div className={view.modifyViewP}>
                    <div className="labelData">Name</div>
                    <div className="profileData" >{userData.name}</div>
                    <div className="labelData">Surname1</div>
                    <div className="profileData">{userData.surname1}</div>
                    <div className="labelData">Surname2</div>
                    <div className="profileData">{userData.surname2}</div>

                    <div className="labelData">City</div>
                    <div className="profileData">{userData.city}</div>

                    <div className="labelData">P.C.</div>
                    <div className="profileData">{userData.postalcode}</div>

                    <div className="labelData">Address</div>
                    <div className="profileData">{userData.address}</div>
                    <div className="labelData">Phone</div>
                    <div className="profileData">{userData.phone}</div>
                    <div className="labelData">Email</div>
                    <div className="profileData">{userData.email}</div>
                    <br></br>
                    <button className="sendButton" onClick={() => modifyBack()}>Modify</button>
                </div>
                <div className={view.modifyView}>
                    <div className="labelData">Name</div>
                    <input className="profileData" name="name" onChange={updateUserData} defaultValue={userData.name} />
                    <div className="labelData">Surname1</div>
                    <input className="profileData" name="surname1" onChange={updateUserData} defaultValue={userData.surname1} />
                    <div className="labelData">Surname2</div>
                    <input className="profileData" name="surname2" onChange={updateUserData} defaultValue={userData.surname2} />

                    <div className="labelData">City</div>
                    <input className="profileData" name="city" onChange={updateUserData} defaultValue={userData.city} />

                    <div className="labelData">P.C.</div>
                    <input className="profileData" name="postalcode" onChange={updateUserData} defaultValue={userData.postalcode} />

                    <div className="labelData">Address</div>
                    <input className="profileData" name="address" onChange={updateUserData} defaultValue={userData.address} />
                    <div className="labelData">Phone</div>
                    <input className="profileData" name="phone" onChange={updateUserData} defaultValue={userData.phone} />
                    <div className="labelData">Codename</div>
                    <input className="profileData" name="codename" type="text" onChange={updateUserData} placeholder="Codename" defaultValue={userData.codename} />
                    <div className="labelData">NIF</div>
                    <input className="profileData" name="nif" type="text" onChange={updateUserData} placeholder="NIF" defaultValue={userData.nif} />
                    <div className="labelData">License</div>
                    <input className="profileData" name="license" type="text" onChange={updateUserData} placeholder="Drive License" defaultValue={userData.license} />
                    <div className="labelData">Role</div>
                    <input className="profileData" name="role" type="text" onChange={updateUserData} placeholder="Role" defaultValue={userData.role} />
                    <br></br>
                    <div className="buttons">
                        <button className="sendButton" onClick={() => modifyBack()}>BACK</button>
                        <button className="sendButton" onClick={() => modifyProfile()}>SAVE</button>
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
}))(Profile);