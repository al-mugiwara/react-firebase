import React, { Component, Fragment } from 'react';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { addDataToAPI, getDataFromAPI } from '../../../config/redux/action';
import Grid from '@mui/material/Grid';
import { color } from '@mui/system';
import { connect } from 'react-redux';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: ''
    }

    componentDidMount() {
        const userData = localStorage.getItem('userData')
        const dataUser = JSON.parse(userData)
        console.log('dashboard: ', JSON.parse(userData))
        this.props.getNotes(dataUser.uid)
    }



    handleSaveNotes = () => {
        const { title, content } = this.state;
        const { saveNotes } = this.props;
        const usernya = localStorage.getItem('userData')
        const dataUser = JSON.parse(usernya)
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: dataUser.uid
        }
        saveNotes(data)

    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }
    render() {
        const { title, content, date } = this.state;
        const { notes } = this.props;
        console.log('notes', notes);
        return (
            <Fragment>

                <Grid container spacing={2} padding={3}>
                    <Grid item xs={12} md={12}>
                        <Item>
                            <Card variant="outlined">
                                <CardContent>
                                    <Grid item xs={12} md={12} padding={2}>
                                        <Typography padding={1} variant="h6">Title</Typography> <TextField fullWidth label="Title" id="fullWidth" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                                    </Grid>
                                    <Grid item xs={12} md={12} padding={2}>
                                        <Typography padding={1} variant="h6">Content</Typography>
                                        <TextareaAutosize
                                            maxRows={100}
                                            label="Content"
                                            aria-label="maximum height"
                                            placeholder="Content"
                                            style={{ width: '100%', height: '10vh' }}
                                            value={content}
                                            onChange={(e) => this.onInputChange(e, 'content')}
                                        />
                                    </Grid>
                                    <Button variant="outlined" color="success" style={{ alignItems: 'center' }} onClick={this.handleSaveNotes}>
                                        SIMPAN
                                    </Button>
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>
                </Grid>
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <Grid container spacing={2} padding={3} key={note.id}>
                                            <Grid item xs={12} md={12}>
                                                <Item>
                                                    <Typography variant='h4' style={{ color: 'black' }} padding={1}>{note.data.title}</Typography>
                                                    <Typography variant='h6' padding={1}>{note.data.date}</Typography>
                                                    <Typography variant='h6' style={{ color: 'black' }} padding={2}>{note.data.content}</Typography>
                                                </Item>
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                        </Fragment>


                    ) : null
                }

            </Fragment>
        )
    }
}

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data))
})

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

export default connect(reduxState, reduxDispatch)(Dashboard);