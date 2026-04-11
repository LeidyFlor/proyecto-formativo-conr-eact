import { Fragment, useState, useEffect } from "react";
import { inventarioAxios } from "../../config/axios.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function NuevoMaterialDevolutivo() {
  const navigate = useNavigate();

  // Estado para almacenar los datos del nuevo material devolutivo.
  // Incluye todos los campos del schema base MÁS los exclusivos del discriminator.
  const [material, guardarMaterial] = useState({
    // ── Campos del schema base (Materiales) ──
    nombreElemento: "",
    placaSena: "",
    descripcion: "",
    estado: "",
    cantidad: "",
    valorUnitario: "",
    valorTotal: "",
    ubicacion: "",
    marca: "", // Guardará el _id de la marca seleccionada
    cuentadante: "", // Guardará el _id del usuario seleccionado

    // Campos exclusivos de MaterialesDevolutivos (discriminator) ********
    serial: "",
    modelo: "",
    categoria: "", // Guardará el _id de la categoría seleccionada
    dimensiones: "",
    fichaTecnica: "", // Por ahora es Number en el modelo; se actualizará cuando sea File
  });

  // Estado para la lista de marcas que llega del backend
  const [marcas, guardarMarcas] = useState([]);

  // Estado para la lista de categorías que llega del backend
  const [categorias, guardarCategorias] = useState([]);

  // Estado para la lista de usuarios (cuentadantes) que llega del backend
  const [usuarios, guardarUsuarios] = useState([]);

  // Al montar el componente cargamos marcas, categorías y usuarios para los selectores
  useEffect(() => {
    // Consultamos las marcas disponibles
    inventarioAxios
      .get("/marcas")
      .then((res) => guardarMarcas(res.data))
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar las marcas", "error"),
      );

    // Consultamos las categorías exclusivo del formulario devolutivo
    inventarioAxios
      .get("/categorias")
      .then((res) => guardarCategorias(res.data))
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar las categorías", "error"),
      );

    // Consultamos los usuarios para el selector de cuentadante
    inventarioAxios
      .get("/usuarios")
      .then((res) => guardarUsuarios(res.data))
      .catch(() =>
        Swal.fire("Error", "No se pudieron cargar los usuarios", "error"),
      );
  }, []); // Array vacío, solo se ejecuta una vez al montar el componente

  // Actualiza el estado del material a medida que el usuario llena el formulario
  const actualizarState = (e) => {
    guardarMaterial({
      ...material, // Conservamos los valores anteriores con spread
      [e.target.name]: e.target.value, // Solo actualizamos el campo que cambió
    });
  };

  // Se ejecuta al enviar el formulario
  const agregarMaterial = (e) => {
    e.preventDefault();

    // Petición POST al endpoint específico de devolutivos
    // El backend usará el discriminator para guardarlo en la colección correcta
    inventarioAxios
      .post("/materiales", material) //El backend determina si es consumo o devolutivo
      .then(() => {
        Swal.fire({
          title: "Material devolutivo creado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigimos al listado general de materiales
            navigate("/materiales");
          }
        });
      })
      .catch((err) => {
        // Código 11000 en MongoDB indica que ya existe un registro con ese dato único
        if (err.response?.data?.code === 11000) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ya existe un material con esos datos",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al crear el material devolutivo",
            confirmButtonText: "Aceptar",
          });
        }
      });
  };

  // Valida que los campos obligatorios no estén vacíos antes de habilitar el botón.
  // Los devolutivos tienen más campos obligatorios que los de consumo (serial, modelo, categoria).
  // Retorna true si hay algún campo vacío (deshabilita el botón),
  // false si todo está lleno (habilita el botón)
  const validarFormulario = () => {
    const {
      nombreElemento,
      estado,
      cantidad,
      valorUnitario,
      id_marca,
      serial,
      modelo,
      categoria,
      cuentadante
    } = material;
    return (
      !nombreElemento.length ||
      !estado.length ||
      !String(cantidad).length ||
      !String(valorUnitario).length ||
      !id_marca.length ||
      !cuentadante.length ||
      !serial.length || // Obligatorio en devolutivos
      !modelo.length || // Obligatorio en devolutivos
      !categoria.length // Obligatorio en devolutivos — también es el discriminador visual
    );
  };

  return (
    <Fragment>
      <h2>Nuevo Material Devolutivo</h2>

      <form onSubmit={agregarMaterial}>
        <legend>Llena todos los campos</legend>

        {/*Campos base de materiales*/}

        {/* Nombre del elemento,campo obligatorio */}
        <div className="campo">
          <label>Nombre del elemento:</label>
          <input
            type="text"
            placeholder="Nombre del elemento"
            name="nombreElemento"
            onChange={actualizarState}
          />
        </div>

        {/* Placa SENA — más relevante en devolutivos */}
        <div className="campo">
          <label>Placa SENA:</label>
          <input
            type="text"
            placeholder="Placa SENA"
            name="placaSena"
            onChange={actualizarState}
          />
        </div>

        {/* Descripción general del equipo */}
        <div className="campo">
          <label>Descripción:</label>
          <input
            type="text"
            placeholder="Descripción del elemento"
            name="descripcion"
            onChange={actualizarState}
          />
        </div>

        {/* Estado del material valores fijos según el modelo del backend */}
        <div className="campo">
          <label>Estado:</label>
          <select name="estado" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              **** Selecciona ****
            </option>
            <option value="Disponible">Disponible</option>
            <option value="No disponible">No disponible</option>
          </select>
        </div>

        {/* Cantidad en inventario */}
        <div className="campo">
          <label>Cantidad:</label>
          <input
            type="number"
            placeholder="Cantidad"
            name="cantidad"
            min="0"
            onChange={actualizarState}
          />
        </div>

        {/* Valor unitario del equipo */}
        <div className="campo">
          <label>Valor unitario:</label>
          <input
            type="number"
            placeholder="Valor unitario"
            name="valorUnitario"
            min="0"
            onChange={actualizarState}
          />
        </div>

        {/* Valor total */}
        <div className="campo">
          <label>Valor total:</label>
          <input
            type="number"
            placeholder="Valor total"
            name="valorTotal"
            min="0"
            onChange={actualizarState}
          />
        </div>

        {/* Ubicación física dentro del almacén */}
        <div className="campo">
          <label>Ubicación:</label>
          <input
            type="text"
            placeholder="Ubicación del elemento"
            name="ubicacion"
            onChange={actualizarState}
          />
        </div>

        {/* Selector de marca — carga dinámicamente desde GET /marcas */}
        <div className="campo">
          <label>Marca:</label>
          <select name="marca" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              **** Selecciona una marca ****
            </option>
            {/* Iteramos las marcas que llegaron del backend */}
            {marcas.map((marca) => (
              <option key={marca._id} value={marca._id}>
                {marca.nombre_marca}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de cuentadante — carga desde el  GET de usuarios */}
        <div className="campo">
          <label>Cuentadante:</label>
          <select name="cuentadante" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              **** Selecciona un cuentadante --
            </option>
            {/*usuarios de la bd */}
            {usuarios.map((usuario) => (
              <option key={usuario._id} value={usuario._id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        </div>

        {/*Campos que solo son de de devolutivos */}

        {/* Serial del material*/}
        <div className="campo">
          <label>Serial:</label>
          <input
            type="text"
            placeholder="Serial del equipo"
            name="serial"
            onChange={actualizarState}
          />
        </div>

        {/* Modelo del equipo */}
        <div className="campo">
          <label>Modelo:</label>
          <input
            type="text"
            placeholder="Modelo del equipo"
            name="modelo"
            onChange={actualizarState}
          />
        </div>

        {/* Selector de categoría — exclusivo de devolutivos, carga desde GET /categorias */}
        <div className="campo">
          <label>Categoría:</label>
          <select name="categoria" onChange={actualizarState} defaultValue="">
            <option value="" disabled>
              **** Selecciona una categoría ****
            </option>
            {/* categorías de la bd */}
            {categorias.map((categoria) => (
              <option key={categoria._id} value={categoria._id}>
                {categoria.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Dimensiones */}
        <div className="campo">
          <label>Dimensiones:</label>
          <input
            type="text"
            placeholder="Ej: 30cm x 20cm x 10cm"
            name="dimensiones"
            onChange={actualizarState}
          />
        </div>

        {/* Ficha técnica — actualmente es Number en el modelo.
            TODO: cuando el backend cambie este campo a File,
            reemplazar este input por uno de type="file" */}
        <div className="campo">
          <label>Ficha técnica:</label>
          <input
            type="number"
            placeholder="Ficha técnica"
            name="fichaTecnica"
            min="0"
            onChange={actualizarState}
          />
        </div>

        {/* Botón de envío — deshabilitado si el formulario no es válido */}
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Material Devolutivo"
            disabled={validarFormulario()}
          />
        </div>
      </form>
    </Fragment>
  );
}

export default NuevoMaterialDevolutivo;
