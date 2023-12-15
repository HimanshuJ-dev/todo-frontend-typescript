import { PasswordSharp, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsersFetch } from '../../redux/user/userActions';

export const displayError = (error: String) => {
  return (
    <Box
      bgcolor="#ffb8b8"
      width="100%"
      p="10px"
      mb="10px"
      textAlign="center"
      border="2px solid red"
      borderRadius="10px"
    >
      <Typography variant="h6" color="red">
        {error}
      </Typography>
    </Box>
  );
};

export const LoginCard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email.includes("@")) {
        setEmailError("Invalid Email");
      } else if (password.length < 6) {
        setPasswordError("Password should be at least 6 characters long");
      } else {
        dispatch(getUsersFetch({ email, password }));
        navigate("/");
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
      if (name === "email") {
        setEmail(value);
      } else if (name === "password") {
        setPassword(value);
      }
      // Clear the email and password errors.
      setEmailError("");
      setPasswordError("");
      setLoginError("");
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
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign="center"
            mb="30px"
          >
            Login now to continue tasks:
          </Typography>
          {emailError && displayError(emailError)}
          {passwordError && displayError(passwordError)}
          {loginError && displayError(loginError)}
          <form onSubmit={handleSubmit}>
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
              name="password"
              fullWidth
              sx={{ mb: "20px" }}
              value={password}
              onChange={handleInputChange}
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
              fullWidth
              sx={{ height: "50px" }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Card>
      </Box>
    );
}
