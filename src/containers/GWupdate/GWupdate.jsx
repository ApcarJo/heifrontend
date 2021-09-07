
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const GWupdate = (props) => {

    let history = useHistory();

    // HOOKS
    const [gwUpdateData, setGwUpdateData] = useState({})
    const [modify, setModify] = useState({})
    const [card, setCard] = useState({});
    const [filterName, setFilterName] = useState({
        filterType: 'all',
    });

    const [view, setView] = useState({
        modifyView: 'hideCard',
        modifyViewP: 'showCard'
    });

    const [buttons] = useState({
        show: [],
        bId: '',
    });

    const [selector, setSelector] = useState('');
    const [showHide, setShowHide] = useState(false);


    const goToCreateGwupdate = () => {
        history.push("gwupdateCreate")
    }

    // Handler
    const updateCard = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    const updateSelector = (e) => {
        setSelector({ ...selector, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        viewGWUpdates("All");
    }, []);


    const viewGWUpdates = async (val) => {
        setFilterName({ ...filterName, filterType: val });
        // setFilterName(val);
        switch (val) {
            case "All":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/allgwupdates`, { headers: { 'authorization': 'Bearer ' + token } });
                    setGwUpdateData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "Active":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/activegwupdate`, { headers: { 'authorization': 'Bearer ' + token } });

                    setGwUpdateData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;

            case "Title":
                try {
                    let token = props.credentials?.token;

                    let body = {
                        title: selector.title,
                    }

                    let res = await axios.post(`https://heibackend.herokuapp.com/api/findgwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });

                    setGwUpdateData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            case "Archive":
                try {
                    let token = props.credentials?.token;

                    let res = await axios.get(`https://heibackend.herokuapp.com/api/showarchived`, { headers: { 'authorization': 'Bearer ' + token } });

                    setGwUpdateData(res.data);

                } catch (error) {
                    console.log(error);
                }
                break;
            default:
        }
    }

    const deleteGWU = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                gwupdate_id: id,
            }

            await axios.delete(`https://heibackend.herokuapp.com/api/deletegwupdate`, { data: body, headers: { 'authorization': 'Bearer ' + token } });

            viewGWUpdates("All");
        } catch (error) {
            console.log(error);
        }
    }

    const archiveGWU = async (id) => {
        try {
            let token = props.credentials?.token;

            let body = {
                id: id
            }
            await axios.put(`https://heibackend.herokuapp.com/api/archivegwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });

            viewGWUpdates("archive");

        } catch (error) {
            console.log(error);
        }
    }

    const modifyBack = async (id) => {

        if (id) {
            try {

                let body = {
                    gwupdate_id: id
                }
                let token = props.credentials?.token;

                let res = await axios.post(`https://heibackend.herokuapp.com/api/choosegwupdate`, body, { headers: { 'authorization': 'Bearer ' + token } });
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

    const modifyGWU = async (id) => {

        try {
            let token = props.credentials.token;

            let body = {
                gwupdate_id: id,
                title: card.title,
                roles: card.roles,
                infoUpdate: card.infoUpdate,
                img: card.img,
                isActive: card.isActive
            }

            await axios.put('https://heibackend.herokuapp.com/api/modifygwupdate', body, { headers: { 'authorization': 'Bearer ' + token } });

            const newModifyview = (view.modifyView === 'showCard') ? 'hideCard' : 'showCard';
            const newModifyviewP = (view.modifyViewP === 'showCard') ? 'hideCard' : 'showCard';
            setView({ modifyViewP: newModifyviewP, modifyView: newModifyview });

            viewGWUpdates("All");

            setTimeout(() => {
                history.push(`/gwupdate`);
            }, 250);
        } catch (error) {
            console.log(error);
        }
    }

    const showFunc = (id) => {
        buttons.bId = id;
        buttons.show = [];
        buttons.show.push(<div className="row flexEnd">
            <button className="sendButton" onClick={() => deleteGWU(id)}>Delete</button>
            <button className="sendButton" onClick={() => archiveGWU(id)}>Archive</button>
            <button className="sendButton" onClick={() => modifyBack(id)}>Modify</button></div>)
        setShowHide(!showHide)
    }

    if ((props.credentials.user?.isAdmin) && (gwUpdateData.data)) {
        return (
            <div className="viewGWupdate">
                <div className="content">
                    <div className={view.modifyViewP}>
                        <div className="newsCard"><h3>{filterName.filterType} GameWeek Updates</h3>
                            <div className="row">
                                <button className="sendButton" name="allGWu" onClick={() => viewGWUpdates("All")}>All GWU</button>
                                <button className="sendButton" name="isActive" onClick={() => viewGWUpdates("Active")}>Active GWU</button>
                                <button className="sendButton" onClick={() => viewGWUpdates("Archive")}>Archive GWU</button>

                                <input className="searchBox" name="title" onChange={updateSelector}></input>
                                <button className="sendButton" onClick={() => viewGWUpdates("Title")}>GWU's Title</button>
                                <button className="sendButton" onClick={() => goToCreateGwupdate()}> ADD</button>

                            </div>
                        </div>
                        {gwUpdateData.data.map((val, index) => (
                            <div>
                                <div className="gwupdatecards" key={index} onClick={() => showFunc(val.id)}>

                                    <div className="row padd">
                                        <div className="dataBox">{val.title}</div>
                                        <div className="dataBox">{val.roles}</div>
                                        <div className="dataBox"># {val.id}</div>
                                    </div>
                                    <div className="gwInfo">
                                        <div>{val.infoUpdate}</div>
                                    </div>
                                </div>
                                {(showHide && (buttons.bId === val.id)) && (<div className="row">
                                    <div className="flexEnd">{buttons.show}</div>
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={view.modifyView}>
                        Title
                        <input className="teamDataBox" name="title" type="text" onChange={updateCard} defaultValue={modify.title} />
                        Roles
                        <input className="teamDataBox" name="roles" type="text" onChange={updateCard} defaultValue={modify.roles} />
                        Info
                        <textarea className="teamDataBox" name="infoUpdate" type="text" onChange={updateCard} defaultValue={modify.infoUpdate} />
                        Img Link
                        <input className="teamDataBox" name="img" type="text" onChange={updateCard} defaultValue={modify.img} />
                        <br></br>
                        <div className="row">
                            <button className="sendButton" onClick={() => modifyBack()}>BACK</button>
                            <button className="sendButton" onClick={() => modifyGWU(modify.id)}>SAVE</button>

                        </div>
                    </div>
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
                                <div>{val.infoUpdate}</div>
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