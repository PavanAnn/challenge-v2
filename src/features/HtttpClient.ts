import axios from 'axios'
const TractianAPI = axios.create({
    baseURL: 'https://fake-api.tractian.com',
})

export default TractianAPI;
