import './List.css'

import { useState } from 'react'

import Task from '../Task/Task'

export default function List({tasks, setTasks}) {

    // Este estado es el que se encarga de almacenar las tareas que se van a renderizar en la lista
    const [search, setSearch] = useState('')
    // Este estado almacena el mensaje que aparecerá al eliminar una tarea
    const [message, setMessage] = useState('')

    // Setea el estado "search" con las tareas que coincidan con el contenido de la barra de búsqueda
    const filteredTasks = tasks.filter(task => {
        return task.title.toLowerCase().includes(search.toLowerCase());
    });    

    return (
        <section className='list'>
            <div className='listSearchbar'>
                <p className='listSearchbarTitle'>Busca una de tus tareas!!</p>
                <input className='listSearchbarInput' type='text' placeholder='Introduce el título de la tarea...' onChange={(e) => setSearch(e.target.value)}/>
                <div className='listSearchbarMessage'>{message}</div>
            </div>
            <div className='listTasks'>
                {/* Renderiza un comonente Task por cada tarea que coincida con la barra de búsqueda, en caso de no haber escrito nada en la barra de búsqueda aparecen todas las tareas */}
                {filteredTasks.map(task => {
                    return <Task
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        description={task.description}
                        urgency={task.urgency}
                        date={task.date}
                        tasks={tasks}
                        setTasks={setTasks}
                        setMessage={setMessage}
                    />
                })}
            </div>
        </section>
    )
}