import React from 'react';
import { useState } from 'react';
import "./style.css";
import ServerChatRoom from '../ServerChatRoom/Index';

export default function Sidebar() {

  return (
    <div className='side-bar-wrapper'>

        <div className='sidebar-list-header'>
            <div className='sidebar-list-header-text'>Welcome to Nes!</div>
        </div>

        <div className="separator4" />

        <div className='sidebar-search-container'>

          <div className='sidebar-search-input-wrapper'>

            <div className='sidebar-search-input-icon'>  

              <input className='sidebar-search-input-text' 
                     placeholder='Search' 
                     type='text'/>

            </div>

          </div>

        </div>

      <div className="separator5" />
        
      <ServerChatRoom />     
            
    </div>
  )
}
