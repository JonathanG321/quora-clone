import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import {
  HomePage,
  NotFoundPage,
  SignInPage,
  QuestionsShowPage,
  TagsShowPage,
  TopicsShowPage,
} from './pages';
// import AuthRoute from './common/AuthRoute';
import Loading from '../components/common/Loading';
import { User } from '../requests/user';
import './styles.scss';

const initialState = { user: null };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      loading: true,
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
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
          <NavBar onSignOut={this.signOut} user={user} />
          <div className="container-fluid pr-0 pl-0 max-height max-width">
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/sign-in">
                <SignInPage onSignIn={this.signIn} />
              </Route>
              <Route path="/questions/:id">
                <QuestionsShowPage />
              </Route>
              <Route path="/tags/:id">
                <TagsShowPage />
              </Route>
              <Route path="/topic/:id">
                <TopicsShowPage />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
