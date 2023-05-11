import './Task.css'

import { AiOutlineCheckCircle } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'

import axios from 'axios'

export default function Task({id, title, description, urgency, date, setTasks, setMessage}) {

  // Setea el momento en el que se creó la tarea
  const dateNow = new Date(date)
  const dateConvert = `${dateNow.getDate()}/${dateNow.getMonth()+1}/${dateNow.getFullYear()}`

  // Aplica una clase a la tarea según el valor de urgencia, lo que permite renderizar este parámetro en colores diferentes según su valor
  function getUrgencyClass(urgency) {
    switch (urgency) {
      case 'Alta':
        return 'taskUrgency taskUrgencyRed';
      case 'Media':
        return 'taskUrgency taskUrgencyOrange';
      case 'Baja':
        return 'taskUrgency taskUrgencyGreen';
      default:
        return 'taskUrgency';
    }
  }

  // Elimina una tarea de la lista
  const onRemove = (e) => {

    axios.post('http://localhost:4000/remove', {_id: e.currentTarget.id})

    // Luego de eliminarla hace una nueva petición...
    fetch('http://localhost:4000/tasks')
    .then(res => res.json())
    .then(data => {
      // ...y setea el estado global de tareas sin la tarea eliminada, lo que fuerza nuevamente el renderizado de la aplicación y de sus componentes hijos
      setTasks(data.tasks)

      // Setea el estado de mensaje y luego de 3 segundos hace que desaparezca
      setMessage('Tarea eliminada')
      setTimeout(() => {
        setMessage('')
      }, 3000)
    })
  }

  // Editar una tarea de la lista
  const onUpdate = (e) => {
    const title = prompt('Nuevo título de la tarea')
    const description = prompt('Nueva descripción de la tarea')
    const newTask = {
      title,
      description
    }
    axios.post('http://localhost:4000/update', {_id: e.currentTarget.id, newTask})
  }

  return (
    <div className='task'>
      <div className='taskButtons'>
        <AiOutlineCheckCircle className='taskButtonsDelete' id={id} onClick={onRemove}/>
        <FaRegEdit className='taskButtonsEdit' id={id} onClick={onUpdate}/>
      </div>
      <p className='taskTitle'>{title}</p>
      <p className='taskDescription'>{description}</p>
      <p className={getUrgencyClass(urgency)}>{urgency}</p>
      <p className='taskDate'>Creada el: {dateConvert}</p>
    </div>
  )
}