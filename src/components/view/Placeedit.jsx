
import React, { useState } from 'react'
//import './student.css'
import axios from 'axios'
import './Places.css';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material'
import Layout from '../adminpanel/Layout';


const Placeedit = (props) => {
    var [inputs,setInputs]=useState(props.data)
    var[selected,setSelected] = useState();
    var [selectedimage,setSelectedimage] = useState(null);
    var [update,setUpdate] =useState(false)
    //console.log("method:",props.method)
    //const navigate = useNavigate();

    const navigate = useNavigate();

    const inputhandler =(e)=> {
        const {name,value}=e.target
        setInputs((inputs)=>({...inputs,[name]:value}))
        console.log(inputs)
    }
   
    const savedata = () => {
        const formdata = new FormData();
        formdata.append('placename', inputs.placename);
        formdata.append('tsee', inputs.tsee);
        formdata.append('location', inputs.location);
        formdata.append('placephoto', selectedimage);
        formdata.append('desc', inputs.desc);
        formdata.append('latitude', inputs.latitude);
        formdata.append('longitude', inputs.longitude);
      
        fetch(`http://localhost:4005/Placedetails/pedit/${inputs._id}`,
            { method: 'put', body: formdata, })
            .then((response) => response.json())
            .then((data) => {
                alert("Place Edited")
                window.location.reload(false);
            })
            .catch((err) => {
                console.log("error", err)
            })

        navigate('/PlaceView')

    }


   
  const handleimage =(event)=>{
    const file = event.target.files[0];
    setSelectedimage(file)
    inputs.placephoto=file;
}
    
    //update
     const updateValues = (value) =>{
         console.log("updated:",value)
         setSelected(value);
        setUpdate(true);
         }


    return (
        <Layout>
        <div className='p1'>
        <Typography variant='h5'>Edit
  Place</Typography><br></br>
  <TextField id="outlined-basic" label="Places"
  variant="outlined"
  name="placename" value={inputs.placename}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField id="outlined-basic" label="Things to see"
  variant="outlined"
  name="tsee" value={inputs.tsee}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  {/* <TextField id="outlined-basic" label="photos"
  variant="outlined"
  name="placephoto" value={inputs.placephoto}
  onChange={handleimage} /> */}
  <input
              type="file"
              
              onChange={handleimage}
              
            />
  <br></br>
  <br></br>
  <TextField id="outlined-basic" label="Location"
  variant="outlined" name="location" value={inputs.location}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField id="outlined-basic" label="Description"
  variant="outlined" name="desc" value={inputs.desc}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField
        id="outlined-basic"
        label="Latitude"
        variant="outlined"
        name="latitude"
        value={inputs.latitude}
        onChange={inputhandler}
      />
      <br></br>
      <br></br>
      <TextField
        id="outlined-basic"
        label="longitude"
        variant="outlined"
        name="longitude"
        value={inputs.longitude}
        onChange={inputhandler}
      />
      <br></br>
      <br></br>
  <Button variant='contained' color='success'
  onClick={savedata} >Save</Button>
   </div>
   </Layout>
    );
  };

  export default Placeedit