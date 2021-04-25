import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { LoginPage, HomePage, PillStorePage, PillPage} from './pages'

const App = () => {


  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/pillstore" component={PillStorePage} />
        <Route exact path="/pill" component={PillPage} />


        <Redirect to="/login" />
      </Switch>
    </Router>
      
  
    
  
 
  );
};

//<div className="flex w-full h-screen justify-center items-center text-6xl font-bold">PillPlus+ [Patient]</div>

export default App;
