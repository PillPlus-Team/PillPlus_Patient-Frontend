import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { LoginPage, HomePage, PillStorePage, PillPage} from './pages'
import UserContext from './pages/components/UserContext'

const App = () => {

  // this is global state that use useContext to pass all value to it's destination
  const [user, setUser] = useState({})  
  const [pillList, setPillList] = useState([])
  const [selectedPillStore, setSelectedPillStore] = useState({})
  const [isAuth, setIsAuth] = useState(false)  // Authentication mockup
  const [center, setCenter] = useState({"lat": 15.039960,
    "lng": 100.178123})
  const [isSelect, setIsSelect] = useState(false)

  // aware of unnecessary change
  const passValue = useMemo(() => ({user, setUser, pillList, setPillList, selectedPillStore, setSelectedPillStore, isAuth, setIsAuth, center, setCenter, isSelect, setIsSelect}), 
                                  [user, setUser, pillList, setPillList,selectedPillStore, setSelectedPillStore, isAuth, setIsAuth, center, setCenter, isSelect, setIsSelect]) //( (valueHere), [if here has changed.. it gonna change valueHere])

  //get patient receipts user profile data 
    useEffect(() => {
      const fetchUser = async (id) => {
          const res = await fetch(`http://localhost:5500/receipts/${id}`)
          const data = await res.json()

          setUser(data)
          setPillList(data.pills)
          setSelectedPillStore(data.pillStore)
          setCenter(data.pillStore.coordinate)
      }

      fetchUser("1101402227500") // set manually from mockup

  },[])

  return (
    
    <Router>
      <UserContext.Provider value={passValue}>
      {/* 
      {user?       
        <Switch>
        {/* pass in user and setUser to all pages * /}
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/pillstore" component={PillStorePage} />
          <Route exact path="/pill" component={PillPage} />
          <Redirect to="/home" />
        </Switch>
      : 
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      }
      */}
        <Switch>
          
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/pillstore" component={PillStorePage} />
            <Route exact path="/pill" component={PillPage} />
            <Redirect to="/login"/>

        </Switch>

      </UserContext.Provider>
    </Router>
    
  );
};

//<div className="flex w-full h-screen justify-center items-center text-6xl font-bold">PillPlus+ [Patient]</div>

export default App;
