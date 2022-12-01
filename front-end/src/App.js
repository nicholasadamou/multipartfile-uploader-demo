import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageLoader from '@/components/PageLoader';

import Documents from '@/pages/Documents';

const App = () => (
	<React.Suspense fallback={<PageLoader />}>
		<Router>
			<Routes>
				<Route path="/documents" element={<Documents />} />

				<Route path="/health" status={200} />
			</Routes>
		</Router>
	</React.Suspense>
);

export default App;
