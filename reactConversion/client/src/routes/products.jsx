import React, { useState } from 'react';

const DeleteProductForm = ({ productObj, hiddenStateUpdater }) => {
  if (!productObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Product</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this product?</div>
        <div>Product ID: {productObj.ProductID}</div>
        <div>Name: {productObj.Name}</div>
        <div>Price: ${productObj.Price}</div>
        <div>Category: {productObj.Category}</div>
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

const UpdateProductForm = ({ productObj, hiddenStateUpdater }) => {
  if (!productObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Product</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Product ID: {productObj.ProductID}</div>
        <input
          type="text"
          placeholder="Name"
          defaultValue={productObj.Name}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Price"
          defaultValue={productObj.Price}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Category"
          defaultValue={productObj.Category}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn">Update Product</div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const AddProductForm = ({ hidden, hiddenStateUpdater }) => {
  if (hidden) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Product</div>
      <div className="flex flex-col gap-2 items-center">
        <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
        <input type="number" placeholder="Price" className="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="Category" className="input input-bordered w-full max-w-xs" />
        <div className="btn" onClick={() => hiddenStateUpdater(true)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductFormHidden, setNewProductFormHidden] = useState(true);
  const [products, setProducts] = useState([
    { ProductID: 1, Name: 'Cat-ppuccino', Price: 4.50, Category: 'Drink' },
    { ProductID: 2, Name: 'Meowcha Latte', Price: 5.00, Category: 'Drink' },
    { ProductID: 3, Name: 'Milk Tea with Boba', Price: 5.25, Category: 'Drink' },
    { ProductID: 4, Name: 'Pepp-paw-mint Tea', Price: 3.00, Category: 'Drink' },
    { ProductID: 5, Name: 'Kitty Cake Pop', Price: 2.50, Category: 'Snack' },
    { ProductID: 6, Name: 'Catnip Cookie', Price: 1.50, Category: 'Snack' },
    { ProductID: 7, Name: 'Paw Print Mini-Waffles (3)', Price: 3.50, Category: 'Snack' },
    { ProductID: 8, Name: 'Paws & Pastries Cat Cafe Mug', Price: 12.00, Category: 'Merchandise' },
    { ProductID: 9, Name: 'Paws & Pastries Cat Cafe Bag', Price: 15.00, Category: 'Merchandise' },
    { ProductID: 10, Name: 'Kitty Sweater', Price: 20.00, Category: 'Merchandise' },
  ]);

  return (
    <div>
      <div className="overflow-x-auto max-w-[85%] mx-auto mt-8">
        <table className="table" hidden={selectedProduct || !newProductFormHidden}>
          <thead>
            <tr>
              <th>
                <button
                  className="btn"
                  onClick={() => {
                    setNewProductFormHidden(false);
                    setSelectedProduct({});
                  }}
                >
                  New
                </button>
              </th>
              <th />
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.ProductID}>
                <th>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedProduct({ ...product, action: 'update' });
                      setNewProductFormHidden(true);
                    }}
                  >
                    Edit
                  </div>
                </th>
                <td>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedProduct({ ...product, action: 'delete' });
                      setNewProductFormHidden(true);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>{product.ProductID}</td>
                <td>{product.Name}</td>
                <td>${product.Price}</td>
                <td>{product.Category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProductForm hidden={newProductFormHidden} hiddenStateUpdater={setNewProductFormHidden} />
      {selectedProduct?.action === 'update' && (
        <UpdateProductForm productObj={selectedProduct} hiddenStateUpdater={setSelectedProduct} />
      )}
      {selectedProduct?.action === 'delete' && (
        <DeleteProductForm productObj={selectedProduct} hiddenStateUpdater={setSelectedProduct} />
      )}
    </div>
  );
};

export default Products;
