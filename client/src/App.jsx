import {useRoutes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
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
  /* let navigate = useNavigate(); */
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
    "jabaí","jalapeño","jugadores", "jamón","justa",
    "kilómetro","karaoke", "kétchup", 
    "limonada","linterna","luciérnaga", "láser","lista",
    "madre","muertos","mirar", "música","mentira",
    "navidad","nogal","noche",
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
    "xilófono", "xenofobia",
    "yema","yo","yendo",
    "zapato","zumo","zote"
  ]
  let [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  let [nextWord, setNextWord] = useState(words[Math.floor(Math.random() * words.length)])
  let [userInput, setUserInput] = useState("");
  let [score, setScore] = useState(0);
  let [key, setKey] = useState("");

  const keyChange = event =>{
    setKey(event.key);
  }
  const compare = event => {
    setUserInput(event.target.value);
    if(key === " "){
      if (event.target.value.slice(0, event.target.value.length -1) === word) {
        setScore(score + 1);
        setWord(nextWord);
        setNextWord(words[Math.floor(Math.random() * words.length)])
        setUserInput('');
      }
    }
    
  };
  return (
    <div className="App">
      <header className="App-header">
         <h1>Mecanografía</h1>
        <div>
        </div>
      </header>
      <main>
        <div>
          <div>
            <h1>{word}</h1>
            <h3>{nextWord}</h3>
          </div>
          <input type="text" value={userInput} onKeyDown={keyChange} onChange={compare}/>
          <p>Puntos: {score}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
