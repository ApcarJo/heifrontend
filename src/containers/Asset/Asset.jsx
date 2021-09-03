
import React, { useState, useEffect } from 'react';
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
                <div className="AssetCard">
                    <div className="AssetInput">
                        <input className="input" name="name" type="text" onChange={updateitem} placeholder="name" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="model" type="text" onChange={updateitem} placeholder="model" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="type" type="text" onChange={updateitem} placeholder="type" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="kit_van_id" onChange={updateitem} placeholder="kit_van_id" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="serialNumber" type="text" onChange={updateitem} placeholder="serialNumber" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="ccc" type="text" onChange={updateitem} placeholder="CrossCheckCode" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="year" type="string" onChange={updateitem} placeholder="Purchase Year Date" required />
                    </div>
                    <div className="AssetInput">
                        Warranty Expiration Date
                        <input className="input" name="warranty" type="date" onChange={updateitem} placeholder="Warranty Expiration Date" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="quantity" type="number" onChange={updateitem} placeholder="quantity" required />
                    </div>
                    <br></br>
                    <button className="sendButton" onClick={() => createAsset()}>Save</button>
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