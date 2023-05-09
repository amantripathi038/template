import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Typography, CardContent } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------


const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 0,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});


const StyledInfo = styled('div')(({ theme }) => ({
  // display: 'flex',
  // flexWrap: 'wrap',
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
  const { title, type, amount, accountno } = post;
  const latestPostLarge = 0;
  const latestPost = 0;

  const POST_INFO = [
    { number: type, icon: 'ic:baseline-currency-rupee' },

  ];
  const color = getRandomColor();
  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 4}>
      <Card sx={{ position: 'relative' }} style={{ background: color }}>
        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            }),
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: '#061B64', display: 'block' }} fontSize={"2vh"}>
            <strong>{accountno}</strong>
          </Typography>

          <StyledTitle
            fontSize={"3.5vh"}
            variant="subtitle2"
            underline="none"
            color="#061B64"
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: '#061B64',
              }),
            }}
          >
            {title}
          </StyledTitle>
          <StyledInfo>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'left',
                  color: '#061B64',


                  // ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: '#061B64',
                  }),
                }}

              >

                <Typography variant="caption" fontSize={"2vh"}>{type}</Typography>
              </Box>
            ))}
          </StyledInfo>
          <StyledInfo>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'left',
                  color: '#061B64',


                  // ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: '#061B64',
                  }),
                }}

              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption" fontSize={"2vh"}>{fShortenNumber(amount)}</Typography>
              </Box>
            ))}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
