"use client"

import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Image from 'next/image';

export default function AddUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axios.post('https://dummyjson.com/users/add', data);
      console.log(response)
      // this api will not add data, just throw 201

      //if success add? throw 201!
      if (response.status === 201) {
        Toastify({
          text: "Success adding User!",
          duration: 3000,
          close: true,
          gravity: "bottom",
          position: "right",
          backgroundColor: "#4CAF50",
          stopOnFocus: true,
        }).showToast();
        router.push('/dashboard');
      }

    } catch (err) {
      console.log(err)
      Toastify({
        text: "Failed to add user. Please try again.",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#ff0000",
        stopOnFocus: true,
      }).showToast();
    }
  };

  return (
    <>
      {/* <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 w-96 shadow-xl p-5">
          <figure className='mb-4'>
            <Image
              src={'/pattern2.avif'}
              alt="Pattern"
              width={2670}
              height={1670}
            />
          </figure>

          <h2 className="text-2xl mb-4">Add User</h2>

          <div className='lg:flex lg:gap-5'>
            <div>
              <div className="mb-4">
                <label className="block mb-1">First Name</label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-1">Last Name</label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label className="block mb-1">Age</label>
                <input
                  {...register('age', {
                    required: 'Age is required',
                    valueAsNumber: true,
                    validate: value => value > 0 || 'Age must be a positive number',
                  })}
                  type="number"
                  className="input input-bordered w-full max-w-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

                />
                {errors.age && <p className="text-red-500">{errors.age.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  // https://react-hook-form.com/docs/useform/register#options
                  type="email"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          <button type="submit" className="w-full btn btn-secondary">
            Add User
          </button>
        </form>
      </div> */}

      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:flex lg:justify-center lg:items-center lg:w-2/3"
          >
            <div className='w-2/3'>
              <Image
                src={'/adduser.png'}
                alt="Hero"
                width={1460}
                height={2460}
                className='w-2/3'
              />
            </div>

          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold dark:text-white sm:text-3xl">Add User</h2>
              <p className="max-w-xl mt-3 text-gray-400 dark:text-gray-300">
                In autem
                ipsa, nulla laboriosam dolores, repellendus perferendis libero
                suscipit nam temporibus molestiae
              </p>
              <div className="mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      First Name
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      type="text"
                      id="firstName"
                      placeholder='John'
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Last Name
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      type="text"
                      id="lastName"
                      placeholder='Doe'
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.firstName && <p className="text-red-500">{errors.lastName.message}</p>}
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="age"
                      className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                    >
                      Age
                    </label>
                    <input
                      {...register('age', {
                        required: 'Age is required',
                        valueAsNumber: true,
                        validate: value => value > 0 || 'Age must be a positive number',
                      })}
                      type="number"
                      id="age"
                      placeholder='eg: 24'

                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {errors.firstName && <p className="text-red-500">{errors.age.message}</p>}
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="email"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Email
                      </label>
                    </div>

                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                      // https://react-hook-form.com/docs/useform/register#options
                      type="email"
                      id="email"
                      placeholder='johndoe@mail.com'
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.firstName && <p className="text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-400 focus:outline-none focus:bg-emerald-400 focus:ring focus:ring-emerald-300 focus:ring-opacity-50">
                      Add User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
