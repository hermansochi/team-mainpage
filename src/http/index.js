import axios from 'axios';

//export const API_URL = 'http://mkt.rsa.rogsibal.ru/api/v1';
export const API_URL = 'http://api.localhost/api/v1';

const $api = axios.create({
	withCredentials: false,
	baseURL: API_URL,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});

/*
$api.interceptors.request.use((config) => {
	config.headers.Autorization = `Bearer ${localStorage.getItem('token')}`
	return config;
});
*/

export default $api;