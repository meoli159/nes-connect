import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import communityService from "../../api/communityService";
import "./AddPeopleModal.css";

function AddPeopleModal({ closeAddModal }) {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const currentCommunity = useSelector(
    (state) => state.messages?.currentCommunity
  );
  // const [editCommunityName, setEditCommunityName] = useState("");
  const dispatch = useDispatch();

  const handleCloseModal = (e) => {
    e.preventDefault();
    closeAddModal(false);
  };

  const handleEditCommunity = (e) => {
    e.preventDefault();

    communityService.generateLinkInvite(
      currentCommunity?._id,
      user._id ,
    );

    // handleCloseModal(e);
  };

  return (
    <div className='modal-add-background'>

    <form className='modal-add-container'>
      <div className='add-modal-title '>
        <p>Invite Friends</p>
      </div>

      <div className='add-modal-body'>

        <div className='modal-add-wrapper'>

          <div className='add-description'>
            <p>Invite friends to your group chat!</p>
          </div>

          <div className='add-title'>
            <p>Search</p>
          </div>

          <div className='add-people-input-wrapper'>
            <input
              className="add-people-input "
              placeholder="Invite your friends..."
              type="text"
            />
          </div>

        </div>

      </div>

      <div className='add-modal-footer'>
        <button className='cancel-add-people-modal' onClick={handleCloseModal}>Cancel</button>
        <button className='continue-add-people-modal'>Add</button>
      </div>
    </form>

  </div>
  )
}

export default AddPeopleModal;