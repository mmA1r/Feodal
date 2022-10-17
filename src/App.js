import { Route, Routes, useNavigate } from 'react-router-dom';

import ROUTES from './components/routes/routes';
import SignIn from './components/login/signIn/SignIn';
import SignUp from './components/login/signUp/SignUp';
import Game from './components/game/Game';
import NotFoundPage from './components/routes/notFoundPage/NotFoundPage';

import './App.scss';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
          <Route exact path={ROUTES.Main.path} element={<SignIn ROUTES={ROUTES} navigate={navigate}/>}/>
          <Route exact path={ROUTES.Login.path} element={<SignIn ROUTES={ROUTES} navigate={navigate}/>}/>
          <Route exact path={ROUTES.Registration.path} element={<SignUp ROUTES={ROUTES} navigate={navigate}/>}/>
          <Route exact path={ROUTES.Game.path} element={<Game ROUTES={ROUTES} navigate={navigate}/>}/>
          <Route exact path={ROUTES.NotFound.path} element={<NotFoundPage ROUTES={ROUTES} navigate={navigate}/>}/>
      </Routes>
    </div>
  );
}

export default App;
