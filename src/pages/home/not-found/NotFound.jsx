import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="overflow-x-hidden bg-gray-100 h-screen justify-center flex ">
      <section className="relative py-12 sm:py-16 items-center justify-center flex  ">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8  max-w-7xl">
          <div className="max-w-3xl justify-center items-center flex flex-col  mx-auto text-center">
            <div className="flex flex-row mt-5 justify-center text-center items-center gap-2 ">
              <h1 className="text-4xl font-normal leading-tight text-gray-900  sm:leading-tight  lg:leading-tight font-pj">
                Page not found!!
              </h1>
            </div>

            <div className="relative inline-flex mt-5 group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px  rounded-lg blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

              <Link
                to="./"
                className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-normal text-gray-200 transition-all duration-200 bg-gray-900 font-pj rounded-xl "
                role="button"
              >
                Go to homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
