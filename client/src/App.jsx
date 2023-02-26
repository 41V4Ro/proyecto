import {useRoutes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {BsFillPersonFill,BsBoxArrowLeft,BsFillCaretRightSquareFill} from "react-icons/bs";
import "./css/App.css";
import Axios from "axios";

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
  let [stats,setStats] = useState([]);
  
  const recibirDatos = ()=>{
    Axios.get("http://localhost:3001/stats").then(response=>{
        setStats(response.data)
    })
  }
  useEffect(()=>{        
    recibirDatos();

  },[])

  let [words, setWords] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [wordsEng, setWordsEng] = useState([]);
  
  let [lenguage,setLenguage] = useState("Español")
  const changeLenguage = event =>{
    setLenguage(event.target.value);
  }
  const randomWord = () => {
    if(lenguage === "Español"){
      return words[Math.floor(Math.random() * words.length)];
    }else{
      return wordsEng[Math.floor(Math.random() * wordsEng.length)];
    }
  }
  useEffect(()=>{
    fetch("/json/wordsEsp.json")
    .then(response=>response.json())
    .then(response=>{
      setWords(response);
      setLoading(false);
    });
    fetch("/json/wordsEng.json")
    .then(response=>response.json())
    .then(response=>{
      setWordsEng(response);
    });
  },[])
  
  let [word, setWord] = useState(randomWord());
  let [nextWord, setNextWord] = useState(randomWord())
  let [userInput, setUserInput] = useState("Pulse iniciar");
  let [correct, setCorrect] = useState(0);
  let [incorrect, setIncorrect] = useState(0);
  let [score, setScore] = useState(0);
  let [key, setKey] = useState("");
  useEffect(() => {
    if (!loading) {
      setWord(randomWord())
      setNextWord(randomWord())
    }
  }, [words, loading]);
  const keyChange = event =>{ 
    setKey(event.key);
  }

  const endGame = ()=>{
    const token = sessionStorage.getItem("token");
    if(token){
      Axios.post("http://localhost:3001/updatestats",{
        username:sessionStorage.getItem("nombre"),
        score: correct - incorrect
      },{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      .then(recibirDatos)
    }else{
      console.log("Inicie sesión para guardar sus resultados.")
    }
  }
  
  let [time, setTime] = useState(60); 
  let [timer,setTimer] = useState(0);
  
  useEffect(()=>{
    if(time<1){
      endGame()
    }
  },[time])

  const startGame = () =>{    
    const input = document.querySelector("input"); 
    input.disabled = false;
    input.focus();
    restartGame();

    setTimer(timer=>{
      clearInterval(timer);
      timer = setInterval(()=>{
        setTime(time=>{
          if(time <1){
            input.disabled = true;
            clearInterval(timer);
            return time;
          }else{
            return time -1;
          }
        });      
      },1000)
      return timer;
    })
  }
  const restartGame = ()=>{
    setUserInput("");
    setTime(60);
    setCorrect(0);
    setIncorrect(0);
    setWord(randomWord());
    setNextWord(randomWord());
  }
 
  const compare = event => {
    setUserInput(event.target.value);
    if(key === " "){
      if (event.target.value.slice(0, event.target.value.length -1) === word) {
        setCorrect(correct +1);
        setWord(nextWord);
        setNextWord(randomWord());
        setUserInput('');
      }else{
        setIncorrect(incorrect +1);
        setWord(nextWord);
        setNextWord(randomWord());
        setUserInput('');
      }
    }    
  };

  const logOut = ()=>{
    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("token");
    navigate("/login");
  }
  let user = sessionStorage.getItem("token") ?<><button>{sessionStorage.getItem("nombre")} <BsFillPersonFill/> </button><button onClick={logOut}>Salir <BsBoxArrowLeft/></button></>: <a href='/login' >Login</a>;
  
  return (
    <div className="App">
      <header className="App-header row d-flex ">
         <h1 className='col d-block ms-md-5'>TypingASDF</h1>
         <div className='col d-flex justify-content-end me-md-5'>
          {user} 
         </div>
      </header>
      <main >
        <div className="row m-1 m-sm-5">          
          <div className="col-12 col-md-8">
            <select onChange={changeLenguage} className="mt-5">
              <option value="Español">Español</option>
              <option value="English">English</option>
            </select>Tiempo: {time} 

            <div className='row  p-2'>
              <div className='col-12 col-sm-9  p-2 palabras'>
              <h1 className='me-3 palabra'>{word}</h1>
              <h3>{nextWord}</h3>
              </div>
            </div>
                  
            <div className='row p-2'>
              <input className='col-7 col-sm-5'  disabled type="text" value={userInput} onKeyDown={keyChange} onChange={compare} />
              <button className='col-5 col-sm-4' onClick={startGame}>Iniciar<BsFillCaretRightSquareFill className='ms-2'/> </button>  

            </div>
          </div>
          <div className="col-9 col-md-4 mt-5 puntuacion">
            <div className="row puntuacionT">
              <h3>Puntuación</h3>
            </div>
            <div className="row">
              <p>Correctas: {correct}</p>
              <p>Incorrectas: {incorrect}</p>
            </div>
            
            <div className="stats">
              <h3 className=''>Ranking</h3>
              <table className='table'>

                  <thead>
                      <tr >
                          <th>#</th>
                          <th>Usuario</th>
                          <th>Record</th>
                      </tr>
                  </thead>
                  <tbody>
                    {stats.map((x, index) => (
                      <tr  key={x.username}>
                        <td>{index+1}</td>
                        <td>{x.username}</td>
                        <td>{x.bestscore}</td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
            </div>
          </div>
        
        
      </main>
    </div>
  );
}

export default App;
