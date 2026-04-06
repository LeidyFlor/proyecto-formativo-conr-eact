import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { inventarioAxios } from "../../config/axios.js"; // Para hacer consultas a la API, conecxion con el backend
import Swal from "sweetalert2"; //Para mostrar alertas bonitas
import { useNavigate } from "react-router-dom";

function NuevoUsuario() {
    const navigate = useNavigate();
  const [usuario, guardarUsuario] = useState({
    // Estado para almacenar la información del nuevo usuario que se va a crear
    nombre: "",
    tipoDocumento: "",
    numDocumento: "",
    tipoUsuario: "",
    estado: "",
    fechaInicio: "",
    fechaFin: "",
    email: "",
    telefono: "",
    direccion: "",
    telefonoDos: "",
    emailInstitucional: "",
  });

  // funcion para actualizar el estado del usuario a medida que este ingresa información al formulario

  const actualizarState = (e) => {
    guardarUsuario({
      ...usuario, // Usamos el operador spread para mantener los valores anteriores del usuario y solo actualizar el campo que ha cambiado
      [e.target.name]: e.target.value, //usamos el nombre para actualizar
      //El valor ingresado por el usuario
    });
  };
  const agregarUsuario = (e) => {
    //Se ejecuta al enviar el formulario
    e.preventDefault();

    inventarioAxios
      .post("/usuarios", usuario) // se realiza la petición POST a la ruta "/usuarios" de la API para agregar un nuevo usuario, enviando la información del usuario en el cuerpo de la solicitud
      .then((res) => {
        console.log(res.data);
        //si existen errores en mongo
        Swal.fire({
          title: "Usuario creado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/usuarios"); //Dirige al listado de usuarios
          }
        });
      })
      .catch((err) => {
        //  Código 11000 en MongoDB significa que ya existe un registro con ese dato único
        if (err.response?.data?.code === 11000) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario ya existe ya existe",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al crear el usuario",
            confirmButtonText: "Aceptar",
          });
        }
      });
  };
  //validar el formulario
  const validarFormulario = () => {
    const {
      nombre,
      tipoDocumento,
      numDocumento,
      tipoUsuario,
      estado,
      fechaInicio,
      fechaFin,
      email,
      telefono,
      direccion,
      telefonoDos,
      emailInstitucional,
    } = usuario;
    let valido =
      !nombre.length ||
      !tipoDocumento.length ||
      !numDocumento.length ||
      !tipoUsuario.length ||
      !estado.length ||
      !fechaInicio.length ||
      !fechaFin.length ||
      !email.length ||
      !telefono.length ||
      !direccion.length ||
      !telefonoDos.length ||
      !emailInstitucional.length; // Verificamos si alguno de los campos está vacío (si la longitud de alguno de los campos es 0)

    return valido; // Retornamos true si algún campo está vacío (lo que indica que el formulario no es válido) o false si todos los campos están llenos (lo que indica que el formulario es válido)
  };
  return (
    <Fragment>
      <h2>Nuevo Usuario</h2>

      <form onSubmit={agregarUsuario}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre completo"
            name="nombre"
            onChange={actualizarState}
          />
        </div>
        {/* Select es utilizado para opciones fijas de respuestas*/}
        <div className="campo">
          <label>Tipo de Documento:</label>
          <select
            name="tipoDocumento"
            onChange={actualizarState}
            defaultValue=""
          >
            <option value="" disabled>
              -- Selecciona --
            </option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PP">Pasaporte</option>
          </select>
        </div>

        <div className="campo">
          <label>Numero de documento:</label>
          <input
            type="Number"
            placeholder="Numero de documento"
            name="numDocumento"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Tipo de Usuario:</label>
          <select name="tipoUsuario" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              -- Selecciona --
            </option>
            <option value="admin">Administrador</option>
            <option value="inst">Instructor</option>
            <option value="inv">Invitado</option>
          </select>
        </div>

        <div className="campo">
          <label>Estado:</label>
          <select name="estado" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              -- Selecciona --
            </option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div className="campo">
          <label>f\Fecha de Inicio:</label>
          <input
            type="date"
            placeholder="Fecha de inicio"
            name="fechaInicio"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>fechaFin:</label>
          <input
            type="date"
            placeholder="Fecha fin"
            name="fechaFin"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Usuario"
            name="email"
            onChange={actualizarState}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono Usuario"
            name="telefono"
            onChange={actualizarState}
          />
        </div>
        <div className="direccion">
          <label>Dirrecion:</label>
          <input
            type="text"
            placeholder="Direccion"
            name="direccion"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Teléfono dos:</label>
          <input
            type="tel"
            placeholder="Teléfono dos Usuario"
            name="telefonoDos"
            onChange={actualizarState}
          />
        </div>
        <div className="campo">
          <label>Email institucional:</label>
          <input
            type="email"
            placeholder="Email institucional Usuario"
            name="emailInstitucional"
            onChange={actualizarState}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Usuario"
            disabled={validarFormulario()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default NuevoUsuario;
