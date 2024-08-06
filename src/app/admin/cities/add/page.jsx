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
        cityName: "",
        country: "",
        region: "",
        subdomain: "",
        thumbnail: ""
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

        if (!formdata.cityName || !formdata.country || !formdata.region || !formdata.subdomain || !formdata.thumbnail) {
            toast.error('Please fill all required fields');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('cityName', formdata.cityName);
        formData.append('country', formdata.country);
        formData.append('region', formdata.region);
        formData.append('subdomain', formdata.subdomain);
        formData.append('thumbnail', formdata.thumbnail);

        try {
            const response = await axios.post(`http://localhost:5000/api/cities`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                }).then(() => {
                    router.push("../../../../admin/cities/list");
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
                text: error.response ? error.response.data.message : "An error occurred",
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
                            <form onSubmit={handleSubmit} name="employeeForm" id="employeeForm" className="bg-white shadow-md rounded px-12 pb-4 mb-4 py-2 mt-2"
                                method="post" encType="multipart/form-data">
                                <h1 className='text-2xl font-medium text-center pb-7 text-gray-800 '>Add New City</h1>
                                <div className='flex flex-row justify-between space-x-10 mb-4'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
                                            City Name
                                        </label>
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="cityName"
                                            id="cityName"
                                            onChange={(e) => setFormData({ ...formdata, cityName: e.target.value })}
                                            placeholder="Enter City Name" />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between space-x-10 mb-4'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="country"
                                            id="country"
                                            onChange={(e) => setFormData({ ...formdata, country: e.target.value })}
                                            placeholder="Enter Country" />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between space-x-10 mb-4'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
                                            Region
                                        </label>
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="region"
                                            id="region"
                                            onChange={(e) => setFormData({ ...formdata, region: e.target.value })}
                                            placeholder="Enter Region" />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between space-x-10 mb-4'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="name">
                                            Subdomain
                                        </label>
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="subdomain"
                                            id="subdomain"
                                            onChange={(e) => setFormData({ ...formdata, subdomain: e.target.value })}
                                            placeholder="Enter subdomain" />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-between space-x-10 mb-2'>
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-base font-semibold mb-2" htmlFor="pic">
                                            Thumbnail
                                        </label>
                                        <input
                                            type="file"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="thumbnail"
                                            id="thumbnail"
                                            onChange={(e) => setFormData({ ...formdata, thumbnail: e.target.files[0] })} />
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