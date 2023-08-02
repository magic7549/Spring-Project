import React, { useEffect, useState } from 'react';
import {Users} from '../components/users';

//css
import '../css/Error.css';


function Error() {
  const [query, setQuery] = useState("");


  return(
    <div className="error_box">
      <input 
        type="text" 
        placeholder="Search" 
        className="search" 
        onChange={e=> setQuery(e.target.value)} />
      <ul className="list">
        {Users.map((user) => (
          <li key={user.id} className="listItem">{user.first_name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Error;