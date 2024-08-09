"use client"

import Image from "next/image";
// import { useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import Toastify from 'toastify-js';
// import "toastify-js/src/toastify.css";
// import Image from 'next/image';
// import Cookies from "js-cookie";
// import { useDispatch } from 'react-redux';
import Link from "next/link";

export default function Login() {
  // const { handleSubmit } = useForm();
  // const [error, setError] = useState(null);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const router = useRouter();
  // const dispatch = useDispatch();


  // const onSubmit = async () => {

  //   if (!username) {
  //     setError('Username can not be empty');
  //     return;
  //   }

  //   if (!password) {
  //     setError('Password can not be empty');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('https://dummyjson.com/user/login', { username, password });
  //     dispatch(setCurrentUser(response.data));
  //     // console.log(response.data.token);
  //     if (response.status === 200) {

  //       const access_token = response.data.token;
  //       Cookies.set("token", access_token, { expires: 2 }); // Set cookie with expiration of 2 days

  //       Toastify({
  //         text: "Login success! Redirecting to Dashboard",
  //         duration: 3000,
  //         close: true,
  //         gravity: "bottom",
  //         position: "right",
  //         backgroundColor: "#4CAF50",
  //         stopOnFocus: true,
  //       }).showToast();
  //       router.push('/dashboard');
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     Toastify({
  //       text: "Login failed. Please try again.",
  //       duration: 3000,
  //       close: true,
  //       gravity: "bottom",
  //       position: "right",
  //       backgroundColor: "#ff0000",
  //       stopOnFocus: true,
  //     }).showToast();
  //   }
  // };

  return (
    <>
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Manage Your Company <br /> One <span className="text-[#306844] ">Place</span> At a Time</h1>

              <p className="mt-3 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>
              <Link href={'/login'}>
                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-[#306844] rounded-lg lg:w-auto hover:bg-[#2C4C3B] focus:outline-none focus:bg-emerald-900">Login</button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <Image
              src={'/hero.png'}
              alt="Hero"
              width={2460}
              height={1460}
            />
          </div>
        </div>
      </div>
    </>

  );
}
