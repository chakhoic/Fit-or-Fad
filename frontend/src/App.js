import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPageIndex from './components/MainPage/MainPageIndex';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import CurrentUserProfile from './components/Profile/CurrentUserProfile';
import UserProfile from './components/Profile/UserProfile';
import { getCurrentUser } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPageIndex} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/profile" component={CurrentUserProfile} />
        <Route exact path="/profile/:userId" component={UserProfile} />
      </Switch>
    </>
  );
}

export default App;