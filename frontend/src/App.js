import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import Usuarios from "./componentes/usuarios/Usuarios.js"
import NuevoUsuario from "./componentes/usuarios/NuevoUsuario.js"
import EditarUsuario from "./componentes/usuarios/EditarUsuario.js"
import { Header } from "./componentes/layout/Header.js";
import { Navegacion } from "./componentes/layout/Bnavegacion.js";
import Materiales from "./componentes/materiales/Materiales.js";
import NuevoMaterialConsumo from "./componentes/materiales/NuevoMaterialConsumo.js";
import NuevoMaterialDevolutivo from "./componentes/materiales/NuevoMaterialDevolutivo.js";
import EditarMaterial from "./componentes/materiales/EditarMaterial";

function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuarios/nuevo" element={<NuevoUsuario />} />
              <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
              <Route path="/materiales" element={<Materiales />} />
              <Route path="/materiales/nuevo" element={<NuevoMaterialConsumo />} />
              <Route path="/materiales/devolutivos/nuevo" element={<NuevoMaterialDevolutivo />} />
              <Route path="/materiales/consumibles/editar/:id" element={<EditarMaterial />} />
              <Route path="/materiales/devolutivos/editar/:id" element={<EditarMaterial />} />
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
