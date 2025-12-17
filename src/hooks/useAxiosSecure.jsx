import axios from 'axios'
import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: `https://zap-shift-server-cfiv.onrender.com`
})

function useAxiosSecure() {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,

            (error) => {
                const status = error?.response?.status;

                // 403: Forbidden
                if (status === 403) {
                    navigate('/*')
                }

                // 401: Unauthorized - token invalid/expired
                else if (status === 401) {
                    logOut()
                        .then(() => navigate("/login"))
                        .catch(() => { });
                }

                return Promise.reject(error);
            }
        )

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };

    }, [user?.accessToken, logOut, navigate]);

    return axiosSecure;
}


export default useAxiosSecure