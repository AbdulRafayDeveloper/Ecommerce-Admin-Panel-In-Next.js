"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/app/admin/components/Header';
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinkingWithSidebar from '../../../components/secondLayer/LinkingWithSidebar';
import { decodeJWT } from "../../../components/DecodeJWT";

function Page({ params }) {
    const router = useRouter();
    const id = params.id;
    const [loading, setLoading] = useState(false);
    const [formdata, setFormData] = useState({
        title: "",
        description: "",
        page: "",
        url: ""
    })

    useEffect(() => {
        const decodedData = decodeJWT();
        if (!(decodedData && decodedData.token && (decodedData.role === "admin" || decodedData.role === "employee"))) {
            router.push("../../auth/login");
        }

        const fetchExcursionRecord = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/getMeta/${id}`);
                if (response.data.status === 200) {
                    const result = response.data.data;
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        title: result.title || prevFormData.title,
                        description: result.description || prevFormData.description,
                        page: result.page || prevFormData.page,
                        url: result.url || prevFormData.url,
                    }));
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.data.message,
                    });
                }
            } catch (error) {
                console.error("Error fetching keyPoints:", error);
            }
        };

        fetchExcursionRecord();
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
            console.log("Id: ", id);
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const response = await axios.put(`http://localhost:5000/api/meta/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                }).then(() => {
                    router.push("../../../admin/meta/list");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.data.message,
                });
            }
        } catch (error) {
            Swal.fire('Error!', "Form Not submitted", 'error');
        } finally {
            setLoading(false);
        }
    };

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
                                <h1 className='text-2xl font-medium text-center pb-7 text-gray-800 '>Update Meta</h1>
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
                                            placeholder="Enter title"
                                            value={formdata.title} />
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
                                            placeholder="Enter description"
                                            value={formdata.description} />
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
                                            placeholder="Enter page"
                                            value={formdata.page} />
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
                                            placeholder="Enter url"
                                            value={formdata.url} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-8">
                                    <button
                                        className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Update Record'}
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

export default Page;