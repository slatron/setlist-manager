import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {keyOptions, singerOptions, instrumentOptions} from './songData';

const ViewSongs = ({songs = []}) => {
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [filterByKey, setFilterByKey] = useState('Any');
  const [filterBySinger, setFilterBySinger] = useState('Any');
  const [filterByMike, setFilterByMike] = useState('');
  const [filterByCarl, setFilterByCarl] = useState('');
  const [filterByTed, setFilterByTed] = useState('');

  const allKeyOptions = ['Any'].concat(keyOptions);
  const allSingerOptions = ['Any'].concat(singerOptions);

  useEffect(() => {
    let filtered = [...songs];
    if (filterByKey !== 'Any') filtered = filtered.filter(s => s.key === filterByKey);
    if (filterBySinger !== 'Any') filtered = filtered.filter(s => s.singer === filterBySinger);
    if (filterByTed !== '') filtered = filtered.filter(s => s.carl === filterByTed);
    if (filterByCarl !== '') filtered = filtered.filter(s => s.carl === filterByCarl);
    if (filterByMike !== '') filtered = filtered.filter(s => s.mike === filterByMike);
    setFilteredSongs(filtered);
  }, [filterByKey, filterBySinger, filterByMike, filterByCarl, filterByTed, songs]);

  return  (
    <div>
      <h2>View Songs</h2>
      <div className="field-pair">
        <label htmlFor="by_key">Key</label>
        <select id="by_key" value={filterByKey} onChange={e => setFilterByKey(e.target.value)}>
          {allKeyOptions.map(k => <option value={k} key={k}>{k}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="by_singer">Singer</label>
        <select id="by_singer" value={filterBySinger} onChange={e => setFilterBySinger(e.target.value)}>
          {allSingerOptions.map(k => <option value={k} key={k}>{k}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="by_carl">Ted</label>
        <select id="by_ted" value={filterByTed} onChange={e => setFilterByCarl(e.target.value)}>
          {instrumentOptions.map(k => <option value={k} key={k}>{k}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="by_carl">Carl</label>
        <select id="by_carl" value={filterByCarl} onChange={e => setFilterByCarl(e.target.value)}>
          {instrumentOptions.map(k => <option value={k} key={k}>{k}</option>)}
        </select>
      </div>
      <div className="field-pair">
        <label htmlFor="by_mike">Mike</label>
        <select id="by_mike" value={filterByMike} onChange={e => setFilterByMike(e.target.value)}>
          {instrumentOptions.map(k => <option value={k} key={k}>{k}</option>)}
        </select>
      </div>
      <div className="view-songs">
        <table className="songlist">
          <thead>
            <tr>
              <th className="song-title"></th>
              <th className="short-col song-key">key</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map(s => (
              <tr key={s.id}>
                <td className="song-title">{s.title}</td>
                <td className="short-col song-key">{s.key}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ViewSongs.propTypes = {
  songs: PropTypes.array
};

export default ViewSongs;
