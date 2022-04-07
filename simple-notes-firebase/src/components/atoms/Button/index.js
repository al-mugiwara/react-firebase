import React from 'react';
import Button from '@mui/material/Button';

const Tombol = ({ title, onClick, loading }) => {
    if (loading) {
        return(
            <Button
            disabled
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            Loading....
        </Button>
        )
        
    }
    return (
        <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onClick}
        >
            {title}
        </Button>
    )
}

export default Tombol;