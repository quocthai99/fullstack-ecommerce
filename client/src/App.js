import {Route, Routes} from 'react-router-dom'
import { Public, Home, Login, DetailProduct, FAQ, Services, Blogs, Products } from './pages/public'
import path from './ultils/path'
import { getCategories } from './store/app/asyncAction'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen font-main"  >
      <Routes>
        <Route path={path.PUBLIC} element={<Public />} >
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DETAIL_PRODUCT_PID_TITLE} element={<DetailProduct />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.OUR_SERVICES} element={<Services />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
