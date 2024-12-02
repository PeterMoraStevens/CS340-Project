import React, { useState } from 'react';

const DeleteCatForm = ({ catObj, hiddenStateUpdater }) => {
  if (!catObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Cat</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this cat?</div>
        <div>Cat ID: {catObj.CatID}</div>
        <div>Name: {catObj.Name}</div>
        <div>Description: {catObj.Description}</div>
        <div>Age: {catObj.Age}</div>
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

const UpdateCatForm = ({ catObj, hiddenStateUpdater }) => {
  if (!catObj) return null;

  const breeds = [
    "Domestic Shorthair",
    "Siamese",
    "Maine Coon",
    "Calico",
    "Persian",
    "Bengal",
    "Sphynx",
    "Ragdoll",
    "Other",
  ];

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Cat</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Cat ID: {catObj.CatID}</div>
        <input
          type="text"
          placeholder="Name"
          defaultValue={catObj.Name}
          className="input input-bordered w-full max-w-xs"
        />
        <textarea
          placeholder="Description"
          defaultValue={catObj.Description}
          className="textarea textarea-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Age"
          defaultValue={catObj.Age}
          className="input input-bordered w-full max-w-xs"
        />
        <select
          defaultValue={catObj.Breed}
          className="select select-bordered w-full max-w-xs"
        >
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <input
          type="checkbox"
          defaultChecked={catObj.Adopted}
          className="checkbox"
        /> Adopted
        <div className="flex gap-2">
          <div className="btn">Update Cat</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const AddCatForm = ({ hidden, hiddenStateUpdater }) => {
  if (hidden) return null;

  const breeds = [
    "Domestic Shorthair",
    "Siamese",
    "Maine Coon",
    "Calico",
    "Persian",
    "Bengal",
    "Sphynx",
    "Ragdoll",
    "Other",
  ];

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Cat</div>
      <div className="flex flex-col gap-2 items-center">
        <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
        <textarea placeholder="Description" className="textarea textarea-bordered w-full max-w-xs" />
        <input type="number" placeholder="Age" className="input input-bordered w-full max-w-xs" />
        <select className="select select-bordered w-full max-w-xs">
          <option value="" disabled selected>
            Select a breed
          </option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <input type="checkbox" className="checkbox" /> Adopted
        <div className="btn" onClick={() => hiddenStateUpdater(true)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

const Cats = () => {
  const [selectedCat, setSelectedCat] = useState(null);
  const [newCatFormHidden, setNewCatFormHidden] = useState(true);
  const [cats, setCats] = useState([
    {
      CatID: 1,
      Name: 'Luna',
      Description: 'A shy black cat who takes time to warm up but loves head scratches.',
      Age: 2,
      Breed: 'Domestic Shorthair',
      Adopted: false,
    },
    {
      CatID: 2,
      Name: 'Peanut',
      Description: 'A playful Siamese who loves to chase feather toys.',
      Age: 1,
      Breed: 'Siamese',
      Adopted: true,
    },
    {
      CatID: 2,
      Name: 'Bella',
      Description: 'A calm and affectionate Maine Coon who enjoys lounging in sunny spots.',
      Age: 3,
      Breed: 'Maine Coon',
      Adopted: true,
    },
    {
      CatID: 2,
      Name: 'Max',
      Description: 'A sweet calico who loves snuggling on laps.',
      Age: 3,
      Breed: 'Calico',
      Adopted: false,
    },
  ]);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8">
        <table className="table" hidden={selectedCat || !newCatFormHidden}>
          <thead>
            <tr>
              <th>
                <button
                  className="btn"
                  onClick={() => {
                    setNewCatFormHidden(false);
                    setSelectedCat({});
                  }}
                >
                  New
                </button>
              </th>
              <th />
              <th>Cat ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Age</th>
              <th>Breed</th>
              <th>Adopted</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((cat) => (
              <tr key={cat.CatID}>
                <th>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedCat({ ...cat, action: 'update' });
                      setNewCatFormHidden(true);
                    }}
                  >
                    Edit
                  </div>
                </th>
                <td>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedCat({ ...cat, action: 'delete' });
                      setNewCatFormHidden(true);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>{cat.CatID}</td>
                <td>{cat.Name}</td>
                <td>{cat.Description}</td>
                <td>{cat.Age}</td>
                <td>{cat.Breed}</td>
                <td>{cat.Adopted ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddCatForm hidden={newCatFormHidden} hiddenStateUpdater={setNewCatFormHidden} />
      {selectedCat?.action === 'update' && (
        <UpdateCatForm catObj={selectedCat} hiddenStateUpdater={setSelectedCat} />
      )}
      {selectedCat?.action === 'delete' && (
        <DeleteCatForm catObj={selectedCat} hiddenStateUpdater={setSelectedCat} />
      )}
    </div>
  );
};

export default Cats;
