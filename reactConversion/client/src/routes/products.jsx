import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteProductForm = ({ productObj, hiddenStateUpdater, refreshProducts }) => {
  if (!productObj) return null;

  const handleDelete = () => {
    axios
      .delete(`/deleteProduct/${productObj.productID}`)
      .then(() => {
        refreshProducts();
        hiddenStateUpdater(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Delete Product</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Are you sure you want to delete this product?</div>
        <div>Product ID: {productObj.productID}</div>
        <div>Name: {productObj.productName}</div>
        <div>Price: ${productObj.price}</div>
        <div>Category: {productObj.productCategory}</div>
        <div className="flex gap-2">
          <div className="btn" onClick={handleDelete}>
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

const UpdateProductForm = ({ productObj, hiddenStateUpdater, refreshProducts }) => {
  const [formData, setFormData] = useState({
    productName: productObj.productName,
    price: productObj.price,
    productCategory: productObj.productCategory,
  });

  const handleUpdate = () => {
    axios
      .put(`/updateProduct/${productObj.productID}`, formData)
      .then(() => {
        refreshProducts();
        hiddenStateUpdater(null);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!productObj) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Update Product</div>
      <div className="flex flex-col gap-2 items-center">
        <div>Product ID: {productObj.productID}</div>
        <input
          type="text"
          name="productName"
          placeholder="Name"
          value={formData.productName}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="productCategory"
          placeholder="Category"
          value={formData.productCategory}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn" onClick={handleUpdate}>
            Update Product
          </div>
          <div className="btn" onClick={() => hiddenStateUpdater(null)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const AddProductForm = ({ hidden, hiddenStateUpdater, refreshProducts }) => {
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    productCategory: "",
  });

  const handleAdd = () => {
    axios
      .post("/addProduct", formData)
      .then(() => {
        refreshProducts();
        hiddenStateUpdater(true);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (hidden) return null;

  return (
    <div className="mt-8">
      <div className="font-bold text-center">Add Product</div>
      <div className="flex flex-col gap-2 items-center">
        <input
          type="text"
          name="productName"
          placeholder="Name"
          value={formData.productName}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="productCategory"
          placeholder="Category"
          value={formData.productCategory}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-2">
          <div className="btn" onClick={handleAdd}>
            Add Product
          </div>
          <div className="btn" onClick={() => hiddenStateUpdater(true)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProductFormHidden, setNewProductFormHidden] = useState(true);
  const [products, setProducts] = useState([]);

  const refreshProducts = () => {
    axios
      .get("/getProducts")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div>
      <div
        className="overflow-x-auto max-w-[85%] mx-auto mt-8"
        hidden={selectedProduct !== null || !newProductFormHidden}
      >
        <table className="table">
          <thead>
            <tr>
              <th>
                <button
                  className="btn"
                  onClick={() => {
                    setNewProductFormHidden(false);
                    setSelectedProduct(null);
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
              <tr key={product.productID}>
                <th>
                  <div
                    className="btn"
                    onClick={() => {
                      setSelectedProduct({ ...product, action: "update" });
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
                      setSelectedProduct({ ...product, action: "delete" });
                      setNewProductFormHidden(true);
                    }}
                  >
                    Delete
                  </div>
                </td>
                <td>{product.productID}</td>
                <td>{product.productName}</td>
                <td>${product.price}</td>
                <td>{product.productCategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProductForm
        hidden={newProductFormHidden}
        hiddenStateUpdater={setNewProductFormHidden}
        refreshProducts={refreshProducts}
      />
      {selectedProduct?.action === "update" && (
        <UpdateProductForm
          productObj={selectedProduct}
          hiddenStateUpdater={setSelectedProduct}
          refreshProducts={refreshProducts}
        />
      )}
      {selectedProduct?.action === "delete" && (
        <DeleteProductForm
          productObj={selectedProduct}
          hiddenStateUpdater={setSelectedProduct}
          refreshProducts={refreshProducts}
        />
      )}
    </div>
  );
};

export default Products;
