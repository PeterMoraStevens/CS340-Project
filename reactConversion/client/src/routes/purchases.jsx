import React, { useState } from 'react';

const DeletePurchaseForm = ({ purchaseObj, hiddenStateUpdater }) => {
  if (!purchaseObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Purchase</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this purchase?</div>
        <div>Purchase ID: {purchaseObj.PurchaseID}</div>
        <div>Customer ID: {purchaseObj.CustomerID}</div>
        <div>Date: {purchaseObj.Date}</div>
        <div>Cost: ${purchaseObj.Cost}</div>
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

const UpdatePurchaseForm = ({ purchaseObj, hiddenStateUpdater }) => {
  if (!purchaseObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Purchase</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Purchase ID: {purchaseObj.PurchaseID}</div>
        <input
          type="number"
          placeholder="Customer ID"
          defaultValue={purchaseObj.CustomerID}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="date"
          placeholder="Date"
          defaultValue={purchaseObj.Date}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Cost (in dollars)"
          defaultValue={purchaseObj.Cost}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn">Update Purchase</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const AddPurchaseForm = ({ hidden, hiddenStateUpdater }) => {
  if (hidden) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Purchase</div>
      <div className="flex flex-col gap-2 items-center">
        <input type="number" placeholder="Customer ID" className="input input-bordered w-full max-w-xs" />
        <input type="date" placeholder="Date" className="input input-bordered w-full max-w-xs" />
        <input type="number" placeholder="Cost (in dollars)" className="input input-bordered w-full max-w-xs" />
        <div className="btn" onClick={() => hiddenStateUpdater(true)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

const Purchases = () => {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [newPurchaseFormHidden, setNewPurchaseFormHidden] = useState(true);
  const [purchases, setPurchases] = useState([
    { PurchaseID: 1, CustomerID: 4, Date: '10/31/2023', Cost: 5.00 },
    { PurchaseID: 2, CustomerID: 4, Date: '8/21/2024', Cost: 12.00 },
    { PurchaseID: 3, CustomerID: 1, Date: '09/04/2024', Cost: 3.00 },
    { PurchaseID: 4, CustomerID: 2, Date: '10/04/2002', Cost: 5.25 },
  ]);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8">
        <table className="table" hidden={selectedPurchase || !newPurchaseFormHidden}>
          <thead>
            <tr>
              <th>
                <button
                  className="btn"
                  onClick={() => {
                    setNewPurchaseFormHidden(false);
                    setSelectedPurchase({});
                  }}
                >
                  New
                </button>
              </th>
              <th />
              <th>Purchase ID</th>
              <th>Customer ID</th>
              <th>Date</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.PurchaseID}>
                <th>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedPurchase({ ...purchase, action: 'update' });
                      setNewPurchaseFormHidden(true);
                    }}
                  >
                    Edit
                  </div>
                </th>
                <td>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedPurchase({ ...purchase, action: 'delete' });
                      setNewPurchaseFormHidden(true);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>{purchase.PurchaseID}</td>
                <td>{purchase.CustomerID}</td>
                <td>{purchase.Date}</td>
                <td>${purchase.Cost.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddPurchaseForm hidden={newPurchaseFormHidden} hiddenStateUpdater={setNewPurchaseFormHidden} />
      {selectedPurchase?.action === 'update' && (
        <UpdatePurchaseForm purchaseObj={selectedPurchase} hiddenStateUpdater={setSelectedPurchase} />
      )}
      {selectedPurchase?.action === 'delete' && (
        <DeletePurchaseForm purchaseObj={selectedPurchase} hiddenStateUpdater={setSelectedPurchase} />
      )}
    </div>
  );
};

export default Purchases;
