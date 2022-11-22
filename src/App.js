import { Route, Routes } from 'react-router-dom';

import SignInPage from './pages/signInPage/SignInPage';
import SignUpPage from './pages/signUpPage/SignUpPage';
import GamePage from './pages/gamePage/GamePage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';

import './App.scss';
import { useSelector } from 'react-redux';

function App() {
  const routes = useSelector((state) => state.routes.value)
  return (
    <div className="App">
      <Routes>
          <Route 
            exact path={routes.Main.path} 
            element={ <SignInPage/> }
          />
          <Route 
            exact path={routes.Login.path} 
            element={ <SignInPage/> }
          />
          <Route 
            exact path={routes.Registration.path} 
            element={ <SignUpPage/> }
          />
          <Route 
            exact path={routes.Game.path} 
            element={ <GamePage/> }
          />
          <Route 
            exact path={routes.NotFound.path} 
            element={ <NotFoundPage/> }
          />
      </Routes>
    </div>
  );
}

export default App;
