import React from 'react';
import Button from '@mui/material/Button';

const Tombol = ({title,onClick}) => {
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