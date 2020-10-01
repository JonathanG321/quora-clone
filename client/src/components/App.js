import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import {
  HomePage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
  QuestionsShowPage,
  TagsShowPage,
  TopicsShowPage,
  SpacesPage,
  TopicsPage,
  AddQuestionPage,
  SpacesShowPage,
} from './pages';
import AuthRoute from './common/AuthRoute';
import Loading from '../components/common/Loading';
import { User } from '../requests/user';
import AnswersPage from './pages/AnswersPage';
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
              <AuthRoute isSignedIn={!!user} exact path="/">
                <HomePage />
              </AuthRoute>
              <AuthRoute isSignedIn={!!user} exact path="/answers">
                <AnswersPage />
              </AuthRoute>
              <AuthRoute isSignedIn={!!user} exact path="/spaces">
                <SpacesPage />
              </AuthRoute>
              <AuthRoute isSignedIn={!!user} exact path="/topics">
                <TopicsPage />
              </AuthRoute>
              <AuthRoute isSignedIn={!!user} exact path="/add-question">
                <AddQuestionPage />
              </AuthRoute>
              <Route exact path="/sign-in">
                <SignInPage onSignIn={this.signIn} />
              </Route>
              <Route exact path="/sign-up">
                <SignUpPage onSignUp={this.signIn} />
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
              <Route path="/space/:id">
                <SpacesShowPage />
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
