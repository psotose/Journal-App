import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hook useEffect para persistir el estado de autenticación
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      
      if (user?.uid) {
        dispatch( login(user.uid, user.displayName) );
        setIsLoggedIn( true );
      } else {
        setIsLoggedIn( false );
      }
      //aqui esperamos la respuesta de firebase para saber si ya tenemos un uid o no
      setChecking(false);

    });
  }, [ dispatch, setChecking, setIsLoggedIn ])

  if ( checking ) {
    return(
      <h1>Espere...</h1>
    )
  }
  return (
    <Router>
      
          <Switch>
            <PublicRoute 
              path="/auth" 
              component={ AuthRouter }
              isAuthenticated={ isLoggedIn }
            />

            <PrivateRoute 
              exact
              isAuthenticated={ isLoggedIn }
              path="/" 
              component={ JournalScreen } 
            />

            <Redirect to="/auth/login" />
          </Switch>
        
    </Router>
  )
}
