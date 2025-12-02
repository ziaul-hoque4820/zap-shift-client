import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
})

function useAxiosSecure() {
    const { user } = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
        };

    }, [user?.accessToken]);

    return axiosSecure;
}


export default useAxiosSecure