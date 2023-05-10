import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Grid, Typography, CardContent } from '@mui/material';
// utils
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { fShortenNumber } from '../../../utils/formatNumber';
import userService from '../../../store/userService';

// ----------------------------------------------------------------------


const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 0,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});


const StyledInfo = styled('div')(({ theme }) => ({
  justifyContent: 'left',
  marginTop: theme.spacing(1),
  color: theme.palette.text.disabled,
}));

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

function getRandomColor() {
  const letters = 'BCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

export default function BlogPostCard({ post }) {
  const { accountName, accountType, accountBalance, accountNumber, _id } = post;
  const color = getRandomColor();
  const [isLoading, setIsLoading] = useState(false)
  const handleAccountDelete = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
      await userService.deleteAccount(token, _id)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setIsLoading(false)
    }
  }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ position: 'relative' }} style={{ background: color }}>
        <CardContent sx={{ pt: 4 }} >
          <Typography gutterBottom variant="caption" sx={{ color: '#061B64', display: 'block' }} fontSize={"2vh"}>
            <strong>{`Account Number: ${accountNumber}`}</strong>
          </Typography>

          <StyledTitle
            fontSize={"3.5vh"}
            variant="subtitle2"
            underline="none"
            color="#061B64"
          >
            {accountName}
          </StyledTitle>
          <StyledInfo>
            <Typography variant="caption" fontSize={"2.5vh"} fontWeight={"bold"} color={"darkolivegreen"}>{accountType}</Typography>
          </StyledInfo>
          <StyledInfo sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" fontSize={"2.5vh"} color={"darkgreen"}><strong>{"₹ "}{fShortenNumber(accountBalance)}</strong></Typography>
            <LoadingButton color='error' variant="text" onClick={handleAccountDelete} loading={isLoading}>Delete</LoadingButton>
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
