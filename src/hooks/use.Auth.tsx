import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '../constants/queryKey';
import { postLoginAPI } from '../api/auth.apiUrl';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';
import { UserInfo, userState } from '../recoil/atoms/userAtom';
import { useSetRecoilState } from 'recoil';

// Define the shape of the authentication payload
interface AuthPayload {
    username: string;
    password: string;
}

// Define the shape of the decoded JWT token
interface DecodedToken {
    role: 'user' | 'admin' | 'guest';
}

interface AuthResponse {
    data: {
        access_token: string;
    };
}

export const usePostAuth = () => {
    const setUser = useSetRecoilState(userState);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<AuthResponse, Error, AuthPayload>({
        mutationFn: (auth) => postLoginAPI(auth),
        onSuccess: (data) => {
            message.success('Login success');
            localStorage.setItem('access_token', data.data.access_token);

            const access_token = data.data.access_token;
            const decoded = jwtDecode<UserInfo>(access_token);
            setUser(decoded); 

            switch (decoded.role) {
                case 'user':
                navigate('/');
                break;
                case 'admin':
                navigate('/admin');
                break;
                default:
                navigate('/');
            }
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH] });
        },
        onError: (error: any) => {
            if (error.response && error.response.status === 401) {
                message.error('Wrong username or password');
            } else {
                message.error('An error occurred. Please try again later.');
            }
        },
    });
};

export const useCheckAuthentication = () => {
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        if (access_token) {
            const decodedToken = jwtDecode(access_token) as DecodedToken;
            switch (decodedToken.role) {
                case 'user': {
                    navigate('/');
                    break;
                }
                default: {
                    navigate('/guest');
                    break;
                }
            }
        }
    }, [access_token, navigate]);
};
