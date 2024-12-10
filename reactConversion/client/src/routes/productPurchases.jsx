import React, { useState } from 'react';

const DeleteProductPurchaseForm = ({ productPurchaseObj, hiddenStateUpdater }) => {
  if (!productPurchaseObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Product Purchase</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this product purchase?</div>
        <div>Product Purchase ID: {productPurchaseObj.ProductPurchaseID}</div>
        <div>Purchase ID: {productPurchaseObj.PurchaseID}</div>
        <div>Product ID: {productPurchaseObj.ProductID}</div>
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

const UpdateProductPurchaseForm = ({ productPurchaseObj, hiddenStateUpdater }) => {
  if (!productPurchaseObj) return null;

  const [productID, setProductID] = useState(productPurchaseObj.purchaseID);
  const [productIDs, setProductIDs] = useState([]);

  useEffect(() => {
    axios.get("/getProducts").then((res) => {
      setProductIDs(res.data)
    })
  }, [])

  const [purchaseID, setPurchaseID] = useState(productPurchaseObj.purchaseID);
  const [purchaseIDs, setPurchaseIDs] = useState([]);

  useEffect(() => {
    axios.get("/getPurchases").then((res) => {
      setPurchaseIDs(res.data)
    })
  }, [])

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Product Purchase</div>
      <div className="flex flex-col gap-2 items-center">
        <label>Product ID</label>
        <select
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" disabled>Select a Product ID</option>
          {productIDs.map((product) => (
            <option key={product.productID} value={product.productID}>
              {product.productID} - {product.name}
            </option>
          ))}
        </select>
        <label>Purchase ID</label>
        <select
          value={purchaseID}
          onChange={(e) => setPurchaseID(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" disabled>Select a Purchase ID</option>
          {purchaseIDs.map((purchase) => (
            <option key={purchase.purchaseID} value={purchase.purchaseID}>
              {purchase.purchaseID} - {purchase.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Product ID"
          defaultValue={productPurchaseObj.ProductID}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn">Update Product Purchase</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const AddProductPurchaseForm = ({ hidden, hiddenStateUpdater }) => {
  if (hidden) return null;

  const [productID, setProductID] = useState(productPurchaseObj.purchaseID);
  const [productIDs, setProductIDs] = useState([]);

  useEffect(() => {
    axios.get("/getProducts").then((res) => {
      setProductIDs(res.data)
    })
  }, [])

  const [purchaseID, setPurchaseID] = useState(productPurchaseObj.purchaseID);
  const [purchaseIDs, setPurchaseIDs] = useState([]);

  useEffect(() => {
    axios.get("/getPurchases").then((res) => {
      setPurchaseIDs(res.data)
    })
  }, [])

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Product Purchase</div>
      <div className="flex flex-col gap-2 items-center">
      <label>Product ID</label>
        <select
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" disabled>Select a Product ID</option>
          {productIDs.map((product) => (
            <option key={product.productID} value={product.productID}>
              {product.productID} - {product.productName}
            </option>
          ))}
        </select>
        <label>Purchase ID</label>
        <select
          value={purchaseID}
          onChange={(e) => setPurchaseID(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="" disabled>Select a Purchase ID</option>
          {purchaseIDs.map((purchase) => (
            <option key={purchase.purchaseID} value={purchase.purchaseID}>
              {purchase.purchaseID} - {purchase.purchaseDate}
            </option>
          ))}
        </select>
        <div className="btn" onClick={() => hiddenStateUpdater(true)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

const ProductPurchases = () => {
  const [selectedProductPurchase, setSelectedProductPurchase] = useState(null);
  const [newProductPurchaseFormHidden, setNewProductPurchaseFormHidden] = useState(true);
  const [productPurchases, setProductPurchases] = useState([
    { ProductPurchaseID: 1, PurchaseID: 1, ProductID: 2 },
    { ProductPurchaseID: 2, PurchaseID: 2, ProductID: 8 },
    { ProductPurchaseID: 3, PurchaseID: 3, ProductID: 6 },
    { ProductPurchaseID: 4, PurchaseID: 4, ProductID: 3 },
    { ProductPurchaseID: 5, PurchaseID: 3, ProductID: 6 },
  ]);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8">
        <table className="table" hidden={selectedProductPurchase || !newProductPurchaseFormHidden}>
          <thead>
            <tr>
              <th>
                <button
                  className="btn"
                  onClick={() => {
                    setNewProductPurchaseFormHidden(false);
                    setSelectedProductPurchase({});
                  }}
                >
                  New
                </button>
              </th>
              <th />
              <th>Product Purchase ID</th>
              <th>Purchase ID</th>
              <th>Product ID</th>
            </tr>
          </thead>
          <tbody>
            {productPurchases.map((productPurchase) => (
              <tr key={productPurchase.ProductPurchaseID}>
                <th>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedProductPurchase({ ...productPurchase, action: 'update' });
                      setNewProductPurchaseFormHidden(true);
                    }}
                  >
                    Edit
                  </div>
                </th>
                <td>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedProductPurchase({ ...productPurchase, action: 'delete' });
                      setNewProductPurchaseFormHidden(true);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>{productPurchase.ProductPurchaseID}</td>
                <td>{productPurchase.PurchaseID}</td>
                <td>{productPurchase.ProductID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProductPurchaseForm
        hidden={newProductPurchaseFormHidden}
        hiddenStateUpdater={setNewProductPurchaseFormHidden}
      />
      {selectedProductPurchase?.action === 'update' && (
        <UpdateProductPurchaseForm
          productPurchaseObj={selectedProductPurchase}
          hiddenStateUpdater={setSelectedProductPurchase}
        />
      )}
      {selectedProductPurchase?.action === 'delete' && (
        <DeleteProductPurchaseForm
          productPurchaseObj={selectedProductPurchase}
          hiddenStateUpdater={setSelectedProductPurchase}
        />
      )}
    </div>
  );
};

export default ProductPurchases;
