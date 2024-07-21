"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = decodeJWT(token);
    if (token && decodedToken.role == "admin") {
      router.push("./auth/login");
    }
  }, []);

  return (
    <div className='bg-white h-screen'>
    </div>
  );
}

export default Home;