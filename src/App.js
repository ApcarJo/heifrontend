
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Calendar from './components/Calendar/Calendar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './containers/Home/Home';
import Profile from './containers/Profile/Profile';
import Register from './containers/Register/Register';
import Schedule from './containers/Schedule/Schedule';
import Login from './containers/Login/Login';
import Datepicker from './components/Datepicker/Datepicker';
import GWupdate from './containers/GWupdate/GWupdate';
import GWupdateCreate from './containers/GWupdate/GWupdateCreate';
import Asset from './containers/Asset/Asset';
import AssetView from './containers/Asset/AssetView';
import AllProfiles from './containers/AllProfiles/AllProfiles';
import Team from './containers/Team/Team';
import TeamCreate from './containers/Team/TeamCreate';
import Stadium from './containers/Stadium/Stadium';
import StadiumCreate from './containers/Stadium/StadiumCreate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header />

        <Switch>

          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/register" exact component={Register} />
          <Route path="/datepicker" exact component={Datepicker} />
          <Route path="/calendar" exact component={Calendar} />
          <Route path="/header" exact component={Header} />
          <Route path="/schedule" exact component={Schedule} />
          <Route path="/gwupdate" exact component={GWupdate} />
          <Route path="/gwupdatecreate" exact component={GWupdateCreate} />
          <Route path="/asset" exact component={Asset} />
          <Route path="/assetview" exact component={AssetView} />
          <Route path="/allprofiles" exact component={AllProfiles} />
          <Route path="/stadiums" exact component={Stadium} />
          <Route path="/stadiumCreate" exact component={StadiumCreate} />
          <Route path="/team" exact component={Team} />
          <Route path="/teamcreate" exact component={TeamCreate} />


        </Switch>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
