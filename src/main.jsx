// Archivo inicial, el cual se conecta a la raíz y renderiza el componente que contiene toda la aplicación

import './main.css'

import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.querySelector('#root')).render(<App/>)