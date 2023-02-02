import './css/App.css';
import {useRoutes} from 'react-router-dom';
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
  return (
    <div className="App">
      <header className="App-header">
         <h1>Álvaro</h1>
         <a href="/login">Login</a>
      </header>
      
    </div>
  );
}

export default App;
