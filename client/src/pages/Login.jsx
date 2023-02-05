import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import "../css/login.css";
export const Login = () => {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({username:"",password:""});
  let inputChange = ({target})=>{
    const {name, value} = target;
    setFormData({
      ...formData,
      [name]:value
    })
  }
  function submit(event){
    event.preventDefault();
    Axios.post("http://localhost:3001/login",{
      username: formData.username,
      password: formData.password
    }).then(response=>{
      if(response.data.username){
        localStorage.setItem("nombre",response.data.username);
        navigate("/");
      }else{
        alert("Nombre de usuario o contraseña incorrectos.");
      }
      document.querySelector("form").reset();
    }).catch(error=>console.log(error));
    
  }
  return (
    <div className='login-container'>
      <header>
        <h1>Iniciar sesión</h1>
      </header>
      <main>
        <form onSubmit={submit}>
          <label htmlFor="username">Nombre de usuario</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder="Nombre de usuario"
            required
            onChange={inputChange}
          />
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="Contraseña"
            required
            onChange={inputChange}
          />
          <input type="submit" value="Entrar"/>
          <a href="/register">Crear cuenta</a>
        </form>
      </main>
    </div>
  )
}
