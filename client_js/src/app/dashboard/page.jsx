"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Link from 'next/link';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true)
  // const itemsPerPage = 30;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const skip = (currentPage - 1) * 30;
        console.log(skip)
        const response = await axios.get(`https://dummyjson.com/users?sortBy=firstName&order=${sortOrder}&skip=${skip}&limit=30`);
        console.log(response.data)

        setUsers(response.data.users);
        setTotalUsers(response.data.total);
      } catch (err) {
        console.log(err)
        Toastify({
          text: "Failed to fetch users. Please try again.",
          duration: 3000,
          close: true,
          gravity: "bottom",
          position: "right",
          backgroundColor: "#ff0000",
          stopOnFocus: true,
        }).showToast();
      } finally {
        setLoading(false)
      }
    };
    fetchUsers();
  }, [sortOrder, currentPage]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/users/search?q=${searchQuery}`);

      setUsers(response.data.users);
    } catch (err) {
      setError('Failed to search users. Please try again.');
    }
  };

  const totalPages = Math.ceil(totalUsers / 30);
  console.log(totalPages)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='dark:bg-gray-900'>
      <section className="container px-4 mx-auto ">
        <div className="sm:flex sm:items-center sm:justify-between pt-8">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white">Users</h2>

              <span className="px-3 py-1 text-xs text-emerald-600 bg-emerald-100 rounded-full dark:bg-gray-800 dark:text-emerald-400">{totalUsers} people</span>
            </div>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These users have registered in the last 12 months.</p>
          </div>

          <div className="flex justify-end items-center mt-4 gap-x-3">
            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-gray-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-gray-300 dark:focus:ring-gray-400 focus:ring dark:bg-gray-800 focus:outline-none">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <Link href={'/adduser'} className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:bg-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <span>Add user</span>
            </Link>
          </div>
        </div>

        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div className='w-full flex items-center'>
            <div className="relative flex items-center justify-normal mt-4 md:mt-0">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-3 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-gray-300 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              <button onClick={handleSearch} className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:bg-emerald-600 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-white dark:text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              {loading ? (
                <div className='lg:h-full flex justify-center items-center text-center lg:w-full'>
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : (
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <button className="flex items-center gap-x-3 focus:outline-none">
                            <span>Name</span>
                          </button>
                        </th>
                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          Picture
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          University
                        </th>

                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">User Agent</th>

                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">{user.firstName} {user.lastName}</h2>
                              <p className="text-sm font-normal text-gray-600 dark:text-gray-400">{user.email}</p>
                            </div>
                          </td>
                          <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={user.image}
                                  alt="User Image" />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div>
                              <h4 className="text-gray-700 dark:text-gray-200">{user.university}</h4>
                              <p className="text-gray-500 dark:text-gray-400">{user.address.address} {user.address.city}</p>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm w-96">
                            <div className='w-96'>
                              <p className="text-gray-500 dark:text-gray-400 font-mono">{user.userAgent}</p>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <Link href={`/edituser/${user.id}`}>
                              <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}

        <div className="py-8 sm:flex sm:items-center sm:justify-between ">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page <span className="font-medium text-gray-700 dark:text-gray-100">{currentPage} of {totalPages}</span>
          </div>

          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>

              <span>
                Previous
              </span>
            </button>

            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-600">
              <span>
                Next
              </span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
