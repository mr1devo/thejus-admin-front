import React, { useEffect, useState } from 'react';
import './Restra.css'; // Import the CSS file
//import Hotel from './Hotel';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import Layout from '../adminpanel/Layout';

const Restra = () => {
  const initialInputs = {
    "restraname": '', 
    "rtsee": '', 
    "rlocation": '',
     "rdesc": '' ,
     "rlatitude":'',
     "rlongitude":''
  };
  const [currentLocation, setCurrentLocation] = useState({ rlatitude: null, rlongitude: null });
  var [inputs,setInputs]=useState({ initialInputs })
  var [selectedimage,setSelectedimage] = useState(null);
   
  const navigate = useNavigate();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { rlatitude, rlongitude } = position.coords;
          setCurrentLocation({ rlatitude, rlongitude });
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
    const {name,value}=e.target
    setInputs((inputs) => ({...inputs,[name]:value}))
    console.log(inputs)
  }

  const handleimage =(event)=>{
    const file = event.target.files[0];
    setSelectedimage(file)
    inputs.restraphoto=file;
}

const handleReset = () => {
  setInputs(initialInputs);
};

const savedata =()=>{
  const formdata = new FormData();
  formdata.append('restraname',inputs.restraname);
  formdata.append('rtsee',inputs.rtsee);
  formdata.append('rlocation',inputs.rlocation);
  formdata.append('rdesc', inputs.rdesc);
  formdata.append('rlatitude', inputs.rlatitude);
  formdata.append('rlongitude', inputs.rlongitude);
  formdata.append('restraphoto',selectedimage);


  fetch('http://localhost:4005/Restradetails/restranew',
  {method:'post',body:formdata,})
  .then((response)=>response.json())
  .then((data)=>{
      alert("Restaurant saved")
  })
  .catch((err)=>{
     console.log("error")
  })
  // navigate('/RestraView')
}

  const navigatetoHome = () => {
    navigate('/Home');
  }

  return (
    <Layout>
    <div className='p1'>
      <Typography variant='h5'>Add 
Restaurant</Typography><br></br>
<TextField id="outlined-basic" label="Restaurants"
variant="outlined"
name="restraname" value={inputs.restraname}
onChange={inputHandler} />
<br></br>
<br></br>
<TextField id="outlined-basic" label="Things to see"
variant="outlined"
name="rtsee" value={inputs.rtsee}
onChange={inputHandler} />
<br></br>
<br></br>
{/* <TextField id="outlined-basic" label="photos"
variant="outlined"
name="photos" value={inputs.photos}
onChange={inputHandler} /> */}
<input
            type="file"
            onChange={handleimage}
            
          />
<br></br>
<br></br>
<TextField id="outlined-basic" label="Location"
variant="outlined" name="rlocation" value={inputs.rlocation}
onChange={inputHandler} />
<br></br>
<br></br>
<TextField id="outlined-basic" label="Description"
variant="outlined" name="rdesc" value={inputs.rdesc}
onChange={inputHandler} />
<br></br>
<br></br>
<TextField
      className='input'
        id="outlined-basic"
        label="Latitude"
        variant="outlined"
        name="rlatitude"
        value={inputs.rlatitude}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <TextField
      className='input'
        id="outlined-basic"
        label="Longitude"
        variant="outlined"
        name="rlongitude"
        value={inputs.rlongitude}
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
<Button variant='contained' color='success' style={{ }}
onClick={() => { navigatetoHome() }} >Submit</Button> */}
 </div>
 </Layout>
  );
};


export default Restra






  // const addHandler =() =>{
  //   console.log("Clicked")
  //   console.log(inputs)
  //   axios.post("http://localhost:4005/rnew",inputs)
  //   .then((response) =>{
  //     alert("record saved")
  //   })
  //   .catch(err=>console.log(err))
  // }
//navigate('/PlaceView');
  // const [placename, setPlaceName] = useState('');
  // const [thingsToSee, setThingsToSee] = useState('');
  //  const [rphotos, setRphotos] = useState([]);
  //  const [rlocation, setRlocation] = useState('');
  // const [showHotel, setShowHotel] = useState(false);

