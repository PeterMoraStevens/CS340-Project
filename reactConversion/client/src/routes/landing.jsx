import React from 'react'
import { Link } from 'react-router-dom'
import homeImg from "../assets/cat_coffee_cup.png"
import homeImg2 from "../assets/parkCat.svg"

const Landing = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-[50vh]">
        <div className="hero-content flex-col lg:flex-row max-w-[75%]">
          <img
            src={homeImg}
            className="max-w-sm" />
          <div>
            <h1 className="text-5xl font-bold">Welcome to the Paws & Pastries Cat Cafe!</h1>
            <p className="py-6">
              At Paws & Pastries, we believe every cat deserves a loving home - and we're here to 
              make that happen while offering you a cozy spot to sip, snack, and relax!
            </p>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-[50vh]">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-[75%]">
          <img
            src={homeImg2}
            className="max-w-sm rounded-lg shadow-2xl" />
          <div className="py-6">
            <p>We partner with the local Humane Society to provide a living space for up to 25 cats at a time, and help connect felines to forever families.</p>
            <p>Through this partnership, we've facilitated over 150 adoptions annually!</p>
            <p>Feel free to unwind in our dedicated cat lounge where you can play, cuddle, and connect with the cats. 
              You can also enjoy delicious drinks such as the Cat-ppuccino, the Meowcha Latte, or (our holiday favorite) a warm cup of Pep-paw-mint Tea.</p>
            <p>Every purchase, from a latte to a kitty sweater, helps us continue our mission to connect cats with loving families. 
              Thank you for being a part of our journey to make a difference!</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Landing