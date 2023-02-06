import {useRoutes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {BsFillPersonFill,BsBoxArrowLeft} from "react-icons/bs";
import "./css/App.css";
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
  

  const words = [
    "árbol", "animal", "avisan","amarillo","amistad","antena",
    "brazo", "bicicleta", "burro","birra","brutal","bestias",
    "cazo", "creían", "chorizo", "crecer","cavernas","campo",
    "días", "duende","dinámico","dócil","dios","dudas",
    "enredar","empatía","enfrentó","entretener","ética",
    "fallecer", "familiares","favorito", "fuente","fantástico",
    "grande","gritos","grulla", "gazpacho","gamba",
    "habían","hombro", "hebras", "hambre","híbrido",
    "ignorante","ímpetu", "independencia", "idea", "inferior",
    "jabalí","jalapeño","jugadores", "jamón","justa", "jugado", "japón",
    "kilómetro","karaoke", "kétchup", 
    "limonada","linterna","luciérnaga", "láser","lista",
    "madre","muertos","mirar", "música","mentira",
    "navidad","nogal","noche", "noche", "nietos",
    "ñu","ñora",
    "ópera","ocioso","ombligo",
    "pirámide","palabras","puerro",
    "queso","quieres","quebrar",
    "rata","rompieron","retrasarse",
    "sátira","sobrio","separar",
    "trueque","trampas","tirar",
    "uva","única","unidad",
    "viento","verde","valioso","vida","vivo",
    "web",
    "xilófono",
    "yema","yo","yendo",
    "zapato","zumo","zote"
  ]
  /* let [previousWord, setPreviousWord] = useState(""); */
  let [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  let [nextWord, setNextWord] = useState(words[Math.floor(Math.random() * words.length)])
  let [userInput, setUserInput] = useState("");
  let [correct, setCorrect] = useState(0);
  let [incorrect, setIncorrect] = useState(0);
  let [score, setScore] = useState(0);
  let [key, setKey] = useState("");

  const keyChange = event =>{
    setKey(event.key);
  }
  const compare = event => {
    setUserInput(event.target.value);
    if(key === " "){
      if (event.target.value.slice(0, event.target.value.length -1) === word) {
        setCorrect(correct +1);
        /* setPreviousWord(word); */
        setWord(nextWord);
        setNextWord(words[Math.floor(Math.random() * words.length)])
        setUserInput('');
      }else{
        setIncorrect(incorrect +1);
        setWord(nextWord);
        setNextWord(words[Math.floor(Math.random() * words.length)])
        setUserInput('');
      }
    }
    
  };
  const logOut = ()=>{
    localStorage.removeItem("nombre");
    navigate("/login");
  }
  let user = localStorage.getItem("nombre") ?<><button>{localStorage.getItem("nombre")} <BsFillPersonFill/> </button><a href='/login'>Log out <BsBoxArrowLeft/></a></>: <button onClick={logOut}>Login</button>;
  
  return (
    <div className="App">
      <header className="App-header">
         <h1>Mecanografía</h1>
        <div>
          {user}          
        </div>
      </header>
      <main>
        <div>
          <div>
            {/* <h3>{previousWord}</h3> */}
            <h1>{word}</h1>
            <h3>{nextWord}</h3>
          </div>
          <input type="text" value={userInput} onKeyDown={keyChange} onChange={compare}/>
          <p>Bien: {correct} Mal: {incorrect}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
