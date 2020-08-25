import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import { HomePage, NotFoundPage } from './pages';
import AuthRoute from './common/AuthRoute';
import Loading from './components/common/Loading';
import { User } from '../requests/user';

const initialState = { user: null, loading: true };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    this.signIn();
  }
  signIn() {
    User.getCurrentUser().then((user) => {
      if (user.id) {
        this.setState({ user, loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  signOut() {
    this.setState(initialState);
  }
  render() {
    const { user, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
