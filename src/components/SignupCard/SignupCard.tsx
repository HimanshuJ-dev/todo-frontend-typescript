import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUserFetch } from '../../redux/user/userActions';
import { displayError } from '../LoginCard/LoginCard';
import { useNavigate } from 'react-router-dom';

export const SignupCard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (name.length < 1) {
        setNameError("Please enter a name");
      } else if (!email.includes("@")) {
        setEmailError("Invalid Email");
      } else if (password.length < 6) {
        setPasswordError("Password should be at least 6 characters long.");
      } else if (confirmPassword !== password) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        dispatch(createUserFetch({ name, email, password }));
        navigate('/');
      }
    };

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent) => {
      event.preventDefault();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Get the name and value of the input element.
      const { name, value } = e.target;
      // Set the state of the corresponding input value.
      if (name === "name") {
        setName(value);
      } else if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      } else if (name === "confirmPassword") {
        setConfirmPassword(value);
      }
      // Clear the email and password errors.
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
    };


  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: "20px",
          width: {
            xs: "95%",
            sm: "60%",
            md: "40%",
            lg: "30%",
          },
        }}
      >
        <Typography variant="h4" fontWeight={500} textAlign="center" mb="50px">
          Sign up to get started:
        </Typography>
        {nameError && displayError(nameError)}
        {emailError && displayError(emailError)}
        {passwordError && displayError(passwordError)}
        {confirmPasswordError && displayError(confirmPasswordError)}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            type="text"
            fullWidth
            sx={{ mb: "20px" }}
            name="name"
            value={name}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: "20px" }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
                      label="Password"
                      name='password'
            fullWidth
            sx={{ mb: "20px" }}
            value={password}
                      onChange={handleInputChange}
            error={password.length > 0 && password.length < 8}
            helperText={
              password.length > 0 && password.length < 8
                ? "Your password is too short"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
                      fullWidth
                      name='confirmPassword'
            sx={{ mb: "20px" }}
            value={confirmPassword}
            onChange={handleInputChange}
            error={password !== confirmPassword}
            helperText={
              password !== confirmPassword ? "Passwords do not match" : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ height: "50px" }}
          >
            Sign Up
          </Button>
        </form>
      </Card>
    </Box>
  );
}
