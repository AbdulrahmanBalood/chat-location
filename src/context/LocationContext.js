import { createContext, useEffect, useState } from 'react';

const LocationContext = createContext();
const addLocation = async(userID,lat,lng) => {
    try {
        const request = await fetch('/api/v1/location/add',{
            headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({userID,lat,lng})
        });
        const data = await request.json();
        console.log(data);
        if (request.status === 201) {
            return true;
          } else {
            return false;
          }
    }catch (e) {
        console.log(e);
    }
}
export const LocationProvider = ({ children }) => {
    return (
        <LocationContext.Provider
          value={{addLocation }}
        >
          {children}
        </LocationContext.Provider>
      );
    };
    export default LocationContext;