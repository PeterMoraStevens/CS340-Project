import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"

const DeleteCustomerForm = ({ customerObj, hiddenStateUpdater, refreshCustomers }) => {
  if (!customerObj) return null;

  const handleDelete = () => {
    axios.delete(`/deleteCustomer/${customerObj.customerID}`).then(() => {
      refreshCustomers();
      hiddenStateUpdater(null);
    });
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Customer</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this customer?</div>
        <div>Customer ID: {customerObj.customerID}</div>
        <div>Name: {customerObj.name}</div>
        <div>Email: {customerObj.email}</div>
        <div>Phone: {customerObj.phone}</div>
        <div className="flex gap-2">
          <div className="btn" onClick={handleDelete}>Confirm Delete</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>Cancel</div>
        </div>
      </div>
    </div>
  );
};


const UpdateCustomerForm = ({ customerObj, hiddenStateUpdater, refreshCustomers }) => {
  if (!customerObj) return null;

  const [name, setName] = useState(customerObj.name);
  const [email, setEmail] = useState(customerObj.email);
  const [phone, setPhone] = useState(customerObj.phone);

  const handleUpdate = () => {
    axios.put(`/updateCustomer/${customerObj.customerID}`, { name, email, phone }).then(() => {
      refreshCustomers();
      hiddenStateUpdater(null);
    });
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Customer</div>
      <div className="flex flex-col gap-2 items-center">
        <label>Name</label>
        <input
          type="text"
          placeholder="First Last"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Phone</label>
        <input
          type="tel"
          placeholder="123-456-7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn" onClick={handleUpdate}>Update Customer</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>Cancel</div>
        </div>
      </div>
    </div>
  );
};


const AddCustomerForm = ({ hidden, hiddenStateUpdater, refreshCustomers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAdd = () => {
    axios.post('/addCustomer', { name, email, phone }).then(() => {
      refreshCustomers();
      hiddenStateUpdater(true);
    });
  };

  if (hidden) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Customer</div>
      <div className="flex flex-col gap-2 items-center">
        <label>Name</label>
        <input
          type="text"
          placeholder="First Last"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Phone</label>
        <input
          type="tel"
          placeholder="123-456-7890"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn" onClick={handleAdd}>Add Customer</div>
          <div className="btn" onClick={() => hiddenStateUpdater(true)}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

const Customers = () => {
  // state we use to keep track of forms being shown or not
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomerFormHidden, setNewCustomerFormHidden] = useState(true);
  const [customers, setCustomers] = useState([]);

  // after each crud operation we want to refresh the UI so we recall the get all customers endpoint
  const refreshCustomers = () => {
    axios.get("/getCustomers").then((res) => {
      setCustomers(res.data);
    });
  };

  // on page mount we call all customers to start
  useEffect(() => {
    axios.get("/getCustomers").then((res) => {
      setCustomers(res.data)
    })
  }, [])

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8" hidden={selectedCustomer !== null || newCustomerFormHidden === false}>
        <table className="table">
          <thead>
            <tr>
              <th>
                <button
                  className="btn"
                  onClick={() => {
                    setNewCustomerFormHidden(false);
                    setSelectedCustomer(null);
                  }}
                >
                  New
                </button>
              </th>
              <th />
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.CustomerID}>
                <th>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedCustomer({ ...customer, action: 'update' });
                      setNewCustomerFormHidden(true);
                    }}
                  >
                    Edit
                  </div>
                </th>
                <td>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedCustomer({ ...customer, action: 'delete' });
                      setNewCustomerFormHidden(true);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>{customer.customerID}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddCustomerForm hidden={newCustomerFormHidden} hiddenStateUpdater={setNewCustomerFormHidden} refreshCustomers={refreshCustomers} />
      {selectedCustomer?.action === 'update' && (
        <UpdateCustomerForm customerObj={selectedCustomer} hiddenStateUpdater={setSelectedCustomer} refreshCustomers={refreshCustomers} />
      )}
      {selectedCustomer?.action === 'delete' && (
        <DeleteCustomerForm customerObj={selectedCustomer} hiddenStateUpdater={setSelectedCustomer} refreshCustomers={refreshCustomers} />
      )}
    </div>
  );
};

export default Customers;
