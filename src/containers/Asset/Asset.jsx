
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Calendar from '../../components/Datepicker/Datepicker';

const Asset = (props) => {

    let history = useHistory();


    // Hook
    const [item, setitem] = useState(
        {
            name: '',
            model: '',
            type: '',
        });

    // Handler
    const updateitem = (e) => {
        setitem({ ...item, [e.target.name]: e.target.value })
    }

    const saveAsset = async () => {
        // e.preventDefault();

        try {
            let token = props.credentials?.token;

            let body = {
                name: item.name,
                model: item.model,
                type: item.type,
                serialNumer: item.serialNumber,
                year: item.year,
                warrantyExpiracyDate: item.warranty,
                quantity: item.quantity,
                crossCheckCode: item.ccc

            }

                let res = await axios.post('http://127.0.0.1:8000/api/createasset', body, { headers: { 'authorization': 'Bearer ' + token }});
                setTimeout(() => {
                    history.push(`/Asset`);
                }, 250)

        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="viewAsset">
            <div className="content">
                <h3>Asset</h3>
                {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
                <div className="AssetCard">
                    <div className="AssetInput">
                        <input className="input" name="name" type="text" onChange={updateitem} placeholder="name" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="model" type="text" onChange={updateitem} placeholder="model" required />
                    </div>

                    <div className="AssetInput">
                        <input className="input" name="type" type="text" onChange={updateitem}  placeholder="type" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="serialNumber" type="text" onChange={updateitem}  placeholder="serialNumer"required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="ccc" type="text" onChange={updateitem}  placeholder="CrossCheckCode" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="warranty" type="date" onChange={updateitem}  placeholder="Warranty Expiration Date" required />
                    </div>
                    <div className="AssetInput">
                        <input className="input" name="quantity" type="text" onChange={updateitem}  placeholder="quantity" required />
                    </div>
                    <button className="sendButton" onClick={() => saveAsset()}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default connect((state) => ({
    calendar: state.calendar
}))(Asset);