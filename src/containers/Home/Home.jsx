
import GWupdate from '../GWupdate/GWupdate';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {

    let history = useHistory();
    
if (props.credentials.user?.name) {
    return (
        <div className="viewHome">
            <GWupdate></GWupdate>
        </div>
    )
} else {

    history.push("login");
    return (
        "Loading Login View"
    )
    
}

} 

export default connect((state) => ({
    credentials: state.credentials
}))(Home);