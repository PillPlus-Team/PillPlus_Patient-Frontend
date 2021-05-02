import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { LoginPage, HomePage, PillStorePage, ReceiptPage} from './pages'
import UserContext from './pages/components/UserContext'

const App = () => {
  //----------check path------------
  const location = useLocation()
  const isHomePath = location.pathname === "/home"
  const isPillStorePath  = location.pathname === "/pillstore"

  // this is global state that use useContext to pass all value to it's destination
  const [user, setUser] = useState({})  
  const [pillList, setPillList] = useState([])
  const [selectedPillStore, setSelectedPillStore] = useState({})
  const [isAuth, setIsAuth] = useState(false)  // Authentication mockup
  const [center, setCenter] = useState({"lat": 15.039960, "lng": 100.178123}) // default lat,lng
  const [isSelect, setIsSelect] = useState(false)
  const [pillStoreList, setPillStoreList] = useState([])
  const [render, setRender] = useState(false)

  const API_KEY = process.env.REACT_APP_SERVER_URL
  const API_AUTH = process.env.REACT_APP_AUTH_RECEIPT
  const API_UPDATE = process.env.REACT_APP_UPDATE_RECEIPT
  const API_PILLSTORES = process.env.REACT_APP_GET_PILLSTORES

  // aware of unnecessary change
  const passValue = useMemo(() => ({user, setUser, pillList, setPillList, selectedPillStore, setSelectedPillStore, isAuth, setIsAuth, center, setCenter, isSelect, setIsSelect, API_KEY, API_AUTH, API_UPDATE, API_PILLSTORES, pillStoreList, setPillStoreList, render, setRender}), 
                                  [user, setUser, pillList, setPillList,selectedPillStore, setSelectedPillStore, isAuth, setIsAuth, center, setCenter, isSelect, setIsSelect, API_KEY, API_AUTH, API_UPDATE, API_PILLSTORES, pillStoreList, setPillStoreList, render, setRender]) //( (valueHere), [if here has changed.. it gonna change valueHere])

  // Refresh page (At first time of press Refreshing in anypage or run the first time when login)
  useEffect(() => {

    const fetchUser = async (nationalId, serialNumber) => {
        const res = await fetch(API_KEY + API_AUTH, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identificationNumber: nationalId,
                _id: serialNumber,
            }),
        });
    
        if (res.status === 200){
            const data = await res.json()
            setUser(data)
            setPillList(data.pills)
            setSelectedPillStore(data.pillStore)
            setCenter(data.pillStore.coordinate)
    
            setIsAuth(true)
            console.log(data)
            console.log("Refreshing Page...")
            if (!(isHomePath || isPillStorePath)){
              setRender(true)
            }
            return data.prescriptionID // if error delete this line
        } else {
            console.log("ERROR:" + res.status + " Refreshing Page...")
            //history.push('/home') // THIS IS BY PASS : PROCEED WITH CAUTION
        }
    }
  
     // get locations data
    const fetchLocations = async (prescriptionID) => {
        const res = await fetch(API_KEY + API_PILLSTORES + prescriptionID, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (res.status === 200){
            const data = await res.json()
            setPillStoreList(data)
            setRender(true)
            //console.log({PillStores : data})
        }else{
            console.log("ERROR:" + res.status + " Cannot get Avaliable pillStores")
        }
    
    } 

    var localNationalId = localStorage.getItem("nationalId")
    var localSerialNumber = localStorage.getItem("serialNumber")

    setRender(false)  // always set to default false

    if (localNationalId !== null && localSerialNumber !== null) {
      localNationalId = JSON.parse(localNationalId)
      localSerialNumber = JSON.parse(localSerialNumber)
      
      //Debug
      console.log("localNationalId is "+  localNationalId)
      console.log("localSerialNumber is "+ localSerialNumber)
      console.log({ identificationNumber: localNationalId, _id: localSerialNumber });
      let x = fetchUser(localNationalId, localSerialNumber)
      
      if (isHomePath || isPillStorePath){
        fetchLocations(x) // if error use user.prescriptionID instead of x
      }
    }
    else{
      console.log("Not Found localStorage")
    }

  },[API_AUTH, API_KEY, API_PILLSTORES, isHomePath, isPillStorePath])
  


  //get patient receipts user profile data  // NEED TO DELETE THIS SOON ... 
  //   useEffect(() => {
  //     const fetchUser = async (id) => {
  //         const res = await fetch(`http://localhost:5500/receipts/${id}`)
  //         const data = await res.json()

  //         setUser(data)
  //         setPillList(data.pills)
  //         setSelectedPillStore(data.pillStore)
  //         setCenter(data.pillStore.coordinate)
  //     }

  //     fetchUser("1101402227500") // set manually from mockup

  // },[])

  return (
    
      <UserContext.Provider value={passValue}>
      {/* 
      {isAuth?       
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
            <Route exact path="/receipt" component={ReceiptPage} />
            <Redirect to="/login"/>

        </Switch>

      </UserContext.Provider>
    
  );
};

//<div className="flex w-full h-screen justify-center items-center text-6xl font-bold">PillPlus+ [Patient]</div>

export default App;
