import {useContext} from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  HStack,
  Code,
  Grid,
  theme,
  Flex
} from '@chakra-ui/react';
import { BrowserRouter,Route,Routes } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import MapPage from './pages/MapPage';
import RequireAuth from './components/RequireAuth';
import  Chat  from './pages/Chat';
import SecondChat from './pages/SecondChat'


function App() {

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<RequireAuth/>}>
          <Route path={'/map'} element={<MapPage/>}/>



        </Route>
        <Route path={'/chat'} element={<Chat></Chat>}/>
          <Route path={'/secondchat'} element={<SecondChat></SecondChat>}/>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
