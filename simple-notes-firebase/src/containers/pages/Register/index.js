import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import firebaseConfig from '../../../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Tombol from '../../../components/atoms/Button';

class Register extends React.Component {

    state = {
        formRegister: {
            email: '',
            password: ''
        }

    }

    handleChangeText = (event) => {
        let formRegisterNew = {
            ...this.state.formRegister
        }
        formRegisterNew[event.target.id] = event.target.value;
        //console.log(event.target.id);
        this.setState({
            formRegister: formRegisterNew
        }, () => {

        })
    }

    handleRegisterSubmit = () => {
        console.log(this.state.formRegister);

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.state.formRegister.email, this.state.formRegister.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('success    : ',userCredential);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage)
                // ..
            });


        // firebaseConfig.auth().createUserWithEmailAndPassword(this.state.formRegister.email, this.state.formRegister.password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         var user = userCredential.user;
        //         console.log('success    : ',userCredential);
        //         // ...
        //     })
        //     .catch((error) => {
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // ..
        //         console.log(errorCode,errorMessage)
        //     });
    }

    render() {
        const theme = createTheme();


        // const handleSubmit = (event) => {
        //     event.preventDefault();
        //     const data = new FormData(event.currentTarget);
        //     console.log({
        //         email: data.get('email'),
        //         password: data.get('password'),
        //     });
        // };

        function Copyright(props) {
            return (
                <Typography variant="body2" color="text.secondary" align="center" {...props}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://mui.com/">
                        Your Website
            </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            );
        }
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register Page
            </Typography>
                        {/* onSubmit={handleSubmit}  */}
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                onChange={this.handleChangeText}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChangeText}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                           <Tombol onClick={this.handleRegisterSubmit} title="Register hei" />


                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                  </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        )
    }
}
export default Register;



