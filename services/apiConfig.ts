import axios from 'axios'
import { API_BASE_URL } from '@/utils/config'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})