import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.exchangeratesapi.io'
})

export default API
