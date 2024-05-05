
import React, { useState } from 'react'
//import './student.css'
import axios from 'axios'
import './Places.css';
import { Button, TextField, Typography } from '@mui/material'
import Layout from '../adminpanel/Layout';
import { useNavigate } from 'react-router-dom';


const Restraedit = (props) => {
    var [inputs,setInputs]=useState(props.data)
    var[selected,setSelected] = useState();
    var [selectedimage,setSelectedimage] = useState(null);
    var [update,setUpdate] =useState(false)
    //console.log("method:",props.method)
    const navigate = useNavigate();

    const inputhandler =(e)=> {
        const {name,value}=e.target
        setInputs((inputs)=>({...inputs,[name]:value}))
        console.log(inputs)
    }
   
    // const savedata =()=>{
    //     if(props.method === 'put'){
    //         console.log("inside put")
    //         axios.put("http://localhost:4005/Restradetails/redit/"+inputs._id,inputs)
    //         .then(response=>{
    //             console.log("post data"+response.data)
    //             alert("success")
    //             window.location.reload(false);

    //         })
    //         .catch(err=>console.log(err))
    //     }
    // }
    const savedata = () => {
        const formdata = new FormData();
        formdata.append('restraname',inputs.restraname);
        formdata.append('rtsee',inputs.rtsee);
        formdata.append('rlocation',inputs.rlocation);
        formdata.append('rdesc',inputs.rdesc);
        formdata.append('rlatitude', inputs.rlatitude);
        formdata.append('rlongitude', inputs.rlongitude);
        formdata.append('restraphoto',selectedimage);

      
        fetch(`http://localhost:4005/Restradetails/redit/${inputs._id}`,
            { method: 'put', body: formdata, })
            .then((response) => response.json())
            .then((data) => {
                alert("Restaurant Edited")
                window.location.reload(false);
            })
            .catch((err) => {
                console.log("error", err)
            })

        navigate('/RestraView')

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
        <Typography variant='h5'>Edit Restaurant
  </Typography><br></br>
  <TextField id="outlined-basic" label="Places"
  variant="outlined"
  name="restraname" value={inputs.restraname}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField id="outlined-basic" label="Things to see"
  variant="outlined"
  name="rtsee" value={inputs.rtsee}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  {/* <TextField id="outlined-basic" label="photos"
  variant="outlined"
  name="placephoto" value={inputs.setSelectedimage}
  onChange={handleimage} /> */}
  <input
              type="file"
              
              onChange={handleimage}
              
            />
  <br></br>
  <br></br>
  <TextField id="outlined-basic" label="Location"
  variant="outlined" name="rlocation" value={inputs.rlocation}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField id="outlined-basic" label="Description"
  variant="outlined" name="rdesc" value={inputs.rdesc}
  onChange={inputhandler} />
  <br></br>
  <br></br>
  <TextField
        id="outlined-basic"
        label="Latitude"
        variant="outlined"
        name="rlatitude"
        value={inputs.rlatitude}
        onChange={inputhandler}
      />
      <br></br>
      <br></br>
      <TextField
        id="outlined-basic"
        label="Longitude"
        variant="outlined"
        name="rlongitude"
        value={inputs.rlongitude}
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

  export default Restraedit