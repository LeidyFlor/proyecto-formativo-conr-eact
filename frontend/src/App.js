import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import Usuarios from "./componentes/usuarios/Usuarios.js"
import NuevoUsuario from "./componentes/usuarios/NuevoUsuario.js"
import EditarUsuario from "./componentes/usuarios/EditarUsuario.js"
import { Header } from "./componentes/layout/Header.js";
import { Navegacion } from "./componentes/layout/Bnavegacion.js";

function App() {
  return (
   <Router>
      <Fragment>
        <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Routes>
                <Route path= "/usuarios" element={<Usuarios/>}/>
                <Route path= "/usuarios/nuevo" element={<NuevoUsuario/>}/>
                <Route path= "/usuarios/editar/:id" element={<EditarUsuario/>}/>
              </Routes>

            </main>
          </div>
      </Fragment>
   </Router>
  );
}

export default App;
