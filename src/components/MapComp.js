import { useMemo, useState, useContext,useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyles from '../mapStyles';
import {
  Button,
  Flex,
  VStack,
} from '@chakra-ui/react';
import AuthContext from '../context/AuthContex';
import LocationContext from '../context/LocationContext';


//adjust the map size
const mapContainerStyle = {
  width: '90vw',
  height: '60vh',
};


export default function MapComp() {
   //the manual credentials
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  //list of post names and distances
  const[userDistance,setUserDistance] = useState([])
  const { userID} = useContext(AuthContext);
  const { addLocation } = useContext(LocationContext);
  //auto credentials
  const [windowLat,setWindowLat] = useState('')
  const [windowLng,setWindowLng] = useState('')

  const [locationWindow,setLocationWindow] = useState(false)
  //get user location by prompting the browser to access the location
  useEffect(()=> {
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
  },[])
    const addLocationWindow = async ()=> {
    const locationResult = await addLocation(userID, windowLat, windowLng);
    if(locationResult){
      return console.log("added from window")
    }
  }
  addLocationWindow()
//


//load google maps from google maps api
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


  //allow the user to enter the location manually
  const setLocation = async () => {
    const locationResult = await addLocation(userID, lat, lng);
    if (locationResult) {
      console.log('added :)');
    }

  };
  ///


  //get all posts distances
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
      {/* {send user location manually} */}
        <Button onClick={setLocation} colorScheme="blue">
            Send Info
          </Button>
          {/* {////} */}

      <Flex
        justifyContent={'center'}
        alignItems="center"
        height={'10vh'}
        zIndex="10"
      >
        <VStack mt={'500px'}>
            {/* button to get all posts and distances (will be in useEffect) */}
          <Button onClick={getDistance} colorScheme="blue">
            get Info
          </Button>
          {/* {////} */}
        </VStack>
      </Flex>
    </>
  );
}

// google map function 
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
