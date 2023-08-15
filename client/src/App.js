import {Route, Routes} from 'react-router-dom'
import { Public, Home, Login } from './pages/public'
import path from './ultils/path'
import { getCategories } from './store/asyncAction'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [])

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
