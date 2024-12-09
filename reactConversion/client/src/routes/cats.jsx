import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteCatForm = ({ catObj, hiddenStateUpdater, refreshCats }) => {
  if (!catObj) return null;

  const handleDelete = () => {
    axios.delete(`/deleteCat/${catObj.catID}`).then(() => {
      refreshCats();
      hiddenStateUpdater(null);
    });
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Cat</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this cat?</div>
        <div>Cat ID: {catObj.catID}</div>
        <div>Name: {catObj.catName}</div>
        <div>Description: {catObj.catDescription}</div>
        <div>Age: {catObj.age}</div>
        <div>Breed: {catObj.breed}</div>
        <div>Adopted: {catObj.adopted ? 'Yes' : 'No'}</div>
        <div className="flex gap-2">
          <div className="btn" onClick={handleDelete}>Confirm Delete</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

const UpdateCatForm = ({ catObj, hiddenStateUpdater, refreshCats }) => {
  if (!catObj) return null;

  const [catName, setName] = useState(catObj.catName);
  const [catDescription, setDescription] = useState(catObj.catDescription);
  const [age, setAge] = useState(catObj.age);
  const [breed, setBreed] = useState(catObj.breed);
  const [adopted, setAdopted] = useState(catObj.adopted);

  const breeds = [
    'Domestic Shorthair', 'Siamese', 'Maine Coon', 'Calico',
    'Persian', 'Bengal', 'Sphynx', 'Ragdoll', 'Other',
  ];

  const handleUpdate = () => {
    axios.put(`/updateCat/${catObj.catID}`, { catName, catDescription, age, breed, adopted }).then(() => {
      refreshCats();
      hiddenStateUpdater(null);
    });
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Cat</div>
      <div className="flex flex-col gap-2 items-center">
        <label>Name</label>
        <input type="text" placeholder="Be creative!" className="input input-bordered w-full max-w-xs" value={catName} onChange={(e) => setName(e.target.value)} />
        <label>Description</label>
        <textarea placeholder="What does your cat like to do? Make your cat stand out!" value={catDescription} className="textarea textarea-bordered w-full max-w-xs" onChange={(e) => setDescription(e.target.value)} />
        <label>Age</label>
        <input type="number" placeholder="0" className="input input-bordered w-full max-w-xs" value={age} onChange={(e) => setAge(e.target.value)} />
        <label>Breed</label>
        <select value={breed} onChange={(e) => setBreed(e.target.value)} className="select select-bordered w-full max-w-xs">
          {breeds.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <div>
          <input type="checkbox" checked={adopted} onChange={(e) => setAdopted(e.target.checked)} />
          Adopted
        </div>
        <div className="flex gap-2">
          <div className="btn" onClick={handleUpdate}>Update Cat</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

const AddCatForm = ({ hidden, hiddenStateUpdater, refreshCats }) => {
  if (hidden) return null;

  const breeds = [
    'Domestic Shorthair', 'Siamese', 'Maine Coon', 'Calico',
    'Persian', 'Bengal', 'Sphynx', 'Ragdoll', 'Other',
  ];
  const [catName, setName] = useState('');
  const [catDescription, setDescription] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('Domestic Shorthair');
  const [adopted, setAdopted] = useState(false);

  const handleAdd = () => {
    axios.post('/addCat', { catName, catDescription, age, breed, adopted }).then(() => {
      refreshCats();
      hiddenStateUpdater(true);
      setName('');
      setDescription('');
      setAge('');
      setBreed('Domestic Shorthair');
      setAdopted(false);
    });
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Cat</div>
      <div className="flex flex-col gap-2 items-center">
        <label>Name</label>
        <input type="text" placeholder="Be creative!" value={catName} onChange={(e) => setName(e.target.value)} className="input input-bordered w-full max-w-xs"/>
        <label>Description</label>
        <textarea placeholder="What does your cat like to do? Make your cat stand out!" value={catDescription} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered w-full max-w-xs"/>
        <label>Age</label>
        <input type="number" placeholder="0" value={age} onChange={(e) => setAge(e.target.value)} className="input input-bordered w-full max-w-xs"/>
        <label>Breed</label>
        <select value={breed} onChange={(e) => setBreed(e.target.value)} className="select select-bordered w-full max-w-xs">
          {breeds.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <div>
          <input type="checkbox" checked={adopted} onChange={(e) => setAdopted(e.target.checked)} />
          Adopted
        </div>
        <div className="flex gap-2">
          <div className="btn" onClick={handleAdd}>Add Cat</div>
          <div className="btn" onClick={() => {
            hiddenStateUpdater(true)
            setName('');
            setDescription('');
            setAge('');
            setBreed('Domestic Shorthair');
            setAdopted(false);
          }}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

const Cats = () => {
  const [selectedCat, setSelectedCat] = useState(null);
  const [newCatFormHidden, setNewCatFormHidden] = useState(true);
  const [cats, setCats] = useState([]);

  const refreshCats = () => {
    axios.get('/getCats').then((res) => setCats(res.data));
  };

  useEffect(() => {
    refreshCats();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8" hidden={selectedCat !== null || !newCatFormHidden}>
        <table className="table">
          <thead>
            <tr>
              <th><button className="btn" onClick={() => setNewCatFormHidden(false)}>New</button></th>
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
              <tr key={cat.catID}>
                <td>
                  <button className="btn" onClick={() => setSelectedCat({ ...cat, type: 'update' })}>Edit</button>
                </td>
                <td>
                  <button className="btn" onClick={() => setSelectedCat({ ...cat, type: 'delete' })}>Delete</button>
                </td>
                <td>{cat.catID}</td>
                <td>{cat.catName}</td>
                <td>{cat.catDescription}</td>
                <td>{cat.age}</td>
                <td>{cat.breed}</td>
                <td>{cat.adopted ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCat && selectedCat.type === 'delete' && (
        <DeleteCatForm catObj={selectedCat} hiddenStateUpdater={setSelectedCat} refreshCats={refreshCats} />
      )}
      {selectedCat && selectedCat.type === 'update' && (
        <UpdateCatForm catObj={selectedCat} hiddenStateUpdater={setSelectedCat} refreshCats={refreshCats} />
      )}
      <AddCatForm hidden={newCatFormHidden} hiddenStateUpdater={setNewCatFormHidden} refreshCats={refreshCats} />
    </div>
  );
};

export default Cats;