import React from 'react'
import { Link } from 'react-router-dom'
import homeImg from "../assets/welcomeCat.svg"
import homeImg2 from "../assets/parkCat.svg"

const Landing = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-[50vh]">
        <div className="hero-content flex-col lg:flex-row max-w-[75%]">
          <img
            src={homeImg}
            className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Welcome to the Paws & Pastries Cat Cafe!</h1>
            <p className="py-6">
              We partner with the local Humane Society to provide a living space for
              15-25 cats at a time, and help connect felines to forever families.
            </p>
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 min-h-[50vh]">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-[75%]">
          <img
            src={homeImg2}
            className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <p className="py-6">
              Patrons can study and purchase drinks from
              the cafe, or relax and play with the cats in the cat lounge.
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Landing