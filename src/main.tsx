import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Router from './routers/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

axios.defaults.baseURL = 'http://localhost:3000/api/';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
	<RecoilRoot>
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={Router} />
			</Suspense>
		</QueryClientProvider>
	</RecoilRoot>

);
