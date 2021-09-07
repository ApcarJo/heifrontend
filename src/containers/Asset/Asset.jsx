
import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Asset = (props) => {

    let history = useHistory();


    // Hook
    const [item, setitem] = useState(
        {
            name: '',
            model: '',
            type: '',
            serialNumer: '',
            year: '',
            warrantyExpiracyDate: '',
            quantity: '',
            crossCheckCode: '',
        });

    const [msg, setMsg] = useState('');

    // Handler
    const updateitem = (e) => {
        setitem({ ...item, [e.target.name]: e.target.value })
    }

    const createAsset = async () => {
        // e.preventDefault();

        try {
            let token = props.credentials?.token;

            let body = {
                name: item.name,
                model: item.model,
                type: item.type,
                // kit_van_id: item.kit_van_id,
                serialNumber: item.serialNumber,
                year: item.year,
                warrantyExpiracyDate: item.warranty,
                quantity: item.quantity,
                crossCheckCode: item.ccc

            }

            await axios.post('https://heibackend.herokuapp.com/api/createasset', body, { headers: { 'authorization': 'Bearer ' + token } });

            setMsg("conseguido");
            setTimeout(() => {
                history.push(`/assetview`);
            }, 250)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="viewAsset">
            <div className="content">
                <h3>Asset</h3>
                <div className="showCard">
                        Name
                        <input className="teamDataBox" name="name" type="text" onChange={updateitem} placeholder="name" required />
                        Model
                        <input className="teamDataBox" name="model" type="text" onChange={updateitem} placeholder="model" required />
                        Type
                        <input className="teamDataBox" name="type" type="text" onChange={updateitem} placeholder="type" required />
                        Kit_Van
                        <input className="teamDataBox" name="kit_van_id" onChange={updateitem} placeholder="kit_van_id" required />
                        Serial Number
                        <input className="teamDataBox" name="serialNumber" type="text" onChange={updateitem} placeholder="serialNumber" required />
                        Cross Check Code
                        <input className="teamDataBox" name="ccc" type="text" onChange={updateitem} placeholder="CrossCheckCode" required />
                        Purchase Year
                        <input className="teamDataBox" name="year" type="string" onChange={updateitem} placeholder="Purchase Year Date" required />
                        Warranty Expiration Date
                        <input className="teamDataBox" name="warranty" type="date" onChange={updateitem} placeholder="Warranty Expiration Date" required />
                        Quantity
                        <input className="teamDataBox" name="quantity" type="number" onChange={updateitem} placeholder="quantity" required />

                    <br></br>
                    <button className="sendButton" onClick={() => createAsset()}>CREATE</button>
                    <div className="msg">{msg}</div>
                </div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    credentials: state.credentials,
    calendar: state.calendar
}))(Asset);