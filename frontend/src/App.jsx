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
        // console.log(error);
      }
    }
    fetch();
  },[]);
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getCustomers");
      // console.log(response);
      setCustomers(response.data.customers);
      // console.log(response.data.customers);
      setView("customers");
    } catch (error) {
      // console.error("Error fetching customers:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getItems");
      setItems(response.data.items);
      setView("items");
    } catch (error) {
      // console.error("Error fetching items:", error);
    }
  };

  const addCustomer = () => {
    // console.log(user);
    nav("/add-customer");
  }

  const addItems = () =>{
    // console.log(user);
    nav("/add-item");
  }

  const updateCustomer = (customer) =>{
    // console.log(customer);
    nav('/updateCustomer',{state : {user,customer}})
  }

  return (
    <div>
    <div className="min-h-screen flex flex-col bg-gray-50">
  {/* Navbar */}
  <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-sm">
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4 md:mb-0">
      <button 
        onClick={fetchCustomers}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Customers
      </button>
      <button 
        onClick={fetchItems}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Items
      </button>
    </div>
    <div>
      <button 
        onClick={() => setProfile(!profile)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
      >
        Profile
      </button>
      {profile && <div className='absolute z-10 right-4'><Profile name={user} /></div>}
    </div>
  </div>

  {/* Content Section */}
  <div className="flex-1 p-4">
    {view === "customers" && (
      <div>
        <h2 className="text-xl font-bold mb-4">Customers List</h2>
        {customers?.length > 0 ? (
          customers.map((customer, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border-b">
              <button 
                onClick={() => updateCustomer(customer.name)}
                className="text-left font-semibold text-blue-600"
              >
                {customer.name}
              </button>
              <p className="text-sm">Phone: {customer.phone}</p>
              <p className="text-sm">Balance: Rs. {customer.currentBalance}</p>
              <button 
                onClick={(p) => {
                  p.preventDefault();
                  nav(`/buy-item?customer=${encodeURIComponent(JSON.stringify(customer))}`);
                }}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-sm py-1 px-3 rounded"
              >
                Buy Item
              </button>
            </div>
          ))
        ) : (
          <p>No customers found.</p>
        )}
        <button 
          onClick={addCustomer} 
          className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Add Customer
        </button>
      </div>
    )}

    {view === "items" && (
      <div>
        <h2 className="text-xl font-bold mb-4">Items List</h2>
        {items?.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between gap-2 p-3 border-b">
              <p className="font-medium">{item.itemName}</p>
              <p className="text-sm">Rs. {item.price}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
        <button 
          onClick={addItems} 
          className="mt-4 p-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Add Item
        </button>
      </div>
    )}
  </div>

  {/* Responsive Background Image */}
  <div className="mt-6">
    <img 
      className="w-full h-64 md:h-[500px] object-cover rounded-2xl" 
      src="/image.jpg" 
      alt="Background" 
    />
  </div>
</div>

    </div>
  );
}

export default App;
