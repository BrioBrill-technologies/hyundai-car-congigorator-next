import { useState } from "react";
import logo from '../assets/logo.png'
import Image from "next/image";

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-8">
      <a href="/">
        <Image
          src={logo}
          alt="logo"
          width={75}
          height={75}
          className="mx-auto mt-2"
        />
        {/* <img src={logo} alt="logo" className="w-2/12"/> */}
      </a>
    </div>
  );
}