import axios from 'axios'

const API = axios.create({
  baseURL: 'http://api.exchangeratesapi.io/'
})

export default API
