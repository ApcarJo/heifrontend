
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import { connect } from 'react-redux';

const GWupdate = (props) => {


    // HOOKS
    const [gwUpdateData, setGwUpdateData] = useState({})
    const [deleteCard, setDeleteCard] = useState({})

    useEffect(() => {
        viewGWUpdates();
    }, []);

    const viewGWUpdates = async () => {

        try {
            let token = props.credentials?.token;

            let res = await axios.get(`http://127.0.0.1:8000/api/allgwupdates`, { headers: { 'authorization': 'Bearer ' + token } });

            setGwUpdateData(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteGWU = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                Gwupdate_id: id,
            }

            let res = await axios.delete(`http://127.0.0.1:8000/api/deletegwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });

            // viewGWUpdates();
        } catch (error) {
            console.log(error);
        }
    }

    if ((props.credentials.user?.isAdmin == true)&&(gwUpdateData.data)) {
        return (
            <div className="viewGWupdate">
                <div className="content">
                    <div className="newsCard">Last GameWeek2 Updates</div>
                    {gwUpdateData.data.map((val, index) => (
                        <div className="gwupdatecards" key={index}>
                            <div className="bbottom row">
                                <div>{val.title}</div>
                                <div>{val.roles}</div>
                                <div>{val.id}</div>
                            </div>
                            <div className="gwInfo">

                                <div>{val.infoUpdate}</div>
                                <button className="sendButton" onClick={() => deleteGWU(val.id)}>Delete</button>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )

    } else if (gwUpdateData.data) {

        return (
            <div className="viewGWupdate">
                <div className="content">
                    <div className="newsCard">Last GameWeek 3 Updates</div>
                    {gwUpdateData.data.map((val, index) => (
                        <div className="gwupdatecards" key={index}>
                            <div className="row">
                                <div>{val.title}</div>
                                <div>{val.roles}</div>
                                <div>{val.id}</div>

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
}))(GWupdate);