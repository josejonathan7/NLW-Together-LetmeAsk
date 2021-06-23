
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

function App() {
  return (
    <BrowserRouter>
      
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} ></Route>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
