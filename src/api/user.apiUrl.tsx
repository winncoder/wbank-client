import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../constants/constant';

export const getUserAPI = (id: string): Promise<AxiosResponse> =>
    axios.get(`${API_URL.USER}/${id}`, {});

export const getUsersAPI = (params: object)  => {
	return axios.get(`${API_URL.USER}`, {
		params,
		headers: {},
	});
};