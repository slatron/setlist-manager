import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '/src/api';
import {onValue, get, set, push, remove} from 'firebase/database';
import CommonTemplate from '/src/components/Layout/CommonTemplate';

import Setlist from './Setlist';
import SetlistAdmin from './SetlistAdmin';
import SelectSetlist from './SelectSetlist';
import HighlightControls from './HighlightControls';

import './setlist.css';

const SetlistPage = ({user}) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [setlists, setSetlists] = useState([]);
  const [songs, setSongs] = useState([]);

  const [showMike, setShowMike]   = useState(true);
  const [showCarl, setShowCarl]   = useState(true);
  const [highlight, setHighlight] = useState('singer');

  const [setlistMap, setSetlistMap] = useState({});
  const [songsMap, setSongsMap] = useState({});

  const [loadingSongs, setLoadingSongs] = useState(true);
  const [loadingSetlists, setLoadingSetlists] = useState(true);

  // Initialize onValue observers to update songs and setlists state on changes
  useEffect(() => {
    const makeArrayFromDB = snapshot => {
      return Object.entries(snapshot.val()).map(([id, item]) => {
        item.id = id;
        return item;
      });
    };
    
    const songlistsRef = onValue(api.getSonglistsRef(), snapshot => {
      setSetlistMap(snapshot.val());
      const lists = makeArrayFromDB(snapshot).reverse();
      setSetlists(lists);
      // if current selectedListId is unset, set to first list
      setSelectedListId(current => {
        if (lists.length > 0 && current === null) return lists[0].id;
        return current;
      });
      setLoadingSetlists(false);
    });
    
    const songsRef = onValue(api.getSongsRef(), snapshot => {
      setSongsMap(snapshot.val());
      const songsArr = makeArrayFromDB(snapshot);
      setSongs(songsArr);
      setLoadingSongs(false);
    });

    return () => {
      songlistsRef();
      songsRef();
    };
  }, []);

  const handleRemoveSong = songId => {
    const songlistSongsRef = api.getSonglistSongsRef(selectedListId);
    get(songlistSongsRef).then(songs => {
      const songsData = songs.val();
      const removedOrder = songsData[songId];
      delete songsData[songId];
      for (const song in songsData) {
        if (songsData[song] > removedOrder ) {
          songsData[song]--;
        }
      }
      set(songlistSongsRef, songsData);
    });
  };

  const handleReorderSetlist = (startIndex, endIndex) => {
    const songlistSongsRef = api.getSonglistSongsRef(selectedListId);
    get(songlistSongsRef).then(songs => {
      const songsData = songs.val();
      for (const song in songsData) {
        const oldPos = songsData[song];
        if (oldPos === startIndex ) {
          songsData[song] = endIndex;
        } else if (oldPos < startIndex  && oldPos >= endIndex) {
          songsData[song] = oldPos + 1;
        } else if (oldPos > startIndex  && oldPos <= endIndex) {
          songsData[song] = oldPos - 1;
        }
      }
      set(songlistSongsRef, songsData);
    });
  };

  const checkToggleEdit = () => {
    if (user.isAnonymous === true) {
      alert('please log in to edit setlists.');
    } else {
      setEditMode(edit => !edit);
    }
  };


  const handleRenameSetlist = title => {
    const songlistRef = api.getSonglistRef(selectedListId);
    get(songlistRef).then(list => {
      const listData = list.val() || {};
      listData.title = title;
      set(songlistRef, listData);
    });
  };

  const handleAddSetlist = title => {
    const songlistsRef = api.getSonglistsRef();
    const newListRef = push(songlistsRef);
    set(newListRef, {title});
  };

  const handleDeleteList = () => {
    if (setlists.length === 1) {
      alert('You cannot delete the Last Setlist');
    } else {
      const firstListId = setlists[0].id;
      const newListId = firstListId === selectedListId ? setlists[1].id : firstListId;
      const songlistRef = api.getSonglistRef(selectedListId);
      remove(songlistRef);
      setSelectedListId(newListId);
    }
  };

  const handleAddSong = songId => {
    const songlistSongsRef = api.getSonglistSongsRef(selectedListId);
    get(songlistSongsRef).then(songs => {
      const songsData = songs.val() || {};
      const setlistObj = setlistMap[selectedListId];
      const songsObj = setlistObj?.songs || {};
      const newLastNumber = Object.keys(songsObj).length;
      songsData[songId] = newLastNumber;
      set(songlistSongsRef, songsData);
    });
  };

  if (loadingSetlists || loadingSongs) return <p>Loading...</p>;

  if (selectedListId === null) setSelectedListId(setlists[0].id);

  const setlistObj = setlistMap[selectedListId || setlists[0].id];
  const songsObj = setlistObj?.songs || {};
  const includedSongIds =  Object.keys(songsObj);
  const songsNotInList = songs.filter(s => !includedSongIds.includes(s.id));

  const inLegend = new Set();
  if (highlight !== '') includedSongIds.forEach(id => inLegend.add(songsMap[id][highlight]));

  return  (
    <CommonTemplate {...{user}}>
      <div className="page-setlist">
        {editMode &&
          <SetlistAdmin
            title={setlistMap[selectedListId].title}
            handleRenameSetlist={handleRenameSetlist}
            handleAddSong={handleAddSong}
            handleAddSetlist={handleAddSetlist}
            handleDeleteList={handleDeleteList}
            songsNotInList={songsNotInList}
          />
        }
        <HighlightControls
          inLegend={inLegend}
          highlight={highlight}
          showMike={showMike}
          showCarl={showCarl}
          setShowMike={setShowMike}
          setShowCarl={setShowCarl}
          setHighlight={setHighlight}/>
        <SelectSetlist
          setSelectedListId={setSelectedListId}
          checkToggleEdit={checkToggleEdit}
          editMode={editMode}
          selectedListId={selectedListId}
          setlists={setlists}
        />
        <Setlist
          editMode={editMode}
          setlist={setlistMap[selectedListId]}
          songsMap={songsMap}
          handleRemoveSong={handleRemoveSong}
          handleReorderSetlist={handleReorderSetlist}
          showMike={showMike}
          showCarl={showCarl}
          highlight={highlight}
        />
      </div>
    </CommonTemplate>
  );
};

SetlistPage.propTypes = {
  user: PropTypes.object.isRequired
};

export default SetlistPage;
