import React from 'react';
import "./AddPeopleModal.css";

function AddPeopleModal({ closeAddModal }) {
  return (
    <div className='modal-add-background'>
    <form className='modal-add-container'>
        <div className='title'>
            <p>Invite Friends</p>
        </div>
        <div className='body'>

          <div className='add-description'>
            <p>Invite friends to your group chat!</p>
          </div>

          <div className='add-title'>
            <p>Search</p>
          </div>
                
          <input
             className="add-people"
             placeholder="Invite your friends..."
             type="text"
           />

        </div>
        <div className='footer'>
            <button className='cancel-add-people-modal' onClick={() => closeAddModal(false)}>Cancel</button>
            <button className='continue-add-people-modal'>Continue</button>
        </div>
    </form>
</div>
  )
}

export default AddPeopleModal;