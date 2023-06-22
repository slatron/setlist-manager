import React from 'react';
import PropTypes from 'prop-types';

const SelectSetlist = ({setSelectedListId, checkToggleEdit, editMode, selectedListId, setlists}) => (
  <div className="list-selector">
    <label htmlFor="selectSetlist">Setlist</label>
    <div className="select-container">
      <select value={selectedListId || ''} id="selectSetlist" onChange={e => setSelectedListId(e.target.value)}>
        {setlists.map(list => <option value={list.id} key={list.id}>{list.title}</option>)}
      </select>
    </div>
    <button className={editMode ? 'active' : ''} type="button" onClick={checkToggleEdit}>
      {editMode ? 'Lock' : 'Edit'}
    </button>
  </div>
);  

SelectSetlist.propTypes = {
  setSelectedListId: PropTypes.func,
  editMode: PropTypes.bool,
  selectedListId: PropTypes.string,
  setlists: PropTypes.array,
  checkToggleEdit: PropTypes.func,
};

export default SelectSetlist;
