import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter,Route,Routes } from "react-router";
import { Register,Login } from './authContent/auth.jsx';
import { Addcustomer } from './components/addCustomer.jsx';
import { AddItems } from './components/addItems.jsx';
import { UpdateCustomer } from './components/updateCustomer.jsx';
import { BuyItem } from './components/buyItem.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/add-customer' element={<Addcustomer/>}/>
      <Route path='/add-Item' element={<AddItems />}/>
      <Route path='/updateCustomer' element={<UpdateCustomer />}/>
      <Route path='/buy-item' element={<BuyItem/>}/>
    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
