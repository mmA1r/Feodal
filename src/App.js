import { Route, Routes, useNavigate } from 'react-router-dom';

import store from './store/store';
import SignInPage from './pages/login/signInPage/SignInPage';
import SignUpPage from './pages/login/signUpPage/SignUpPage';
import GamePage from './pages/gamePage/GamePage';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';

import './App.scss';

function App() {
  const navigate = useNavigate();
  const routes = store.getState().routes.value;
  return (
    <div className="App">
      <Routes>
          <Route 
            exact path={routes.Main.path} 
            element={ <SignInPage navigate={navigate}/> }
          />
          <Route 
            exact path={routes.Login.path} 
            element={ <SignInPage navigate={navigate}/> }
          />
          <Route 
            exact path={routes.Registration.path} 
            element={ <SignUpPage navigate={navigate}/> }
          />
          <Route 
            exact path={routes.Game.path} 
            element={ <GamePage navigate={navigate}/> }
          />
          <Route 
            exact path={routes.NotFound.path} 
            element={ <NotFoundPage navigate={navigate}/> }
          />
      </Routes>
    </div>
  );
}

export default App;
