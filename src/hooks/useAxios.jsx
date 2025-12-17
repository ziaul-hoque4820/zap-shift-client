import axios from 'axios'
import React from 'react'

const axiosInstance = axios.create({
    baseURL: `https://zap-shift-server-cfiv.onrender.com`
})
function useAxios() {
  return axiosInstance
}

export default useAxios