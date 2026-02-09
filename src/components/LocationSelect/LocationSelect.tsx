"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SelectLocationProps {
  onLocationChange: (location: { lat: number; lng: number }) => void;
  defaultLocation?: { latitude: number; longitude: number };
}

const SelectLocation: React.FC<SelectLocationProps> = ({
  onLocationChange,
  defaultLocation,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDhGeo1a69M_8huct1J0r5PguUIMJO48iQ",
    language: "tr",
  });

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [defaultCenter, setDefaultCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    // Extract values immediately to avoid circular reference
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    setSelectedLocation(newLocation);
    onLocationChange(newLocation);
  };

  useEffect(() => {
    if (defaultLocation) {
      setDefaultCenter({
        lat: defaultLocation.latitude,
        lng: defaultLocation.longitude,
      });
      setSelectedLocation({
        lat: defaultLocation.latitude,
        lng: defaultLocation.longitude,
      });
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setDefaultCenter(userLocation);
            setSelectedLocation(userLocation);
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Konum alınamadı. Varsayılan konum kullanılıyor.");
          }
        );
      } else {
        toast.error("Tarayıcınız konum özelliğini desteklemiyor.");
      }
    }
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={defaultCenter}
      zoom={16}
      onClick={handleMapClick}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {selectedLocation && <Marker position={selectedLocation} />}
    </GoogleMap>
  );
};

SelectLocation.displayName = "SelectLocation";
export default SelectLocation;
