
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// const Team = (props) => {

//     let history = useHistory();

//     // HOOKS
//     const [teamData, setTeamData] = useState({})
//     const [deleteCard, setDeleteCard] = useState({})
//     const [modify, setModify] = useState({})
//     const [card, setCard] = useState(
//         {
//             date: '',
//             title: '',
//             roles: '',
//             infoUpdate: '',
//             img: ''
//         });

//     const [view, setView] = useState({
//         modifyView: 'modifyCard',
//         modifyViewP: 'profileCard'
//     })

//     const [selector, setSelector] = useState('');


//     // Handler
//     const updateCard = (e) => {
//         setCard({ ...card, [e.target.name]: e.target.value })
//     }

//     const updateSelector = (e) => {
//         setSelector({ ...selector, [e.target.name]: e.target.value })
//     }


//     useEffect(() => {
//         viewTeams("all");
//     }, []);


//     const viewTeams = async (val) => {

//         switch (val) {
//             case "all":
//                 try {
//                     let token = props.credentials?.token;

//                     let res = await axios.get(`http://127.0.0.1:8000/api/allteams`, { headers: { 'authorization': 'Bearer ' + token } });

//                     setTeamData(res.data);

//                 } catch (error) {
//                     console.log(error);
//                 }
//                 break;
//             case "active":
//                 try {
//                     let token = props.credentials?.token;

//                     let res = await axios.get(`http://127.0.0.1:8000/api/activeteam`, { headers: { 'authorization': 'Bearer ' + token } });

//                     setTeamData(res.data);

//                 } catch (error) {
//                     console.log(error);
//                 }
//                 break;

//             case "title":
//                 try {
//                     let token = props.credentials?.token;

//                     let body = {
//                         title: selector.title,
//                     }

//                     let res = await axios.post(`http://127.0.0.1:8000/api/findteam`, body, { headers: { 'authorization': 'Bearer ' + token } });

//                     setTeamData(res.data);

//                 } catch (error) {
//                     console.log(error);
//                 }
//                 break;
//             case "archive":
//                 try {
//                     let token = props.credentials?.token;

//                     let res = await axios.get(`http://127.0.0.1:8000/api/showarchived`, { headers: { 'authorization': 'Bearer ' + token } });

//                     setTeamData(res.data);

//                 } catch (error) {
//                     console.log(error);
//                 }
//                 break;
//         }
//     }

//     const deleteGWU = async (id) => {
//         try {
//             let token = props.credentials?.token;

//             let body = {
//                 id: id,
//             }

//             let res = await axios.delete(`http://127.0.0.1:8000/api/deleteteam`, body, { headers: { 'authorization': 'Bearer ' + token } });

//             viewTeams("active");
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const modifyBack = async (id) => {

//         if (id) {
//             try {

//                 let body = {
//                     team_id: id
//                 }
//                 let token = props.credentials?.token;

//                 let res = await axios.post(`http://127.0.0.1:8000/api/chooseteam`, body, { headers: { 'authorization': 'Bearer ' + token } });
//                 setModify(res.data.data);

//             } catch (error) {
//                 console.log(error);
//             }
//         }


//         // Switch view implemented

//         (view.modifyView === 'profileCard') ? view.modifyView = 'modifyCard' : view.modifyView = 'profileCard';

//         (view.modifyViewP === 'profileCard') ? view.modifyViewP = 'modifyCard' : view.modifyViewP = 'profileCard';

//         viewTeams();

//     }

//     const modifyCard = async (id) => {

//         try {
//             let token = props.credentials.token;

//             let body = {
//                 team_id: id,
//                 isFD: card.isFD,
//                 isUCL: card.isUCL,
//                 isUEL: card.isUEL,
//                 isSSC: card.iSSC,
//                 isCDR: card.isCDR,
//                 stadium_id
//             }

//             let res = await axios.put('http://127.0.0.1:8000/api/modifyteam', body, { headers: { 'authorization': 'Bearer ' + token } });

//             viewTeams();

//             setTimeout(() => {
//                 history.push(`/team`);
//             }, 250);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     if ((props.credentials.user?.isAdmin == true) && (teamData.data)) {
//         return (
//             <div className="viewTeam">
//                 <div className="content">
//                     <div className={view.modifyViewP}>
//                         <div className="newsCard">Last GameWeek Updates
//                             <div className="row">
//                                 Filter:
//                                 <button className="sendButton" name="isFD" onClick={()=>viewTeams("active")}>First Division</button>
//                                 <button className="sendButton" onClick={()=>viewTeams("isUEL")}>isUEL</button>

//                                 <button className="sendButton" onClick={()=>viewTeams("isUCL")}>isUCL</button>
//                                 <input className="gwuData" name="name" onChange={updateSelector}></input>
//                                 <button className="sendButton" onClick={()=>viewGWUpdates("title")}>By Name</button>

//                             </div>
//                         </div>
//                         {teamData.data.map((val, index) => (
//                             <div className="teamcards" key={index}>
//                                 <div className="bbottom row">
//                                     <div>{val.title}</div>
//                                     <div>{val.roles}</div>
//                                     <div>{val.id}</div>
//                                 </div>
//                                 <div className="gwInfo">
//                                     <div className="row">
//                                         <div>{val.infoUpdate}</div>
//                                         <button className="sendButton" onClick={() => deleteGWU(val.id)}>Delete</button>
//                                         <button className="sendButton" onClick={() => archiveGWU(val.id)}>Archive</button>
//                                         <button className="sendButton" onClick={() => modifyBack(val.id)}>Modify</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className={view.modifyView}>
//                         <input className="gwuData" name="title" type="text" onChange={updateCard} defaultValue={modify.title} />

//                         <input className="gwuData" name="roles" type="text" onChange={updateCard} defaultValue={modify.roles} />

//                         <textarea className="gwuData" name="infoUpdate" type="text" onChange={updateCard} defaultValue={modify.infoUpdate} />

//                         <input className="gwuData" name="img" type="text" onChange={updateCard} defaultValue={modify.img} />
//                         <br></br>
//                         <div className="buttons">
//                             <button className="sendButton" onClick={()=>modifyBack}>BACK</button>
//                             <button className="sendButton" onClick={() => modifyCard(modify.id)}>SAVE</button>

//                         </div>
//                     </div>
//                 </div>


//             </div>

//         )

//     } else if (teamData.data) {

//         return (
//             <div className="viewTeam">
//                 <div className="content">
//                     <div className="newsCard">List of the clubs</div>
//                     {teamData.data.map((val, index) => (
//                         <div className="teamcards" key={index}>
//                             <div className="row">
//                                 <div>{val.title}</div>
//                                 <div>{val.roles}</div>
//                                 <div>{val.id}</div>

//                             </div>
//                             <div className="gwInfo">

//                                 <div>{val.infoUpdate}</div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         )
//     } else {
//         return "Loading";
//     }
// }

// export default connect((state) => ({
//     credentials: state.credentials
// }))(Team);