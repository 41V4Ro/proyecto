import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
/* import "../css/login.css"; */

export const Register = ()=>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email:"",username:"",password:"",repeat:""});
  const inputChange = ({target})=>{
    const {name, value} = target;
    setFormData({
      ...formData,
      [name]:value
    })
  }
    useEffect(()=>{
      comprobar();
    });
    const submit = (event)=>{
      event.preventDefault();
      Axios.post("http://localhost:3001/register",{
        email: formData.email,
        username: formData.username,
        password: formData.password
      }).then(response=>{
        navigate('/login');
      })
    }
    
    function comprobar(){
        if(formData.password === formData.repeat && formData.password !== ""){
            document.querySelector("input[type=submit]").disabled = false;
        }else{
            document.querySelector("input[type=submit]").disabled = true;
        }
    }
    return (
        <div className="login-container mt-5">
      <header>
        <h1>Crear cuenta</h1>
      </header>
      <main>
        <form onSubmit={submit}>
        <label htmlFor="email">Correo</label>
          <input 
            type="text" 
            name="email" 
            id="email" 
            placeholder="Dirección de correo"
            required
            onChange={inputChange}
          />
          <label htmlFor="username">Nombre de usuario</label>
          <input 
            type="text" 
            name="username" 
            id="username"
            placeholder="Nombre"
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
          <label htmlFor="repeat">Repetir contraseña</label>
          <input 
            type="password" 
            name="repeat" 
            id="repeat" 
            placeholder="Repetir contraseña"
            required
            onChange={inputChange}
          />
          <input type="submit" value="Registrarse" disabled/>
          <a href="/login">Iniciar sesión</a>
        </form>
      </main>
    </div>
    )
    
}