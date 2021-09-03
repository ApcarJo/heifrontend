
// import React, { useState } from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// const TeamCreate = (props) => {

//     let history = useHistory();


//     // Hook
//     const [team, setTeam] = useState({})


//     // Handler
//     const updateCard = (e) => {
//         setCard({ ...card, [e.target.name]: e.target.value })
//     }

//     const createCard = async () => {
//         // e.preventDefault();

//         try {
//             let token = props.credentials.token;

//             let body = {
//                 date: "2021-09-21",
//                 title: card.title,
//                 roles: card.roles,
//                 infoUpdate: card.infoUpdate,
//                 img: card.img,
//                 isActive: card.isActive
//             }

//             await axios.post('http://127.0.0.1:8000/api/creategwupdate', body, { headers: { 'authorization': 'Bearer ' + token } });

//             setTimeout(() => {
//                 history.push(`/gwupdate`);
//             }, 250);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="createGwuView">
//             <div className="content">
//                 <div className="profileCard">
//                     <input className="gwuData" name="title" type="text" onChange={updateCard} placeholder="Title" required />

//                     <input className="gwuData" name="roles" type="text" onChange={updateCard} placeholder="Roles" />

//                     <textarea className="gwuData" name="infoUpdate" type="text" onChange={updateCard} placeholder="Info" required />

//                     <input className="gwuData" name="img" type="text" onChange={updateCard} placeholder="Img link" required />
//                     <br></br>
//                     <button className="sendButton" onClick={() => createCard()}>Create GWU</button>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default connect((state) => ({
//     credentials: state.credentials
// }))(TeamCreate);