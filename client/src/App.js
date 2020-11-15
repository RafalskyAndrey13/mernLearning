import 'materialize-css';
import {useRoutes} from './routes';
import {BrowserRouter} from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

const App = () => {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready){
    return <Loader/>
  }

  return <AuthContext.Provider value={{
    token, login, logout, userId, isAuthenticated
  }}>
      <BrowserRouter>
      <div>
        {isAuthenticated && <Navbar/>}
        <div className="container">      
          {routes}
        </div>
      </div>
      </BrowserRouter>
    </AuthContext.Provider>
}

export default App;
