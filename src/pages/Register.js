import React, { useContext, useState } from 'react';
import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Link as ChakraLink,
  Text,
  VStack,
  FormControl,
  FormLabel,

} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContex';

const Register = () => {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const onClick = async () => {
    const registerResult = await register(name,phoneNumber,username, email, password);
    if (registerResult) {
      navigate('/login');
    }
  };

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
            Welcome !
          </Text>
          <FormControl isRequired >
          <FormLabel htmlFor='first-name'>name</FormLabel>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            height="53px"
            placeholder="name"
            type="text"
          ></Input>
                    <FormLabel htmlFor='first-name'>phoneNumber</FormLabel>
          <Input
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            height="53px"
            placeholder="Username"
            type="text"
          ></Input>
          <FormLabel htmlFor='first-name'>Username</FormLabel>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            height="53px"
            placeholder="Username"
            type="text"
          ></Input>
           </FormControl>
           <FormControl isRequired>
          <FormLabel htmlFor='first-name'>Password</FormLabel>
          <Input
            value={password}
            onChange={e => setPassword(e.target.value)}
            height="53px"
            placeholder="Password"
            type="password"
          ></Input>
           </FormControl>
          
           <FormControl isRequired>
          <FormLabel htmlFor='first-name'>Email</FormLabel>
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            height="53px"
            placeholder="Email"
            type="text"
          ></Input>
          </FormControl>

          <Button
            fontSize="1.5rem"
            width="182px"
            onClick={onClick}
            backgroundColor="green.400"
            color="white"
          >
            Register
          </Button>
          <HStack fontSize="22px">
            <Text color="#A8A6AF">You have an account ? </Text>
            <Link to="/login">
              <Text color={'green.400'}>Login !</Text>
            </Link>
          </HStack>
        </VStack>
      </Flex>
    </HStack>
  );
};

export default Register;
