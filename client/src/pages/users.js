import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import * as API from '../services';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Users() {

  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserMovies, setSelectedUserMovies] = useState([]);
  const [selectedUserMoviesCount, setSelectedUserMoviesCount] = useState(0);


  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userAge, setUserAge] = useState(null);

  const [userID, setUserID] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleCloseCreateUser = () => setShowCreateUserModal(false);
  const handleOpenCreateUser = () => setShowCreateUserModal(true);

    const getUserMovies = (name, movies) => {
        setSelectedUserName(name);
        setSelectedUserMovies(movies);
        setSelectedUserMoviesCount(movies.length);
        setShowModal(true);
    };

    const deleteUser = (userID) => {
        API.deleteUser(userID).then((response) => {
            window.alert(response.message);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
    };

  useEffect(() => {
    API.getAllUsers().then((response) => {
        setUsers(response.users);
        setUsersCount(response.count);
    }).catch((err) => {
        console.log(err);
    });
  }, []);


    const fieldChangeHandler = (event) => {
        event.preventDefault();


        if (event.target.id === 'inlineFormInputUserID') {
            setUserID(event.target.value.trim());
        }

        if (event.target.id === 'createUserForm_Name') {
            setUserName(event.target.value);
        }

        if (event.target.id === 'createUserForm_Age') {
            setUserAge(event.target.value);
        }
    };

  const createUserHandler = (event) => {
      event.preventDefault();
      let userData = {
          name: userName,
          age: userAge,
      };

      API.createUser(userData).then(() => {
          window.location.reload();
      }).catch((err) => {
          console.log(err);
      });
  };


    const displayOneUserHandler = (event) => {
        event.preventDefault();

        API.getOneUser(userID).then((response) => {

            if (response.success === false) {
                window.alert('There is no user with the following ID: ' + userID);
            } else {
                window.alert('Name: ' + response.user.name + ' || Age: ' + response.user.age);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

  return (
    <Layout>
      <div className="mi-skills-area mi-section mi-padding-top">
        <div className="container">
            <div>

                <Button variant="primary" size="lg" onClick={handleOpenCreateUser}>
                    Create User
                </Button>
                {' '}
                <Form inline onSubmit={displayOneUserHandler}>
                    <Form.Label htmlFor="inlineFormInputName2" srOnly>
                        User ID
                    </Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="inlineFormInputUserID"
                        placeholder="User ID"
                        onChange={fieldChangeHandler}
                    />

                    <Button type="submit" className="mb-2">
                        Display One User
                    </Button>
                </Form>

                <h1 id='title'>{'Users (' + usersCount + ')'}</h1>
                <table id='users'>
                    <thead>
                        <tr>
                            <th key={'Id'}>Id</th>
                            <th key={'Name'}>Name</th>
                            <th key={'Age'}>Age</th>
                            <th key={'Actions'}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map(({ _id, name, age, movies }) => {
                                return (
                                    <tr
                                        key={ _id }
                                    >
                                        <td>{_id}</td>
                                        <td>{name}</td>
                                        <td>{age}</td>
                                        <td>
                                            <button variant="secondary" onClick={() => getUserMovies(name, movies)}>
                                                Display Movies
                                            </button>
                                            <button variant="secondary" onClick={() => deleteUser(_id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>

          <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>{selectedUserName} Movies ({selectedUserMoviesCount})</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <table id='movies'>
                      <thead>
                          <tr>
                              <th key={'Title'}>Title</th>
                              <th key={'Duration'}>Duration</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                          selectedUserMovies && selectedUserMovies.map(({ _id, title, duration }) => {
                              return (
                                  <tr
                                      key={ _id }
                                  >
                                      <td>{title}</td>
                                      <td>{duration}</td>
                                  </tr>
                              )
                          })
                      }
                      </tbody>
                  </table>
              </Modal.Body>
              <Modal.Footer>
                  <button variant="secondary" onClick={handleClose}>
                      Close
                  </button>
              </Modal.Footer>
          </Modal>


          <Modal show={showCreateUserModal} onHide={handleCloseCreateUser}>
              <Modal.Header closeButton>
                  <Modal.Title>Create New User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={createUserHandler}>
                      <Form.Group controlId="createUserForm_Name">
                          <Form.Label>User Name</Form.Label>
                          <Form.Control type="text" onChange={fieldChangeHandler} />
                      </Form.Group>

                      <Form.Group controlId="createUserForm_Age">
                          <Form.Label>User Age</Form.Label>
                          <Form.Control type="text" onChange={fieldChangeHandler} />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                          Submit
                      </Button>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <button variant="secondary" onClick={handleCloseCreateUser}>
                      Close
                  </button>
              </Modal.Footer>
          </Modal>
      </div>
    </Layout>
  );
}

export default Users;
