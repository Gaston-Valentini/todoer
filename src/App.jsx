// Componente aplicación

import './App.css'

import { useState, useEffect } from 'react'

import Header from './Components/Header/Header'
import Creator from './Components/Creator/Creator'
import List from './Components/List/List'

export default function App() {

  // Este estado se encarga de almacenar las tareas de la aplicación de manera global
  const [tasks, setTasks] = useState([])

  // Al renderizar la aplicación se setea el estado de tareas con las tareas almacenadas en la base de datos, la cual se sigue renderizando nuevamente cada vez que dicho estado cambie y así renderizar los componenetes hijos también
  useEffect(() => {
    fetch('http://localhost:4000/tasks')
    .then(res => res.json())
    .then(data => setTasks(data.tasks))
  }, [tasks])

  return (
    <div className='app'>
      <Header/>
      <Creator setTasks={setTasks}/>
      <List tasks={tasks} setTasks={setTasks}/>
    </div>
  )
}