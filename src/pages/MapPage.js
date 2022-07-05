import { useMemo, useState, useContext,useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyles from '../mapStyles';
import {
  Button,
  Flex,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import {  useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContex';
import LocationContext from '../context/LocationContext';
const mapContainerStyle = {
  width: '90vw',
  height: '60vh',
};


export default function MapPage() {
   
  const Navigate = useNavigate();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const[userDistance,setUserDistance] = useState([])
  const { logout, removeIsLogged, userID} = useContext(AuthContext);
  const { addLocation } = useContext(LocationContext);
  const [windowLat,setWindowLat] = useState('')
  const [windowLng,setWindowLng] = useState('')
  const [locationWindow,setLocationWindow] = useState(false)
  useEffect(()=> {
    //check local storage first
    if(localStorage.getItem('lat' === null || localStorage.getItem('lng' ===null))){
    navigator.geolocation.getCurrentPosition((position)=> {
        console.log("lat: "+position.coords.latitude);
        setWindowLat(position.coords.latitude)
        console.log("lng: "+position.coords.longitude);
        setWindowLng(position.coords.longitude)
        setLocationWindow(true)
        addLocationWindow()
      
    },(error) =>{
        if (error.code == error.PERMISSION_DENIED)
          console.log("user denied permission");
      })
    }
  },[])
 
    const addLocationWindow = async ()=> {
    const locationResult = await addLocation(userID, windowLat, windowLng);
    if(locationResult){
      localStorage.removeItem('lat');
      localStorage.removeItem('lng');
      localStorage.setItem('lat',windowLat)
      localStorage.setItem('lng',windowLng)
      return console.log("added from window")
    }
  }
  addLocationWindow()

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBLwPlQilWAC80chmncpCHqej3SYyu9EHI',
  });
  const [markers, setMarkers] = useState([]);
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (loadError) {
    return 'error';
  }



  const logoutClicked = () => {
    const isLoggedOut = logout();
    if (isLoggedOut) {
      removeIsLogged();
      Navigate('/');
    }
  };
  const setLocation = async () => {
    const locationResult = await addLocation(userID, lat, lng);
    if (locationResult) {
      localStorage.removeItem('lat');
      localStorage.removeItem('lng');
      localStorage.setItem('lat',lat)
      localStorage.setItem('lng',lng)
      console.log('added :)');
    }

  };
  const getDistance = async ()=> {
    const request = await fetch ('/api/v1/location/getdistance/'+userID)
    const data = await request.json()
    console.log(data);
    setUserDistance(data)

  }


  return (
    <>
      <Gmap
        markers={markers}
        setMarkers={setMarkers}
        setLat={setLat}
        setLng={setLng}
      ></Gmap>
      <Flex
        justifyContent={'center'}
        alignItems="center"
        height={'10vh'}
        zIndex="10"
      >
        <VStack mt={'500px'}>
          <Button onClick={setLocation} colorScheme="blue">
            Send Info
          </Button>
          <Button onClick={getDistance} colorScheme="blue">
            get Info
          </Button>
          <Text>lat: {lat} </Text>
          <Text> lng: {lng}</Text>
          <Button onClick={logoutClicked}>logout</Button>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Users distance</TableCaption>
              <Thead>
                <Tr>
                
                  <Th>Username</Th>
                  <Th isNumeric>Distance</Th>
                
                </Tr>
              </Thead>

              <Tbody>
              {userDistance.map((users)=> {
                return(<Tr>
                    <Td>{users.username}</Td>
                    <Td>{users.distance} Km</Td>
                </Tr>)
              })}

                
                
                

              </Tbody>
             
            </Table>
          </TableContainer>
        </VStack>
      </Flex>
    </>
  );
}
function Gmap({ markers, setMarkers, setLat, setLng }) {
    const options = {
        styels: mapStyles,
        disableDefaultUI: true,
      };
  const center = useMemo(() => ({ lat: 24.7136, lng: 46.6753 }), []);
  return (
    <GoogleMap
      zoom={10}
      center={center}
      onClick={e => {
        setLat(e.latLng.lat());
        setLng(e.latLng.lng());
        setMarkers(() => [
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          },
        ]);
      }}
      mapContainerStyle={mapContainerStyle}
      options={options}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  );
}
