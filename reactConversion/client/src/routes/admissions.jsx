import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import axios from "axios";

const DeleteAdmissionForm = ({ admissionObj, hiddenStateUpdater, refreshAdmissions }) => {
  if (!admissionObj) return null;

  const handleDelete = () => {
    axios.delete(`/deleteAdmission/${admissionObj.admissionID}`).then(() => {
      refreshAdmissions();
      hiddenStateUpdater(null);
    });
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Admission</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this admission?</div>
        <div>Admission ID: {admissionObj.admissionID}</div>
        <div>Customer ID: {admissionObj.customerID}</div>
        <div>Date: {admissionObj.admissionDate}</div>
        <div>Duration: {admissionObj.duration} minutes</div>
        <div>Fee: ${admissionObj.fee}</div>
        <div className="flex gap-2">
          <div className="btn" onClick={handleDelete}>Confirm Delete</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

const UpdateAdmissionForm = ({ admissionObj, hiddenStateUpdater, refreshAdmissions }) => {
  if (!admissionObj) return null;

  const [customerID, setCustomerID] = useState(admissionObj.customerID);
  const [date, setDate] = useState(admissionObj.admissionDate);
  const [duration, setDuration] = useState(admissionObj.duration);
  const [fee, setFee] = useState(admissionObj.fee);

  const handleUpdate = () => {
    axios.put(`/updateAdmission/${admissionObj.admissionID}`, { customerID, date, duration, fee }).then(() => {
      refreshAdmissions();
      hiddenStateUpdater(null);
    });
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Admission</div>
      <div className="flex flex-col gap-2 items-center">
        <label>Customer ID </label>
        <input
          type="number"
          placeholder="1"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Date </label>
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Duration (minutes) </label>
        <input
          type="number"
          placeholder="30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Fee (dollars) $</label>
        <input
          type="number"
          placeholder="10.00"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn" onClick={handleUpdate}>Update Admission</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

const AddAdmissionForm = ({ hidden, hiddenStateUpdater, refreshAdmissions }) => {
  const [customerID, setCustomerID] = useState('');
  const [admissionDate, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [fee, setFee] = useState('');

  const handleAdd = () => {
    axios.post('/addAdmission', { customerID, admissionDate, duration, fee }).then(() => {
      refreshAdmissions();
      hiddenStateUpdater(true);
      setCustomerID("");
      setDate("");
      setDuration("");
      setFee("");
    });
  };

  if (hidden) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Admission</div>
      <div className="flex flex-col gap-2 items-center">
        <label>Customer ID </label>
        <input
          type="number"
          placeholder="1"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Date </label>
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          value={admissionDate}
          onChange={(e) => {
            setDate(e.target.value)
            console.log(admissionDate)
          }}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Duration (minutes) </label>
        <input
          type="number"
          placeholder="30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <label>Fee (dollars) $</label>
        <input
          type="number"
          placeholder="10.00"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn" onClick={handleAdd}>Add Admission</div>
          <div className="btn" onClick={() => hiddenStateUpdater(true)}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

const Admissions = () => {
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [newAdmissionFormHidden, setNewAdmissionFormHidden] = useState(true);
  const [admissions, setAdmissions] = useState([]);

  const refreshAdmissions = () => {
    axios.get("/getAdmissions").then((res) => {
      setAdmissions(res.data);
    });
  };

  useEffect(() => {
    refreshAdmissions();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8" hidden={selectedAdmission !== null || newAdmissionFormHidden !== true}>
        <table className="table">
          <thead>
            <tr>
              <th>
                <button
                  className="btn"
                  onClick={() => {
                    setNewAdmissionFormHidden(false);
                    setSelectedAdmission(null);
                  }}
                >
                  New
                </button>
              </th>
              <th />
              <th>Admission ID</th>
              <th>Customer ID</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission) => (
              <tr key={admission.admissionID}>
                <th>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedAdmission({ ...admission, action: 'update' });
                      setNewAdmissionFormHidden(true);
                    }}
                  >
                    Edit
                  </div>
                </th>
                <td>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedAdmission({ ...admission, action: 'delete' });
                      setNewAdmissionFormHidden(true);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>{admission.admissionID}</td>
                <td>{admission.customerID}</td>
                <td>
                  {admission.admissionDate}
                </td>
                <td>{admission.duration} minutes</td>
                <td>${admission.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddAdmissionForm hidden={newAdmissionFormHidden} hiddenStateUpdater={setNewAdmissionFormHidden} refreshAdmissions={refreshAdmissions} />
      {selectedAdmission?.action === 'update' && (
        <UpdateAdmissionForm admissionObj={selectedAdmission} hiddenStateUpdater={setSelectedAdmission} refreshAdmissions={refreshAdmissions} />
      )}
      {selectedAdmission?.action === 'delete' && (
        <DeleteAdmissionForm admissionObj={selectedAdmission} hiddenStateUpdater={setSelectedAdmission} refreshAdmissions={refreshAdmissions} />
      )}
    </div>
  );
};

export default Admissions;
