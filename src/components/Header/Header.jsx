import React from 'react';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import { useHistory } from 'react-router-dom';


const Header = (props) => {

    let history = useHistory();

    console.log(props.credentials)

    const logOut = () => {

        props.dispatch({ type: LOGOUT });
        history.push("/")
    }

    if (props.credentials?.user) {

        return (
            <div className="headerView">

                <div className="headerLinks">
                    <Button path="/" destination="HOME" />
                    <Button path="/profile" destination="PROFILE" />
                    <Button path="/calendar" destination="CALENDAR" />

                </div>

                <div className="headerUser">
                    <Button path="/profile" destination={props.credentials?.user.name} />
                    <p>|</p>
                    <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
                </div>

            </div>



        )
    } else {


        return (
            <div className="headerView">

                <div className="headerLinks">
                    <Button path="/" destination="HOME" />
                    <Button path="/contact" destination="CONTACT" />

                </div>

                <div className="headerUser">
                    <Button path="/login" destination="LOGIN" />
                    <p>|</p>
                    <Button path="/register" destination="REGISTER" />
                </div>
            </div>
        )

    }

}

export default connect((state) => ({

    credentials: state.credentials

}))(Header);