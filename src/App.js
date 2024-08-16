import React, { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import Map from "./component/Map";
import { Container, Typography, Button, CircularProgress, Box, Paper } from "@mui/material";
import { styled } from "@mui/system";

// Styled container for better spacing and background
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: 'linear-gradient(to right, #a3c2c2, #c0e4e4)', // Background gradient
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

// Styled Paper component for card-like effect
const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

const App = () => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User signed in:', result.user);
      setUser(result.user);
      getLocation();
    } catch (error) {
      console.error('Sign-in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Hospital Locator
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : user ? (
        <Card>
          <Typography variant="h5" gutterBottom>
            Welcome, {user.displayName}
          </Typography>
          {location ? <Map location={location} /> : <Typography>Fetching location...</Typography>}
        </Card>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={signInWithGoogle}
          sx={{
            ':hover': {
              backgroundColor: '#004d40', // Darker teal on hover
            },
          }}
        >
          Sign in with Google
        </Button>
      )}
    </StyledContainer>
  );
};

export default App;
