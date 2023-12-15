import React from 'react';
import {SampleTable} from '../SampleTable/SampleTable';
import { useDispatch, useSelector } from 'react-redux';
import { userRootState } from '../../redux/user/userReducer';
import { getAllUsersFetch } from '../../redux/user/userActions';

export type Data = {
  name: string;
  email: string;
}

// const data: Data[] = [
//   { name: 'John Doe', email: 'john@example.com' },
//   { name: 'Jane Doe', email: 'jane@example.com' },
// ];

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
];

export const AllUsers: React.FC = () => {

    const dispatch = useDispatch();

    
    const users: Data[] = useSelector(
      (state: userRootState) => state.user.users
    );
    console.log("users:", users);

  return (
    <div>
      <SampleTable data={users} columns={columns} />
    </div>
  );
}
