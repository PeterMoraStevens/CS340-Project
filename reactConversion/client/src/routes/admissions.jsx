import React, { useState } from 'react';

const DeleteAdmissionForm = ({ admissionObj, hiddenStateUpdater }) => {
  if (!admissionObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Admission</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this admission?</div>
        <div>Admission ID: {admissionObj.AdmissionID}</div>
        <div>Customer ID: {admissionObj.CustomerID}</div>
        <div className="flex gap-2">
          <div
            className="btn"
            onClick={() => {
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

const UpdateAdmissionForm = ({ admissionObj, hiddenStateUpdater }) => {
  if (!admissionObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Admission</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Admission ID: {admissionObj.AdmissionID}</div>
        <input
          type="number"
          placeholder="Customer ID"
          defaultValue={admissionObj.CustomerID}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="date"
          placeholder="Admission Date"
          defaultValue={admissionObj.Date}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Duration (in minutes)"
          defaultValue={admissionObj.Duration}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Fee (in dollars)"
          defaultValue={admissionObj.Fee}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn">Update Admission</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const AddAdmissionForm = ({ hidden, hiddenStateUpdater }) => {
  if (hidden) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Admission</div>
      <div className="flex flex-col gap-2 items-center">
        <input type="number" placeholder="Customer ID" className="input input-bordered w-full max-w-xs" />
        <input type="date" placeholder="Admission Date" className="input input-bordered w-full max-w-xs" />
        <input type="number" placeholder="Duration (in minutes)" className="input input-bordered w-full max-w-xs" />
        <input type="number" placeholder="Fee (in dollars)" className="input input-bordered w-full max-w-xs" />
        <div className="btn" onClick={() => hiddenStateUpdater(true)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

const Admissions = () => {
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [newAdmissionFormHidden, setNewAdmissionFormHidden] = useState(true);
  const [admissions, setAdmissions] = useState([
    {
      AdmissionID: 1,
      CustomerID: 4,
      Date: '8/7/2022',
      Duration: 30,
      Fee: 10.0,
    },
    {
      AdmissionID: 2,
      CustomerID: 3,
      Date: '2/25/2023',
      Duration: 15,
      Fee: 5.0,
    },
    {
      AdmissionID: 3,
      CustomerID: 4,
      Date: '3/12/2023',
      Duration: 60,
      Fee: 20.0,
    },
    {
      AdmissionID: 4,
      CustomerID: 1,
      Date: '10/10/2024',
      Duration: 30,
      Fee: 10.0,
    },
  ]);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8">
        <table className="table" hidden={selectedAdmission || !newAdmissionFormHidden}>
          <thead>
            <tr>
              <th>
                <button className="btn" onClick={() => {
                  setNewAdmissionFormHidden(false)
                  setSelectedAdmission({})
                }}>
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
              <tr key={admission.AdmissionID}>
                <th>
                  <div className="btn" onClick={() => {
                    setSelectedAdmission({ ...admission, action: 'update' })
                    setNewAdmissionFormHidden(true)
                  }}>
                    Edit
                  </div>
                </th>
                <td>
                  <div className="btn" onClick={() => {
                    setSelectedAdmission({ ...admission, action: 'delete' })
                    setNewAdmissionFormHidden(true)
                  }}>
                    Delete
                  </div>
                </td>
                <td>{admission.AdmissionID}</td>
                <td>{admission.CustomerID}</td>
                <td>{admission.Date}</td>
                <td>{admission.Duration}</td>
                <td>${admission.Fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddAdmissionForm hidden={newAdmissionFormHidden} hiddenStateUpdater={setNewAdmissionFormHidden} />
      {selectedAdmission?.action === 'update' && (
        <UpdateAdmissionForm admissionObj={selectedAdmission} hiddenStateUpdater={setSelectedAdmission} />
      )}
      {selectedAdmission?.action === 'delete' && (
        <DeleteAdmissionForm admissionObj={selectedAdmission} hiddenStateUpdater={setSelectedAdmission} />
      )}
    </div>
  );
};

export default Admissions;
