import { Helmet } from 'react-helmet-async';

// import { useTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import FloatingButton from './FloatingButton';
// components
// ----------------------------------------------------------------------

export default function Investment() {
    return (
        <>
            <Helmet>
                <title> Dashboard | Budget Manager </title>
            </Helmet>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back
                </Typography>
            </Container>
            <FloatingButton />
        </>
    );
}
