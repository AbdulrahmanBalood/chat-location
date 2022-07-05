import React, { useState, useContext } from 'react';
import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Link as ChakraLink,
  Text,
  VStack,
} from '@chakra-ui/react';
//import Logo from '../img/logobs.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContex';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, addIsLogged,setLoggedID } = useContext(AuthContext);

  const onClick = async () => {
    const loginResult = await login(username, password);
    if (loginResult) {
      addIsLogged();
      
      localStorage.setItem('username',username)
      setLoggedID(true)
      // navigate('/');
    }
  };


  if (localStorage.getItem('loggedIn')) {
    return <Navigate to="/" />;
  }

  return (
    <HStack spacing="0">
      <Flex
        height="100vh"
        width={'100%'}
        backgroundColor="white"
        alignItems="center"
        justifyContent="center"
      >
        <VStack width={['90%', '600px']} spacing="2rem">
          <Text fontWeight="bold" color="green.400" fontSize="70px">
            Welcome back
          </Text>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            height="53px"
            placeholder="Username"
            type="text"
          ></Input>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            height="53px"
            placeholder="Password"
            type="password"
          ></Input>
          <Button
            fontSize="1.5rem"
            width="182px"
            backgroundColor="green.400"
            color="white"
            onClick={onClick}
          >
            Login
          </Button>
          <HStack fontSize="22px">
            <Text color="#A8A6AF">You don't have an account</Text>
            <Link to="/register"><Text color={'green.400'}>Register !</Text></Link>
          </HStack>
        </VStack>
      </Flex>
     
    </HStack>
  );
};

export default Login;