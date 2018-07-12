import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fire-react-34a92.firebaseio.com'
});

export default instance;