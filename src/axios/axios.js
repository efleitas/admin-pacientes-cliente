import axios from 'axios';
 
const instance = axios.create({
    baseURL: 'https://localhost:44394',
    headers: {
        headerType: 'example header type'
    }
});
 
export default instance;