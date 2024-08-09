"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useSelector } from 'react-redux';


const Navbar = () => {
  const router = useRouter();
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser)

  function handleLogout() {
    Cookies.remove("token");
    router.push("/");
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={'/dashboard'} className="btn btn-ghost text-xl">ADW</Link>
      </div>
      <div className="flex-none space-x-2">
        <div className="lg:hidden">
          {currentUser && (
            <span>Hello, {currentUser?.firstName} {currentUser?.lastName}</span>
          )}
        </div>
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          <li >
            {currentUser && (
              <span>Hello, {currentUser?.firstName} {currentUser?.lastName}</span>
            )}
          </li>
          <li><Link href={'/dashboard'}>Dashboard</Link></li>
          <li><Link href={'/adduser'}>Add User</Link></li>
          <li>
            <div onClick={handleLogout}>
              Logout
            </div>
          </li>
        </ul>
        {/* <ul className="menu menu-horizontal dropdown-content px-1 lg:hidden">
          <li>
            <details>
              <summary>Menu</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li ><Link href={'/dashboard'}>Dashboard</Link></li>
                <li><Link href={'/adduser'}>Add User</Link></li>
                <li>
                  <div onClick={handleLogout}>
                    Logout
                  </div>
                </li>
              </ul>
            </details>
          </li>
        </ul> */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Profile Picture User"
                src={currentUser?.image} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-auto p-2 shadow">
            <li><Link href={'/dashboard'}>Dashboard</Link></li>
            <li><Link href={'/adduser'}>Add User</Link></li>
            <li>
              <div onClick={handleLogout}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
