
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
import GWupdate from './components/GWupdate/GWupdate';
import GWupdateCreate from './components/GWupdate/GWupdateCreate';

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


        </Switch>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
