import { Outlet } from 'react-router-dom';
import UserLayout from '../components/layout/UserLayout';
import Payment from '../pages/user/payment/Payment';

const UserRouter = [
	{
		path: '',
		element: <Outlet />,
		children: [
			{
				element: <UserLayout />,
				children: [
					{
						path: '',
						element: <Payment />,
					},
				],
			},
		],
	},
];

export default UserRouter;
