import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUserAPI, getUsersAPI } from '../api/user.apiUrl';
import { QUERY_KEY } from '../constants/queryKey';

interface User {
	id: string;
	username: string;
	email: string;
	balance: string
	createdAt: string;
}

interface UserParam {
	username: string;
	email: string;
}
interface IResUser {
	data: User[];
}
export const useGetUsers = (params: Partial<UserParam>): UseQueryResult<IResUser> => {
	return useQuery<IResUser>({
		queryKey: [QUERY_KEY.USER, params.username],
		queryFn: async ()=> {
			const { data } = await getUsersAPI(params);
			return data;
		},
	});
};

export const useGetUserDetail = (id: string): UseQueryResult<User> => {
	return useQuery<User>({
		queryKey: [QUERY_KEY.USER_DETAIL, id],
		queryFn: async () => {
			const { data } = await getUserAPI(id);
			return data;
		},
	});
};
