import { createBrowserRouter, RouteObject } from 'react-router-dom';
import AuthPage from '../pages/login/LoginAndRegister';
// import Register from '../pages/register/Register';
import UserRouter from './UserRoute';
import Error404 from '../pages/error/Error404';

const Router = createBrowserRouter([
	{
		path: '',
		errorElement: <Error404 />,
		children: [
			{
				path: '',
				children: [...UserRouter as RouteObject[]],
			},
			{
				path: 'auth',
				element: <AuthPage />,
			},
			// {
			// 	path: 'signup',
			// 	element: <Register />,
			// },
		],
	},
]);

export default Router;
