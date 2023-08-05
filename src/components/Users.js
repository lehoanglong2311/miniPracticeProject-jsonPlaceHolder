import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import { getAllUser } from '../services/ApiService';
import { useNavigate, Outlet } from 'react-router-dom';
import './User.scss'

const Users = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    useEffect(() => {
        getAllUsers()

    }, [])

    console.log("data", users);
    const getAllUsers = async () => {
        try {
            const res = await getAllUser();
            const data = res.data
            setUsers(data);

        } catch (error) {
            console.error(error);
        }
    }
    const handleUSerClick = (userId) => {
        // navigate(`${userId}`)
        navigate(`${userId}`)

    }

    return (
        <div className='User-container container'>
            <h1>users</h1>

            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>username</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>website</th>
                            <th>city</th>
                            <th>Company Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (

                                <tr key={`table-user-${index}`}
                                    className='user-row'
                                    onClick={() => { handleUSerClick(user.id) }}
                                >
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.website}</td>
                                    <td>{user.address.city}</td>
                                    <td>{user.company.name}</td>

                                </tr>
                            )

                        })}


                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Users;
