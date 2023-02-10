import {useRoutes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {BsFillPersonFill,BsBoxArrowLeft} from "react-icons/bs";
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
  

  const words = [
    "árbol", "animal", "avisan","amarillo","amistad","antena", "asno", "altura", "arte","arrojar","asistir","archivo","atacar",
    "brazo", "bicicleta", "burro","birra","brutal","bestias","bocina","borde","belleza","blando","binario","beber","bebé",
    "cazo", "creían", "chorizo", "crecer","cavernas","campo","crema","cuerpo","clase","cima","cortar", "cristiano",
    "días", "duende","dinámico","dócil","dios","dudas", "diario","débil","diablo","dinamita","dedo","dentadura","Dinamarca",
    "enredar","empatía","enfrentó","entretener","ética","elefante", "Etiopía","ese","ellas","emprender",
    "fallecer", "familiares","favorito", "fuente","fantástico", "freno","fábula","Finlandia","feo",
    "grande","gritos","grulla", "gazpacho","gamba", "ganso","girar","gato","guía","gracias",
    "habían","hombro", "hebras", "hambre","híbrido", "hace","hábitos","Honduras","hospital","haber",
    "ignorante","ímpetu", "independencia", "idea", "inferior","intento","interno","iterar","insignia",
    "jabalí","jalapeño","jugadores", "jamón","justa", "jugado", "juez","Japón",
    "kilómetro","karaoke", "kétchup", 
    "limonada","linterna","luciérnaga", "láser","lista","lluvia","lápiz","libro","luna","leer","lagarto","lámpara","lujoso",
    "madre","muertos","mirar", "música","mentira","marisco","mueble","manzana","misterio","magia",
    "navidad","nogal","noche", "noche", "nietos","naranja","nación","nido","nuevo","nacimiento",
    "ñu","ñora",
    "ópera","ocioso","ombligo","ojo","otoño","oeste","oportunidad","orden",
    "pirámide","palabras","puerro", "pájaro","papel","paz","página","planeta","pulgar","playa","pelea",
    "queso","quieres","quebrar", "quinto","qué",
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
  
  const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
  }

  let [word, setWord] = useState(randomWord());
  let [nextWord, setNextWord] = useState(randomWord())
  let [userInput, setUserInput] = useState("");
  let [correct, setCorrect] = useState(0);
  let [incorrect, setIncorrect] = useState(0);
  let [score, setScore] = useState(0);
  let [key, setKey] = useState("");

  const keyChange = event =>{ 
    setKey(event.key);
  }
  

  const endGame = ()=>{
    Axios.post("http://localhost:3001/updatestats",{
      username:localStorage.getItem("nombre"),
      score: correct - incorrect
    })
  }
  
  let [time, setTime] = useState(60); 
  let timer = undefined;
  useEffect(()=>{
    if(time<1){
      endGame();
    }
  },[time])

  const startGame = () =>{    
  const input = document.querySelector("input"); 
    input.disabled = false;
    input.focus();
    
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
  }
  const restartGame = ()=>{
    setUserInput("");
    setTime(60);
    setCorrect(0);
    setIncorrect(0);
    setWord(randomWord());
    setNextWord(randomWord());
    startGame();
  }
  
  const compare = event => {
    setUserInput(event.target.value);
    if(key === " "){
      if (event.target.value.slice(0, event.target.value.length -1) === word) {
        setCorrect(correct +1);
        setWord(nextWord);
        setNextWord(randomWord())
        setUserInput('');
      }else{
        setIncorrect(incorrect +1);
        setWord(nextWord);
        setNextWord(randomWord())
        setUserInput('');
      }
    }    
  };

  const logOut = ()=>{
    localStorage.removeItem("nombre");
    navigate("/login");
  }
  let user = localStorage.getItem("nombre") ?<><button>{localStorage.getItem("nombre")} <BsFillPersonFill/> </button><a onClick={logOut}>Cerrar sesión <BsBoxArrowLeft/></a></>: <a href='/login' >Login</a>;
  const recibirDatos = ()=>{
    Axios.get("http://localhost:3001/stats").then(response=>console.log(response))
  }
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
            <h2>{word}</h2>
            <h3>{nextWord}</h3>
          </div>
          <div>

          </div>
          <input disabled type="text" value={userInput} onKeyDown={keyChange} onChange={compare} />
          <button onClick={startGame}>Iniciar</button>
          <button onClick={restartGame}>Reiniciar</button>
          <p>Bien: {correct} Mal: {incorrect} Tiempo: {time}</p>
          <button onClick={recibirDatos}>asdf</button>
        </div>
      </main>
    </div>
  );
}

export default App;
