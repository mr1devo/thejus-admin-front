// Import the CSS file
import './Places.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTitle, Button, Paper, Table, TableContainer, TextField, Typography } from '@mui/material';
import Layout from '../adminpanel/Layout';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const Places = () => {
  const initialInputs = {
    "placename": '', 
    "tsee": '', 
    "location": '',
     "desc": '' ,
     "latitude":'',
     "longitude":''
  };
  const [currentLocation, setCurrentLocation] = useState({ latitude: null, longitude: null });
  var [inputs, setInputs] = useState({ initialInputs });
  var [selectedimage, setSelectedimage] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();
  const navigatetoHotel = () => {
    navigate('/Hotel');
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    console.log(inputs);
  }

  const handleimage = (event) => {
    const file = event.target.files[0];
    setSelectedimage(file);
    inputs.placephoto = file;
  }
  const handleReset = () => {
    setInputs(initialInputs);
  };

  const savedata = () => {
    const formdata = new FormData();
    formdata.append('placename', inputs.placename);
    formdata.append('tsee', inputs.tsee);
    formdata.append('location', inputs.location);
    formdata.append('desc', inputs.desc);
    formdata.append('latitude', inputs.latitude);
    formdata.append('longitude', inputs.longitude);
    formdata.append('placephoto', selectedimage);
  
    fetch('http://localhost:4005/Placedetails/photonew', {
      method: 'post',
      body: formdata,
    })
 
      .then((response) => response.json())
      
      .then((data) => {
        saveDataToDatabase()
        setOpenAlert(true);
        
        alert('Place Saved ')
      })
      .catch((err) => {
        console.log("error");
      });
    //  navigate('/PlaceView')
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };


    // Simulated function to save data to the database
    const saveDataToDatabase = () => {
      // Simulate a delay to mimic an asynchronous operation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Resolve the promise after the delay to simulate successful data saving
          resolve();
        }, 1000); // Adjust the delay as needed
      });
    };
  
  return (
    <Layout>
     {/* <Alert
      icon={<CheckIcon fontSize="inherit" />} 
      severity="success" 
      open={openAlert}
      onClose={handleCloseAlert} 
      action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleCloseAlert}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      sx={{ mt: 2, width: '300px',  margin: 'auto'}}>
     <AlertTitle>SAVED</AlertTitle> 
     Place Added successfully.
    </Alert> */}
    
    <div className='p1'>
    
     <Typography variant='h5' className='h5'>Add Place</Typography><br></br>
      <TextField
        id="outlined-basic"
        label="Places"
        variant="outlined"
        className='input'
        name="placename"
        value={inputs.placename}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <TextField
      className='input'
        id="outlined-basic"
        label="Things to see"
        variant="outlined"
        name="tsee"
        value={inputs.tsee}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <input type="file" onChange={handleimage} />
      <br></br>
      <br></br>
      <TextField
      className='input'
        id="outlined-basic"
        label="Location"
        variant="outlined"
        name="location"
        value={inputs.location}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <TextField
      className='input'
        id="outlined-basic"
        label="Description"
        variant="outlined"
        name="desc"
        value={inputs.desc}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <TextField
      className='input'
        id="outlined-basic"
        label="Latitude"
        variant="outlined"
        name="latitude"
        value={inputs.latitude}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <TextField
      className='input'
        id="outlined-basic"
        label="Longitude"
        variant="outlined"
        name="longitude"
        value={inputs.longitude}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <Button
        variant='contained'
        color='success'
        style={{ }}
        onClick={() => { savedata(); handleReset();}}
      >
        SAVE
      </Button>
      
      {/* <br></br>
      <br></br>
      <Button
    
        variant='contained'
        color='success'
        style={{ }}
        onClick={() => { navigatetoHotel() }}
      >
        NEXT
      </Button> */}
  
    </div>
    
    </Layout>
  );
}

export default Places;
