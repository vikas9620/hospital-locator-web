import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { CircularProgress, Box, Typography } from '@mui/material';

const Map = ({ location }) => {
  const [hospitals, setHospitals] = useState([]);
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = () => {
    if (map && placesService) {
      setLoading(true);
      const request = {
        location: new window.google.maps.LatLng(location.latitude, location.longitude),
        radius: '5000',
        type: ['hospital'],
      };

      placesService.nearbySearch(request, (results, status) => {
        setLoading(false);
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setHospitals(results);
        } else {
          console.error('Places request failed due to:', status);
        }
      });
    }
  };

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
    const service = new window.google.maps.places.PlacesService(mapInstance);
    setPlacesService(service);
  };

  useEffect(() => {
    if (map && placesService && location) {
      fetchHospitals();
    }
  });

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <LoadScript
        googleMapsApiKey="AIzaSyDuqp1Ij3Vmsi_VavN0X-NnUsPWQ1GpErE"
        libraries={['places']} 
      >
        <GoogleMap
          onLoad={onLoad}
          center={{ lat: location.latitude, lng: location.longitude }}
          zoom={15}
          mapContainerStyle={{ height: '100%', width: '100%' }}
        >
          {loading && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ height: '100%', width: '100%' }}
            >
              <CircularProgress />
            </Box>
          )}
          {hospitals.map((hospital, index) => (
            <Marker
              key={index}
              position={{
                lat: hospital.geometry.location.lat(),
                lng: hospital.geometry.location.lng(),
              }}
              icon="https://maps.google.com/mapfiles/ms/icons/hospital.png"
              onClick={() => setSelectedHospital(hospital)}
            />
          ))}
          {selectedHospital && (
            <InfoWindow
              position={{
                lat: selectedHospital.geometry.location.lat(),
                lng: selectedHospital.geometry.location.lng(),
              }}
              onCloseClick={() => setSelectedHospital(null)}
            >
              <div>
                <Typography variant="h6">{selectedHospital.name}</Typography>
                <Typography variant="body2">
                  {selectedHospital.vicinity}
                </Typography>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
