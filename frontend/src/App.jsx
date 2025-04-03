import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import './main.css';
import { Profile } from './components/Profile';

// Ensure cookies are sent with requests for session handling
axios.defaults.withCredentials = true;

function App() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [view, setView] = useState(null); // Track whether to show customers or items
  const [user, setUser] = useState("");
  const [profile,setProfile] = useState(false);
  const nav = useNavigate();


  useEffect(() =>{
    async function fetch(){
      try{
        let res = await axios.get("http://localhost:3000/");
        // console.log(res.data);
        if(res.data.message=="No token found"){
          // console.log("enter");
          nav("/login");
        }
        else{
          // console.log(res.data.user)
          setUser(res.data.user.name);
          nav("/");
        }
      }
      catch(error){
        console.log(error);
      }
    }
    fetch();
  },[]);
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getCustomers");
      // console.log(response);
      setCustomers(response.data.customers);
      console.log(response.data.customers);
      setView("customers");
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getItems");
      setItems(response.data.items);
      setView("items");
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addCustomer = () => {
    // console.log(user);
    nav("/add-customer");
  }

  const addItems = () =>{
    console.log(user);
    nav("/add-item");
  }

  const updateCustomer = (customer) =>{
    // console.log(customer);
    nav('/updateCustomer',{state : {user,customer}})
  }

  return (
    <div>
    <div className='flex flex-col gap-7 w-full'>
      {/* Navbar */}
      <div className='flex flex-row w-7xl'>
        <nav className='flex flex-row gap-10 m-auto w-4xl mt-5 h-10 ml-10'>
          <button 
            onClick={fetchCustomers} 
            className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded'
          >
            Customers
          </button>
          <button 
            onClick={fetchItems} 
            className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded'
          >
            Items
          </button>
        </nav>
        <div>
        <button onClick={()=>{
          setProfile(!profile)
        }} className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded m-auto mr-0 mt-5 h-10'>
          Profile
        </button>
        {profile && <Profile name={user}/>}
        </div>
      </div>

      {/* Display Customers or Items */}
      <div className="p-4">
        {view === "customers" && (
          <div>
            <div>
            <h2 className="text-xl font-bold">Customers List</h2>
            {customers?.length > 0 ? (
              customers.map((customer, index) => (
                <div key={index}>
                <div className='flex flex-row gap-10 p-2 border-b'>
                  <button onClick={()=>{updateCustomer(customer.name)}} name={customer.name} className="">{customer.name}</button>
                  <p>phone : {customer.phone}</p>
                  <p>Balance : {customer.currentBalance}</p>
                  <button onClick={(p)=>{
                    p.preventDefault();
                    nav(`/buy-item?customer=${encodeURIComponent(JSON.stringify(customer))}`);
                  }} className='border-2 w-24 rounded-sm bg-fuchsia-600 text-white'>Buy Item</button>
                </div>
                </div>
              ))
            ) : (
              <p>No customers found.</p>
            )}
            <button onClick={addCustomer} className="mt-4 p-2 bg-blue-500 text-white rounded">Add Customer</button>
            </div>
          </div>
        )}

        {view === "items" && (
          <div>
            <h2 className="text-xl font-bold">Items List</h2>
            {items?.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className='flex flex-row gap-10 p-2 border-b'>
                  <button><p>{item.itemName}</p></button>
                  <p>{"Rs. " + item.price}</p>
                </div>
              ))
            ) : (
              <p>No items found.</p>
            )}
            <button onClick={addItems} className="mt-4 p-2 bg-green-500 text-white rounded">Add Item</button>
          </div>
        )}
      </div>

      {/* Background Image */}
      <div className='rounded-2xl'>
        <img className='h-screen w-full' src='/image.jpg' alt="Background" />
      </div>
    </div>
    </div>
  );
}

export default App;
