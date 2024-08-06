"use client"
import React, { useState, useEffect } from 'react'
import LinkingWithSidebar from '../../components/LinkingWithSidebar'
import Header from '@/app/admin/components/Header';
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decodeJWT } from "../../components/DecodeJWT";

function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formdata, setFormData] = useState({
        title: "",
        description: "",
        page: "",
        url: ""
    })

    useEffect(() => {
        const decodedData = decodeJWT();
        console.log("decodedData: ", decodedData);
        if (!(decodedData && decodedData.token && (decodedData.role === "admin" || decodedData.role === "employee"))) {
            router.push("../../auth/login");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formdata.title || !formdata.description || !formdata.page || !formdata.url) {
            toast.error('Please fill all required fields');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', formdata.title);
        formData.append('description', formdata.description);
        formData.append('page', formdata.page);
        formData.append('url', formdata.url);

        try {
            const response = await axios.post(`http://localhost:5000/api/meta`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                }).then(() => {
                    router.push("../../../../admin/meta/list");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.data.message,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response ? error.response.data.message : "Failed to Add the Meta. Please try again!",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="flex flex-col md:flex-row h-screen">
                <LinkingWithSidebar />
                <div className="flex-1 overflow-auto bg-gray-100">
                    <Header></Header>
                    <div className='p-1'>
                        <div className='mx-auto max-w-[600px] mt-12'>
                            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-12 pb-4 mb-4 py-2 mt-2">
                                <h1 className='text-2xl font-medium text-center pb-7 text-gray-800 '>Add New Meta</h1>
                                <div className='flex flex-row justify-between space-x-10 mb-4'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="title"
                                            id="title"
                                            onChange={(e) => setFormData({ ...formdata, title: e.target.value })}
                                            placeholder="Enter title" />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between space-x-10 mb-4'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="description"
                                            id="description"
                                            onChange={(e) => setFormData({ ...formdata, description: e.target.value })}
                                            placeholder="Enter description" />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between space-x-10 mb-4'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
                                            Page
                                        </label>
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="page"
                                            id="page"
                                            onChange={(e) => setFormData({ ...formdata, page: e.target.value })}
                                            placeholder="Enter page" />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between space-x-10 mb-4'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
                                            Url
                                        </label>
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="url"
                                            id="url"
                                            onChange={(e) => setFormData({ ...formdata, url: e.target.value })}
                                            placeholder="Enter url" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-8">
                                    <button
                                        className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Add Record'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page