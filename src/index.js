import { ColorModeScript,ChakraProvider  } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContex';
import { LocationProvider } from './context/LocationContext';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <>
  <ChakraProvider >
    <ColorModeScript />
    <AuthProvider>
      <LocationProvider>
    <App />
    </LocationProvider>
    </AuthProvider>
    </ChakraProvider>
  </>
);

