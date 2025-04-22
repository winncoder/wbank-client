import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants/constant';

interface AuthParams {
	username: string;
	password: string;
}

export const postLoginAPI = (params: AuthParams): Promise<AxiosResponse> =>
	axios.post(`${API_URL.AUTH}/login`, params, {});

