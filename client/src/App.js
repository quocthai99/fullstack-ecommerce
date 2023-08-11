import {Route, Routes} from 'react-router-dom'
import { Public, Home, Login } from './pages/public'
import path from './ultils/path'

function App() {
  return (
    <div className="min-h-screen font-main"  >
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
