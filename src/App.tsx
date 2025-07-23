// ✅ App.tsx (No PrivateRoute)
import { useState, useEffect, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReactGA from 'react-ga';

import getTheme from './theme/theme';
import ColorModeContext from './utils/ColorModeContext';
import Layout from './layout/Layout';
import BusinessSetupForm from './components/BusinessSetupForm';


// Pages
import Home from './pages/Home';
import Pricing from './components/Pricing';
import Dashboard from './pages/Dashboard';
import CreateInvoice from './pages/CreateInvoice';
import KitchenDashboard from './pages/KitchenDashboard';
import Pay from './pages/Pay';
import UploadMenu from './components/UploadMenu';

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '20vh' }}>
    <h3>404 - Not Found</h3>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();

  const hideLayoutRoutes = [
    '/dashboard',
    '/sales/create',
    '/pay',
    '/upload-menu',
    '/kitchen',
    '/business-setup',
  ];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return shouldHideLayout ? (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sales/create" element={<CreateInvoice />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/upload-menu" element={<UploadMenu />} />
      <Route path="/kitchen" element={<KitchenDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing-table" element={<Navigate to="/pricing" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/business-setup" element={<BusinessSetupForm />} />

      </Routes>
    </Layout>
  );
};

const App = (): JSX.Element => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        window.localStorage.setItem('themeMode', newMode);
        setMode(newMode);
      },
    }),
    [mode]
  );

  useEffect(() => {
    const localTheme = window.localStorage.getItem('themeMode');
    setMode(localTheme || 'light');
    ReactGA.initialize('YOUR-GOOGLE-ANALYTICS-MEASUREMENT-ID');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Online Invoice"
        defaultTitle="Online Invoice | No Data No Business"
      />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </HelmetProvider>
  );
};

useEffect(() => {
  fetch("https://web-production-b8414.up.railway.app/api/test/")
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Connected to backend:", data);
      alert("Connected to backend: " + data.status);
    })
    .catch((err) => {
      console.error("❌ Failed to connect:", err);
      alert("Failed to connect to backend");
    });
}, []);


export default App;
