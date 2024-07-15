import { useState } from "react";
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-8">
      <a href="/">
        <img src={logo} alt="logo" className="w-2/12"/>
      </a>
    </div>
  );
}