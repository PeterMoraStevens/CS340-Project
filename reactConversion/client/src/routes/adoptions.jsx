import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Add Adoption Form Component
const AddAdoptionForm = ({ hidden, setHidden, refreshAdoptions }) => {
  const [customerID, setCustomerId] = useState('');
  const [catID, setCatId] = useState('');
  const [adoptionDate, setDate] = useState('');
  const [adoptionFee, setFee] = useState('');

  const handleAdd = () => {
    axios
      .post('/addAdoption', { customerID, catID, adoptionDate, adoptionFee })
      .then(() => {
        refreshAdoptions();
        setHidden(true); // Close the form
        setCustomerId('');
        setCatId('');
        setDate('');
        setFee('');
      })
      .catch((err) => console.error('Error adding adoption:', err));
  };

  if (hidden) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Adoption</div>
      <div className="flex flex-col gap-2 items-center">
        <input
          type="number"
          placeholder="Customer ID"
          value={customerID}
          onChange={(e) => setCustomerId(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Cat ID"
          value={catID}
          onChange={(e) => setCatId(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="date"
          placeholder="Adoption Date"
          value={adoptionDate}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Fee (in dollars)"
          value={adoptionFee}
          onChange={(e) => setFee(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <div className='flex gap-2'>
          <div className="btn" onClick={handleAdd}>
            Add Adoption
          </div>
          <div className="btn" onClick={() => {
            setHidden(true)
            setCustomerId('');
            setCatId('');
            setDate('');
            setFee('');
          }}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

// Update Adoption Form Component
const UpdateAdoptionForm = ({ adoption, setSelectedAdoption, refreshAdoptions }) => {
  const [customerID, setCustomerID] = useState(adoption.customerID);
  const [catID, setCatID] = useState(adoption.catID);
  const [adoptionDate, setAdoptionDate] = useState(adoption.adoptionDate);
  const [adoptionFee, setFee] = useState(adoption.adoptionFee);

  const handleUpdate = () => {
    axios
      .put(`/updateAdoption/${adoption.adoptionID}`, {
        customerID,
        catID,
        adoptionDate,
        adoptionFee,
      })
      .then(() => {
        refreshAdoptions();
        setSelectedAdoption(null); // Close the form
      })
      .catch((err) => console.error('Error updating adoption:', err));
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Adoption</div>
      <div className="flex flex-col gap-2 items-center">
        <input
          type="number"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          value={catID}
          onChange={(e) => setCatID(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="date"
          value={adoptionDate}
          onChange={(e) => setAdoptionDate(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          value={adoptionFee}
          onChange={(e) => setFee(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <div className='flex gap-2'>
          <div className="btn" onClick={handleUpdate}>
            Update Adoption
          </div>
          <div className="btn" onClick={() => setSelectedAdoption(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete Adoption Form Component
const DeleteAdoptionForm = ({ adoption, setSelectedAdoption, refreshAdoptions }) => {
  const handleDelete = () => {
    axios.delete(`/deleteAdoption/${adoption.adoptionID}`).then(() => {
      refreshAdoptions();
      setSelectedAdoption(null); // Close the form
    });
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Adoption</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this adoption?</div>
        <div>Adoption ID: {adoption.adoptionID}</div>
        <div>Customer ID: {adoption.customerID}</div>
        <div>Cat ID: {adoption.catID}</div>
        <div>Date: {adoption.adoptionDate}</div>
        <div>Fee: ${adoption.adoptionFee}</div>
        <div className="flex gap-2">
          <div className="btn" onClick={handleDelete}>
            Confirm Delete
          </div>
          <div className="btn" onClick={() => setSelectedAdoption(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Adoptions Component
const Adoptions = () => {
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [newAdoptionFormHidden, setNewAdoptionFormHidden] = useState(true);
  const [adoptions, setAdoptions] = useState([]);

  const refreshAdoptions = () => {
    axios.get('/getAdoptions').then((res) => setAdoptions(res.data));
  };

  useEffect(() => {
    refreshAdoptions();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8" hidden={selectedAdoption !== null || newAdoptionFormHidden !== true}>
        <table className="table">
          <thead>
            <tr>
              <th>
                <button
                  className="btn"
                  onClick={() => {
                    setNewAdoptionFormHidden(false);
                    setSelectedAdoption(null);
                  }}
                >
                  New
                </button>
              </th>
              <th />
              <th>Adoption ID</th>
              <th>Customer ID</th>
              <th>Cat ID</th>
              <th>Date</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {adoptions.map((adoption) => (
              <tr key={adoption.adoptionID}>
                <th>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedAdoption({ ...adoption, action: 'update' });
                      setNewAdoptionFormHidden(true);
                    }}
                  >
                    Edit
                  </div>
                </th>
                <td>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedAdoption({ ...adoption, action: 'delete' });
                      setNewAdoptionFormHidden(true);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>{adoption.adoptionID}</td>
                <td>{adoption.customerID}</td>
                <td>{adoption.catID}</td>
                <td>{adoption.adoptionDate}
                </td>
                <td>${adoption.adoptionFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddAdoptionForm hidden={newAdoptionFormHidden} setHidden={setNewAdoptionFormHidden} refreshAdoptions={refreshAdoptions} />
      {selectedAdoption?.action === 'update' && (
        <UpdateAdoptionForm adoption={selectedAdoption} setSelectedAdoption={setSelectedAdoption} refreshAdoptions={refreshAdoptions} />
      )}
      {selectedAdoption?.action === 'delete' && (
        <DeleteAdoptionForm adoption={selectedAdoption} setSelectedAdoption={setSelectedAdoption} refreshAdoptions={refreshAdoptions} />
      )}
    </div>
  );
};

export default Adoptions;
