import React, { useEffect, useState } from 'react';
import './Hotel.css'; // Import the CSS file
//import Hotel from './Hotel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';
import Layout from '../adminpanel/Layout';

const Hotel = () => {
  const initialInputs = {
    "hotelname": '', 
    "htsee": '', 
    "hlocation": '',
     "hdesc": '' ,
     "hlatitude": '',
     "hlongitude": '',
  };
  const [currentLocation, setCurrentLocation] = useState({ latitude: null, longitude: null });
  var [inputs,setInputs]=useState({ initialInputs })
  var [selectedimage,setSelectedimage] = useState(null);
   
  const navigate = useNavigate();
  const navigatetoRestra = ()=>{
    navigate('/Restra');
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
    const {name,value}=e.target
    setInputs((inputs) => ({...inputs,[name]:value}))
    console.log(inputs)
  }

  const handleimage =(event)=>{
    const file = event.target.files[0];
    setSelectedimage(file)
    inputs.hotelphoto=file;
}

const handleReset = () => {
  setInputs(initialInputs);
};

const savedata =()=>{
  const formdata = new FormData();
  formdata.append('hotelname',inputs.hotelname);
  formdata.append('htsee',inputs.htsee);
  formdata.append('hlocation',inputs.hlocation);
  formdata.append('hdesc', inputs.hdesc);
  formdata.append('hlatitude', inputs.hlatitude);
  formdata.append('hlongitude', inputs.hlongitude);
  formdata.append('hotelphoto',selectedimage);
  
  

  fetch('http://localhost:4005/Hoteldetails/hotelnew',
  {method:'post',body:formdata,})
  .then((response)=>response.json())
  .then((data)=>{
      alert("Hotel saved")
  })
  .catch((err)=>{
     console.log("error")
  })
  // navigate('/HotelView')
}



  return (
    <Layout>
    <div className='p1'>
      <Typography variant='h5'>Add 
Hotel</Typography><br></br>
<TextField id="outlined-basic" label="Hotels"
variant="outlined"
name="hotelname" value={inputs.hotelname}
onChange={inputHandler} />
<br></br>
<br></br>
<TextField id="outlined-basic" label="Things to see"
variant="outlined"
name="htsee" value={inputs.htsee}
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
variant="outlined" name="hlocation" value={inputs.hlocation}
onChange={inputHandler} />
<br></br>
<br></br>
<TextField id="outlined-basic" label="Description"
variant="outlined" name="hdesc" value={inputs.hdesc}
onChange={inputHandler} />
<br></br>
<br></br>
<TextField
        id="outlined-basic"
        label="Latitude"
        variant="outlined"
        name="hlatitude"
        value={inputs.hlatitude}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
      <TextField
        id="outlined-basic"
        label="Longitude"
        variant="outlined"
        name="hlongitude"
        value={inputs.hlongitude}
        onChange={inputHandler}
      />
      <br></br>
      <br></br>
<Button
        variant='contained'
        color='success'
        onClick={() => { savedata(); handleReset();}}
      >
        SAVE
      </Button>
      {/* <br></br>
      <br></br>
<Button variant='contained' color='success'
onClick={()=>{navigatetoRestra()}} >NEXT</Button> */}
 </div>
 </Layout>
  );
};


export default Hotel






  // const addHandler =() =>{
  //   console.log("Clicked")
  //   console.log(inputs)
  //   axios.post("http://localhost:4005/hnew",inputs)
  //   .then((response) =>{
  //     alert("record saved")
  //   })
  //   .catch(err=>console.log(err))
  // }
//navigate('/PlaceView');
  // const [placename, setPlaceName] = useState('');
  // const [thingsToSee, setThingsToSee] = useState('');
  //  const [hphotos, setHphotos] = useState([]);
  //  const [hlocation, setHlocation] = useState('');
  // const [showHotel, setShowHotel] = useState(false);






























// import React, { useState } from 'react';
// import './Places.css'; // Import the CSS file
// import Restra from './Restra';


// const Hotel= () => {
//   const [placename, setPlaceName] = useState('');
//   const [thingsToSee, setThingsToSee] = useState('');
//   const [photos, setPhotos] = useState([]);
//   const [location, setLocation] = useState('');
//   const [showHotel, setShowHotel] = useState(false);

//   const handleNext = (e) => {
//     e.preventDefault(); // Prevents the default form submission behavior

//     // You can handle the form data here, e.g., send it to an API

//     // For demonstration purposes, set showHotel to true to render the Hotel component
//     setShowHotel(true);
//   };

//   return (
//     <div className='p'>
//       <form onSubmit={handleNext} className='p'>
//         <label>
//           Hotel Name:
//           <input
//             type="text"
//             value={placeName}
//             onChange={(e) => setPlaceName(e.target.value)}
//           />
//         </label>
//         <br />

//         <label>
//           Description
//           <textarea
//             value={thingsToSee}
//             onChange={(e) => setThingsToSee(e.target.value)}
//           />
//         </label>
//         <br />

//         <label>
//           Photos:
//           <input
//             type="file"
//             multiple
//             onChange={(e) => setPhotos([...e.target.files])}
//           />
//         </label>
//         <br />

//         <label>
//           Location from Google Maps:
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </label>
//         <br />

//         <button type="submit">Next</button>
//       </form>

//       {showHotel && <Restra />} {/* Conditionally render the Hotel component */}
//     </div>
//   );
// };

// export default Hotel;
