import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PreviewIcon from '@mui/icons-material/Preview';

const Sidebar = () => {

  
  return (
    <div className="sidebar">
        <ul>
        <a href='/Home'><li className='list-item'> <HomeIcon className='icon'/>HOME</li></a>
       </ul>
       <div className='list-item'>
       <EditNoteIcon className='icon'/>Registrations
        </div>
       <ul>
       <a href="/Places">
        <li className='list-item'>Places</li></a>
        <a href="/Hotel">
        <li className='list-item'>Hotels</li></a>
        <a href="/Restra">
        <li className='list-item'>Restaurants</li></a>
       </ul>
       <div className='list-item'>
       <PreviewIcon className='icon'/>View
       </div>
       <ul>
       <a href="/PlaceView"><li className='list-item'>Place Details</li></a>
       <a href="/HotelView"><li className='list-item'>Hotel Details</li></a>
       <a href="/RestraView"><li className='list-item'>Restaurant Details</li></a>
      </ul>
      
    </div>
  );
};

export default Sidebar;