import axios from 'axios';
import { API_URL } from '../constants/constant';


export const postTransactionAPI = (params: any) => {
	const access_token = localStorage.getItem('access_token');
	try {
		const response = axios.post(API_URL.TRANSACTION, params, {
			headers: {
				Authorization: `Bearer ${access_token}`,
				'ngrok-skip-browser-warning': 'true',
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
