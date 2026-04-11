import { useEffect, useState, Fragment } from "react";
import { inventarioAxios } from "../../config/axios.js"
import { Usuario } from "./Usuario.js"
import { Link } from "react-router-dom";

function Usuarios(){
  const [usuarios, guardarUsuario] = useState([]); //Traer datos del usuario y al momento de hacer una peticion que modifique los datos
  const consultarAPI = async () => {
    const consultarUsuario = await inventarioAxios.get("/usuarios");
    // console.log(consultarUsuario.data);

    guardarUsuario(consultarUsuario.data);
  };
  // useEffect se ejecuta al cargar la página y llama a consultarAPI una sola vez
  useEffect(() => {
    consultarAPI();
  }, []);
  return (
    <Fragment>
      <Link to={"/usuarios/nuevo"} className="btn btn-verde nvo-usuario">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Usuario
      </Link>
      <h1>Usuarios</h1>
      <ul className="listado-usuarios">
        {usuarios.map((usuario) => (
          <Usuario
            key={usuario._id} //se usa id como llave de mongo
            usuario={usuario}
          />
        ))}
        ;
      </ul>
    </Fragment>
  );
}
export default Usuarios;