import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export const Stats = () => {
    let [stats,setStats] = useState([]);
    
    useEffect(()=>{
        const recibirDatos = ()=>{
            Axios.get("http://localhost:3001/stats").then(response=>{
                setStats(response.data)
            })
        }
        recibirDatos();

    },[])
  return (
    <div className="stats">
        <h3 className='row '>Ranking</h3>
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
  )
}
