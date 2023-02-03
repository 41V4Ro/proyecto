import './css/App.css';
import {useRoutes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
function App() {
  let routes = useRoutes([
    {path:'/', element: <Home />},
    {path:'/login', element: <Login />},
    {path:'/register', element: <Register />}
  ])
  return routes;  
}
function Home(){
  let navigate = useNavigate();

  const logOut = ()=>{
    localStorage.removeItem("nombre");
    navigate("login");
  }
  let user = localStorage.getItem("nombre") ? <> <p>{localStorage.getItem("nombre")}</p> <p onClick={logOut}>Salir</p> </>: <a href='/login'>Login</a>
  
  return (
    <div className="App">
      <header className="App-header">
         <h1>Mecanografía</h1>
          {user}
        
      </header>
      
    </div>
  );
}

export default App;
