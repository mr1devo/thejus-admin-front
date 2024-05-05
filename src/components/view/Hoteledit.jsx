
import React, { useState } from 'react'
//import './student.css'
import axios from 'axios'
import './Places.css';
import { Button, TextField, Typography } from '@mui/material'
import Layout from '../adminpanel/Layout'
import { useNavigate } from 'react-router-dom';
//import Places from './Places'


const Hoteledit = (props) => {
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
        formdata.append('hotelname',inputs.hotelname);
        formdata.append('htsee',inputs.htsee);
        formdata.append('hlocation',inputs.hlocation);
        formdata.append('hdesc',inputs.hdesc);
        formdata.append('hlatitude', inputs.hlatitude);
        formdata.append('hlongitude', inputs.hlongitude);
        formdata.append('hotelphoto',selectedimage);
  
      
        fetch(`http://localhost:4005/Hoteldetails/hedit/${inputs._id}`,
            { method: 'put', body: formdata, })
            .then((response) => response.json())
            .then((data) => {
                alert("Hotel Edited")
                window.location.reload(false);
            })
            .catch((err) => {
                console.log("error", err)
            })

        navigate('/HotelView')

    }

   
  const handleimage =(event)=>{
    const file = event.target.files[0];
    setSelectedimage(file)
    inputs.hotelphoto=file;
}
    
    //update
     const updateValues = (value) =>{
         console.log("updated:",value)
         setSelected(value);
        setUpdate(true);
         }

         //delete
    const deleteValues=(id)=>{
        console.log("deleted",id)
        axios.put("http://localhost:4005/hremove/"+id)
        .then((response)=>{
            alert("Deleted")
            //to reload window
            window.location.reload(false);
        })
    }


    return (
        <Layout>
        <div className='p1'>
        <Typography variant='h5'>Edit 
  Hotel</Typography><br></br>
  <TextField id="outlined-basic" label="Places"
  variant="outlined"
  name="hotelname" value={inputs.hotelname}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField id="outlined-basic" label="Things to see"
  variant="outlined"
  name="htsee" value={inputs.htsee}
  onChange={inputhandler} />
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
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField id="outlined-basic" label="Description"
  variant="outlined" name="hdesc" value={inputs.hdesc}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField
        id="outlined-basic"
        label="Latitude"
        variant="outlined"
        name="hlatitude"
        value={inputs.hlatitude}
        onChange={inputhandler}
      />
      <br></br>
      <br></br>
      <TextField
        id="outlined-basic"
        label="Longitude"
        variant="outlined"
        name="hlongitude"
        value={inputs.hlongitude}
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

export default Hoteledit