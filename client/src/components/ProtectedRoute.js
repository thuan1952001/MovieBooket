import {message} from 'antd'
import React, { useEffect, useState } from 'react'
import {GetCurrentUser} from '../apicalls/users';

function ProtectedRoute({children}) {
const [user , setUser] = useState(null)


 const getCurrentUser = async () => {
    try {
        const response = await GetCurrentUser();
        if(response.success) {
            setUser(response.data);
        }else{
            setUser(null);
            message.error(response.message);
        }

    } catch (error) {
        
    }
 }

 useEffect(() => {
    getCurrentUser();
 },[])
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute