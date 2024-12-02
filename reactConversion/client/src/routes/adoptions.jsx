import React, { useState } from 'react';

const DeleteAdoptionForm = ({ adoptionObj, hiddenStateUpdater }) => {
  if (!adoptionObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Adoption</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this adoption?</div>
        <div>Adoption ID: {adoptionObj.AdoptionID}</div>
        <div>Customer ID: {adoptionObj.CustomerID}</div>
        <div>Cat ID: {adoptionObj.CatID}</div>
        <div>Date: {adoptionObj.Date}</div>
        <div className="flex gap-2">
          <div
            className="btn"
            onClick={() => {
              // Handle delete logic here
              hiddenStateUpdater(null);
            }}
          >
            Confirm Delete
          </div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateAdoptionForm = ({ adoptionObj, hiddenStateUpdater }) => {
  if (!adoptionObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Adoption</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Adoption ID: {adoptionObj.AdoptionID}</div>
        <input
          type="number"
          placeholder="Customer ID"
          defaultValue={adoptionObj.CustomerID}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Cat ID"
          defaultValue={adoptionObj.CatID}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="date"
          placeholder="Adoption Date"
          defaultValue={adoptionObj.Date}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Fee (in dollars)"
          defaultValue={adoptionObj.Fee}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn">Update Adoption</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const AddAdoptionForm = ({ hidden, hiddenStateUpdater }) => {
  if (hidden) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Adoption</div>
      <div className="flex flex-col gap-2 items-center">
        <input type="number" placeholder="Customer ID" className="input input-bordered w-full max-w-xs" />
        <input type="number" placeholder="Cat ID" className="input input-bordered w-full max-w-xs" />
        <input type="date" placeholder="Adoption Date" className="input input-bordered w-full max-w-xs" />
        <input type="number" placeholder="Fee (in dollars)" className="input input-bordered w-full max-w-xs" />
        <div className="btn" onClick={() => hiddenStateUpdater(true)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

const Adoptions = () => {
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [newAdoptionFormHidden, setNewAdoptionFormHidden] = useState(true);
  const [adoptions, setAdoptions] = useState([
    {
      AdoptionID: 1,
      CustomerID: 2,
      CatID: 3,
      Date: '7/3/2023',
      Fee: 30.00,
    },
    {
      AdoptionID: 2,
      CustomerID: 4,
      CatID: 2,
      Date: '8/24/2024',
      Fee: 45.00,
    },
  ]);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8">
        <table className="table" hidden={selectedAdoption || !newAdoptionFormHidden}>
          <thead>
            <tr>
              <th>
                <button className="btn" onClick={() => {
                  setNewAdoptionFormHidden(false)
                  setSelectedAdoption({})
                }}>
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
              <tr key={adoption.AdoptionID}>
                <th>
                  <div className="btn" onClick={() => {
                    setSelectedAdoption({ ...adoption, action: 'update' })
                    setNewAdoptionFormHidden(true)
                  }}>
                    Edit
                  </div>
                </th>
                <td>
                  <div className="btn" onClick={() => {
                    setSelectedAdoption({ ...adoption, action: 'delete' })
                    setNewAdoptionFormHidden(true)
                  }}>
                    Delete
                  </div>
                </td>
                <td>{adoption.AdoptionID}</td>
                <td>{adoption.CustomerID}</td>
                <td>{adoption.CatID}</td>
                <td>{adoption.Date}</td>
                <td>${adoption.Fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddAdoptionForm hidden={newAdoptionFormHidden} hiddenStateUpdater={setNewAdoptionFormHidden} />
      {selectedAdoption?.action === 'update' && (
        <UpdateAdoptionForm adoptionObj={selectedAdoption} hiddenStateUpdater={setSelectedAdoption} />
      )}
      {selectedAdoption?.action === 'delete' && (
        <DeleteAdoptionForm adoptionObj={selectedAdoption} hiddenStateUpdater={setSelectedAdoption} />
      )}
    </div>
  );
};

export default Adoptions;
