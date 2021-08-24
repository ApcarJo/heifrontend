
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';


const Profile = (props) => {

    let history = useHistory();

    // HOOKS
    const [userData, setUserData] = useState({})
    const [userDataId, setUserDataId] = useState({})

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

    useEffect(() => {

    });

    const viewProfile = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                user_id: props.credentials.user?.id,
            }

            let res = await axios.post(`http://127.0.0.1:8000/api/chooseuser`, body, { headers: { 'authorization': 'Bearer ' + token } });
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
                postalcode: userData.postalcode,
                role: userData.role,
                isActive: userData.isActive,
                password: userData.password
            }

            let res = await axios.put(`http://127.0.0.1:8000/api/modifyuser`, body, { headers: { 'authorization': 'Bearer ' + token } });

            modifyBack();

        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = () => {

        // Switch view implemented

        (view.modifyView === 'profileCard') ? view.modifyView = 'modifyCard' : view.modifyView = 'profileCard';

        (view.modifyViewP === 'profileCard') ? view.modifyViewP = 'modifyCard' : view.modifyViewP = 'profileCard';

        //console.log(view.modifyView, view.modifyViewP);
        viewProfile();
    }

    return (
        <div className="profileMenu">
            <div className="vistaProfile">
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
                    <button className="sendButton" onClick={()=>modifyBack()}>Modify</button>
                </div>
                <div className={view.modifyView}>
                    <div className="labelData">Name</div><input className="profileData" name="name" onChange={updateUserData} defaultValue={userData.name} />
                    <div className="labelData">Surname1</div><input className="profileData" name="surname1" onChange={updateUserData} defaultValue={userData.surname1} />
                    <div className="labelData">Surname2</div><input className="profileData" name="surname2" onChange={updateUserData} defaultValue={userData.surname2} />

                    <div className="labelData">City</div><input className="profileData" name="city" onChange={updateUserData} defaultValue={userData.city} />

                    <div className="labelData">P.C.</div><input className="profileData" name="postalcode" onChange={updateUserData} defaultValue={userData.postalcode} />

                    <div className="labelData">Address</div><input className="profileData" name="address" onChange={updateUserData} defaultValue={userData.address} />
                    <div className="labelData">Phone</div><input className="profileData" name="phone" onChange={updateUserData} defaultValue={userData.phone} />
                    <input className="gwuData" name="name" type="text" onChange={updateUserData} placeholder="Name" defaultValue={userData.name} />
                    <input className="gwuData" name="surname1" type="text" onChange={updateUserData} placeholder="Surname2" defaultValue={userData.surname1} />
                    <input className="gwuData" name="surname2" type="text" onChange={updateUserData} placeholder="Surname2" defaultValue={userData.surname2} />
                    <input className="gwuData" name="codename" type="text" onChange={updateUserData} placeholder="Codename" defaultValue={userData.codename} />
                    <input className="gwuData" name="email" type="text" onChange={updateUserData} placeholder="Email" defaultValue={userData.email} />
                    <input className="gwuData" name="phone" type="text" onChange={updateUserData} placeholder="Phone" defaultValue={userData.phone} />
                    <input className="gwuData" name="nif" type="text" onChange={updateUserData} placeholder="NIF" defaultValue={userData.nif} />
                    <input className="gwuData" name="license" type="text" onChange={updateUserData} placeholder="Drive License" defaultValue={userData.license} />
                    <input className="gwuData" name="postalcode" type="text" onChange={updateUserData} placeholder="Postal Code" defaultValue={userData.postalcode} />
                    <input className="gwuData" name="address" type="text" onChange={updateUserData} placeholder="Address" defaultValue={userData.address} />
                    <input className="gwuData" name="city" type="text" onChange={updateUserData} placeholder="City" defaultValue={userData.city} />
                    <input className="gwuData" name="role" type="text" onChange={updateUserData} placeholder="Role" defaultValue={userData.role} />
                    <input className="gwuData" name="isAdmin" type="text" onChange={updateUserData} placeholder="isAdmin" defaultValue={userData.isAdmin} />
                    <input className="gwuData" name="isArchive" type="text" onChange={updateUserData} placeholder="isArchive" defaultValue={userData.isArchive} />
                    <input className="gwuData" name="isActive" type="text" onChange={updateUserData} placeholder="isActive" defaultValue={userData.isActive} />
                    <br></br>
                    <div className="buttons">
                        <button className="sendButton" onClick={()=>modifyBack()}>BACK</button>
                        <button className="sendButton" onClick={()=>modifyProfile()}>SAVE</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials
}))(Profile);