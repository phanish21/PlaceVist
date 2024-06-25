import React, { useEffect, useState } from 'react';
import UsersList from './UserList';
import ErrorModal from './ErrorModel';
import { useHttpClient } from './HttpHook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:4000/api/users');
        setLoadedUsers(responseData.users);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Fetching users failed:', err);
        }
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
