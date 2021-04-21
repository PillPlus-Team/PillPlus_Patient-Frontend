import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
<<<<<<< HEAD
import { LoginPage, HomePage, LocationPage, MapPage} from './pages'
=======
import { LoginPage, HomePage, LocationPage, PillPage} from './pages'
>>>>>>> a9d0ad58e572187b4bf4a49c7ed29115cc59f055


const App = () => {


  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/location" component={LocationPage} />
<<<<<<< HEAD
        <Route exact path="/map" component={MapPage} />

        
        {/* others routes*/}
=======
        <Route exact path="/pill" component={PillPage} />
>>>>>>> a9d0ad58e572187b4bf4a49c7ed29115cc59f055


        <Redirect to="/login" />
      </Switch>
    </Router>
      
  
    
  
 
  );
};

//<div className="flex w-full h-screen justify-center items-center text-6xl font-bold">PillPlus+ [Patient]</div>

export default App;
