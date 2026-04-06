import { Link } from "react-router-dom";

export const Navegacion=()=>{
    return(
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to ="/usuarios" className="usuarios">Usuarios</Link>
                <Link to ="/materiales" className="materiales">Materiales</Link>
            </nav>
        </aside>
    )
}