// using react and daisyUI tailwind styling library with react router for page routing

import { Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css'
import Navbar from './components/ui/Navbar';
import Landing from './routes/landing'
import Adoptions from './routes/adoptions'
import Admissions from './routes/admissions';
import Cats from './routes/cats';
import Customers from './routes/customers';
import Products from './routes/products';
import ProductPurchases from './routes/productPurchases';
import Purchases from './routes/purchases';

function App() {

  return (
    <>
      <BrowserRouter basename=''>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/admissions' element={<Admissions />} />
          <Route path='/adoptions' element={<Adoptions />} />
          <Route path='/cats' element={<Cats />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/products' element={<Products />} />
          <Route path='/productPurchases' element={<ProductPurchases />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
