import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-xl" to={"/"}>Paws & Pastries Cat Cafe</Link>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li><Link to={"/admissions"} className="btn btn-ghost">Admissions</Link></li>
          <li><Link to={"/adoptions"} className="btn btn-ghost">Adoptions</Link></li>
          <li><Link to={"/cats"} className="btn btn-ghost">Cats</Link></li>
          <li><Link to={"/customers"} className="btn btn-ghost">Customers</Link></li>
          <li><Link to={"/products"} className="btn btn-ghost">Products</Link></li>
          <li><Link to={"/productPurchases"} className="btn btn-ghost">Product Purchases</Link></li>
          <li><Link to={"/purchases"} className="btn btn-ghost">Purchases</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar

// [<a href="index.html">Home</a> | <a href="admissions.html">Admissions</a> | <a href="adoptions.html">Adoptions</a>
// | <a href="cats.html">Cats</a> | <a href="customers.html">Customers</a> | <a href="productInventory.html">Product
//   Inventory</a> | <a href="productPurchases.html">Product Purchases</a> | <a href="purchases.html">Purchases</a>]