import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';


export const Members = () => {

    const [users, setUsers] = useState([]);

    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/users`);
            setUsers(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      });


  return (
    currentUser ? <div className='member-container'>
        <div className='member'>
            <h1 className='members-heading'>Members({users.length})</h1>
            <table className='member-table'>
                <tr className='tr'>
                    <th>User Id</th>
                    <th>User Image</th>
                    <th>Username</th>
                    <th>E-mail</th>
                </tr>
                {users.map(user => {
                    return (
                    <tr className='member-li'>
                        <td className='member-user-id'>{user?.id}</td>
                        <td><img src={`/upload/${user?.img}`} alt=''/></td>
                        <td><Link className='member-username-link' to={`../user/${user.id}`}><h3 className='member-username'>{user?.username}</h3></Link></td>
                        <td><p className='member-email'>{user?.email}</p></td>
                    </tr>

                    )
                } 
                
                )} 
            </table>
        </div>
    </div> : <div className='member-fail'>You Cannot View This Page Without Login!!!</div>
  )
}

export default Members