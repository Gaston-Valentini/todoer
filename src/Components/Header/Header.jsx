import './Header.css'

export default function Header() {
    return (
        <header className='header'>
            <h1 className='headerTitle'>TODOER</h1>
            <div className='headerBanner'>
                <div className='headerBannerImage'><img src='https://cdn-icons-png.flaticon.com/512/762/762096.png'/></div>
                <p className='headerBannerText'>Esta es una aplicación diseñada en React en la cual se utilizan diversas herramientas y técnicas que esta librería ofrece, como el uso de hooks, componentes estilizados y responsivos, filtrado y búsqueda de componentes.</p>
            </div>
        </header>
    )
}