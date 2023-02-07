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
  
  /* let [previousWord, setPreviousWord] = useState(""); */
  let [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  let [nextWord, setNextWord] = useState(words[Math.floor(Math.random() * words.length)])
  let [userInput, setUserInput] = useState("");
  let [correct, setCorrect] = useState(0);
  let [incorrect, setIncorrect] = useState(0);
  let [score, setScore] = useState(0);
  let [key, setKey] = useState("");


  const keyChange = event =>{ // detectar las teclas pulsadas
    setKey(event.key);
  }

  //contador
  let [time, setTime] = useState(60);
 
  let [timer, setTimer] = useState(undefined);
  const startGame = () =>{
    clearInterval(timer);
    const input = document.querySelector("input");
    console.log(timer)
    setTimer(setInterval(()=>{
      input.disabled = false;
      input.focus();
      
      setTime(time=>{
        if(time <1){
          input.disabled = true;
          clearInterval(timer);
          return time;
        }else{
          return time -1;
        }
      });
      
    },1000)) 
  }
  const restartGame = ()=>{
    setUserInput("");
    setTime(60);
    setCorrect(0);
    setIncorrect(0);
    setWord(words[Math.floor(Math.random() * words.length)])
    setNextWord(words[Math.floor(Math.random() * words.length)])
    startGame();
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
  let user = localStorage.getItem("nombre") ?<><button>{localStorage.getItem("nombre")} <BsFillPersonFill/> </button><a onClick={logOut} href='/login'>Cerrar sesión <BsBoxArrowLeft/></a></>: <button >Login</button>;
  
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
          <input disabled type="text" value={userInput} onKeyDown={keyChange} onChange={compare} />
          <button onClick={startGame}>Iniciar</button>
          <button onClick={restartGame}>Reiniciar</button>
          <p>Bien: {correct} Mal: {incorrect} Tiempo: {time}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
