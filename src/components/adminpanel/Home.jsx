
import './home.css'
import Layout from './Layout';
import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material';
import axios from 'axios';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         FOUND IT !
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const Home = (props) => {
  const [count, setCount] = useState(0);
  const [hcount, setHcount] = useState(0);
  const [rcount, setRcount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:4005/Placedetails/count/');
        setCount(response.data.count);
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('http://localhost:4005/Hoteldetails/hcount/');
        setHcount(response.data.hcount);
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    fetchCount();
  }, []);


  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('http://localhost:4005/Restradetails/rcount/');
        setRcount(response.data.rcount);
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };

    fetchCount();
  }, []);


  return(
 <Layout> 
    <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: 40,
      gap: 5,
      alignItems: 'center',
      '& > :not(style)': {
        
        width: 200,
        height: 130,
        marginTop: 5,
      },
    }}
  >
    <Paper elevation={3} className='backdropBlur' style={{ backgroundColor: 'rgba(255, 255, 255, 0.088)', padding: '20px', marginBottom: '20px' }}><Typography variant="h5" fontWeight={"bold"}>Places Added</Typography><Typography variant="h3" fontWeight={"bold"}>{count}</Typography></Paper>
    <Paper elevation={3} className='backdropBlur' style={{ backgroundColor: 'rgba(255, 255, 255, 0.088)',padding: '20px', marginBottom: '20px' }}><Typography variant="h5" fontWeight={"bold"}>Hotels Added</Typography> <Typography variant="h3" fontWeight={"bold"}>{hcount}</Typography></Paper>
    <Paper elevation={3} className='backdropBlur' style={{ backgroundColor: 'rgba(255, 255, 255, 0.088)', padding: '20px', marginBottom: '20px' }}><Typography variant="h5" fontWeight={"bold"}>Restaurants Added</Typography><Typography variant="h3" fontWeight={"bold"}>{rcount}</Typography></Paper>
   
  </Box>
 
  </Layout>
);
 
 
  
}

export default Home



{/* <OutlinedCard></OutlinedCard> */}
     
     {/* <h1 className='wel'> Welcome to Admin Panel</h1> */}

     {/* <Sidebar/> */} 
     