/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import './Config-module.css';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Helmet } from 'react-helmet';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import ContainerList from '../../components/ConfigList/ContainerList';
import { auth } from '../../firebase';

document.body.style.overflow = 'hidden';

const Edit = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const user = auth.currentUser;

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  // State for the main password field
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(faEyeSlash);

  // State for password confirmation field
  const [typeConfirm, setConfirmPasswordType] = useState('password');
  const [iconConfirm, setConfirmPasswordIcon] = useState(faEyeSlash);

  // Set the initial state of the image to null
  const [imagem, setImagem] = useState(null);

  const [values, setValues] = useState({
    currentEmail: '',
    currentPassword: '',
    name: '',
    lastName: '',
    newEmail: '',
    newPassword: '',

    error: '',
  });

  const handleToggle = () => {
    // For the main password field
    if (type === 'password') {
      setIcon(faEye);
      setType('text');
    } else {
      setIcon(faEyeSlash);
      setType('password');
    }
  };

  const handleToggleConfirmPassword = () => {
    if (typeConfirm === 'password') {
      setConfirmPasswordIcon(faEye);
      setConfirmPasswordType('text');
    } else {
      setConfirmPasswordIcon(faEyeSlash);
      setConfirmPasswordType('password');
    }
  };

  useEffect(async () => {
    const userData = await axios.get(
      `http://localhost:3001/user/get/${user.uid}`
    );

    // setValues(userData.data);
    console.log(userData.data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(values);
    axios.post('http://localhost:3001/user/edit', values);
  };

  // Function to handle file selection event
  function handleImagemSelecionada(event) {
    const arquivo = event.target.files[0];
    const leitor = new FileReader();

    leitor.onload = function (event) {
      setImagem(event.target.result);
    };

    leitor.readAsDataURL(arquivo);
  }

  return (
    <div className="page-edit">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
          crossOrigin="anonymous"
        />
      </Helmet>

      <ContainerList />

      <div className="col" style={{ marginTop: '-90px' }}>
        <h4 class="panel-title">Edit profile</h4>
        <div className="row">
          <div className="col mb-3">
            <div
              className="card"
              style={{
                width: '105%',
                borderRadius: '16px',
                marginLeft: '-10px',
                marginBottom: '-20px',
                border: 'none',
              }}
            >
              <div className="card-body">
                <div className="e-profile">
                  <div className="row align-items-start">
                    <div className="col-12 col-sm-auto mb-3">
                      <div
                        className="mx-auto"
                        style={{
                          width: '160px',
                        }}
                      >
                        <label htmlFor="fileUpload">
                          <div
                            className="d-flex justify-content-center align-items-center rounded-circle"
                            style={{
                              height: '160px',
                              width: '170px',
                              backgroundColor: 'rgb(233, 236, 239)',
                              backgroundImage: imagem
                                ? `url(${imagem})`
                                : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              border: '3px solid rgb(215, 215, 215)',
                              borderWidth: '4px',
                              borderStyle: 'solid',
                            }}
                            onMouseOver={(e) => {
                              e.target.style.boxShadow = '0 0 10px 0 #42B0FF';
                            }}
                            onMouseOut={(e) => {
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            {/* Aqui, você pode adicionar um ícone de upload ou algum texto indicando que é possível fazer upload de uma imagem */}
                          </div>
                          <input
                            type="file"
                            id="fileUpload"
                            className="d-none"
                            onChange={handleImagemSelecionada}
                          />
                        </label>
                      </div>
                    </div>
                    <div
                      className="col d-flex flex-column flex-sm-row justify-content-between mb-3"
                      style={{ marginTop: '30px' }}
                    >
                      <div className="text-center text-sm-left mb-2 mb-sm-0">
                        <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                          John Smith
                        </h4>
                        <p className="mb-0">@johnny.s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-content pt-3">
        <div className="tab-pane active">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="username">Last Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="displayName"
                        value={values.lastName}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={values.currentEmail}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            currentEmail: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="email">New Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="user@example.com"
                        value={values.email}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 mb-3">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="current-password">Current Password</label>
                      <div className="input-group position-relative mb-3">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          placeholder="••••••"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          style={{ width: '100%' }}
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text position-absolute border-0"
                            style={{
                              right: '10px',
                              top: '57%',
                              transform: 'translateY(-50%)',
                              backgroundColor: 'transparent',
                              borderColor: 'transparent',
                              cursor: 'pointer',
                            }}
                            onClick={handlePasswordVisibility}
                          >
                            <FontAwesomeIcon
                              icon={showPassword ? faEye : faEyeSlash}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{
                      marginLeft: '1px',
                      width: '100%',
                    }}
                  >
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="confirm-password">
                          <span className="d-none d-xl-inline">Password</span>
                        </label>
                        <input
                          className="form-control mb-3"
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder="••••••"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              password: e.target.value,
                            })
                          }
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text position-absolute border-0"
                            style={{
                              right: '24px',
                              top: '57%',
                              transform: 'translateY(-55%)',
                              backgroundColor: 'transparent',
                              borderColor: 'transparent',
                              cursor: 'pointer',
                            }}
                            onClick={handleNewPasswordVisibility}
                          >
                            <FontAwesomeIcon
                              icon={showNewPassword ? faEye : faEyeSlash}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col d-flex justify-content-end">
                    {values.error && (
                      <p className={styles.error}>{values.error}</p>
                    )}{' '}
                    <button
                      className="btn btn-success btn-rounded btn-lg"
                      type="submit"
                      style={{
                        borderRadius: '30px',
                        marginTop: '30px',
                        height: '60px',
                        backgroundColor: '#42B0FF',
                        border: 'none',
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
