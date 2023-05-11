import './Creator.css'

import { useRef, useState } from 'react' 

import axios from 'axios'

export default function Creator({setTasks}) {

    // Este estado se encarga de almacenar el mensaje que aparecerá cuando se agregue una tarea
    const [ message, setMessage ] = useState('')

    const title = useRef(null)
    const description = useRef(null)
    const urgency = useRef(null)

    // Función que agrega una nueva tarea
    const onAdd = async (e) => {

        // Previene el comportamiento por defecto del formulario y evita que recargue la página
        e.preventDefault()

        // Utilizando el hook useRef obtiene los valores almacenados en los input y crea un objeto para almacenar en la base de datos
        const newTask = {
            title: title.current.value,
            description: description.current.value,
            urgency: urgency.current.value
        }
        const req = await axios.post('http://localhost:4000/create', newTask)
        
        // Setea el mensaje y luego de 3 segundos hace que desaparezca
        setMessage(req.data.message)
        setTimeout(() => {
            setMessage('')
        }, 3000)

        // Hace una nueva petición al servidor y almacena en el estado global de tareas la nueva tarea, lo cual hace que toda la aplicación se renderize nuevamente al cambiar dicho estado
        fetch('http://localhost:4000/tasks')
        .then(res => res.json())
        .then(data => setTasks(data.tasks))

    }

    return (
        <section className='creator'>
            <div className='creatorContainer'>
            <p className='creatorTitle'>Aquí podras agregar tareas a tu lista</p>
            <form className='creatorForm'>
                <div className='creatorFormSection'>
                    <p className='creatorFormSectionTitle'>Título</p>
                    <input className='creatorFormSectionInput' ref={title}/>
                </div>
                <div className='creatorFormSection'>
                    <p className='creatorFormSectionTitle'>Descripción</p>
                    <textarea  className='creatorFormSectionInput' ref={description}/>
                </div>
                <div className='creatorFormSection'>
                    <p className='creatorFormSectionTitle'>Urgencia</p>
                    <select className='creatorFormSectionInput' ref={urgency}>
                        <option hidden>Selecione una opción</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                    </select>
                </div>
                <button className='creatorFormSubmit' onClick={onAdd}>Agregar Tarea</button>
                <div className='creatorMessage'>{message}</div>
            </form>
            </div>
        </section>
    )
}