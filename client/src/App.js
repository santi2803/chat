import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/Index/Index';
import Chats from './pages/Chat/Chats/Chats';
import Chat from './components/Chat/Chat';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/chats" component={Chats} />
          <Route exact path="/chats/:chat" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
