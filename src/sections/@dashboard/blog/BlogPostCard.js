import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 0,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  // display: 'flex',
  // flexWrap: 'wrap',
  justifyContent: 'left',
  marginTop: theme.spacing(1),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

function getRandomColor() {
  const letters = 'BCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i+=1 ) {
      color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

export default function BlogPostCard({ post, index }) {
  const { cover, title, view, type, amount, author, accountno } = post;
  const latestPostLarge = 0;
  const latestPost = 0;

  const POST_INFO = [
    { number: type, icon: 'ic:baseline-currency-rupee' },
    // { number: view, icon: 'eva:eye-fill' },
    // { number: share, icon: 'eva:share-fill' },
  ];
  const color = getRandomColor();
  // console.log(color, " ")
  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 4}>
      <Card sx={{ position: 'relative' }} style={{ background: color }}>


{/* linear-gradient(90deg, #081b37, #092850, #08356b, #084287, #0b50a4, #115ec2, #1b6de0, #277bff) */}
         {/* <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        > 
          {/* <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { 
                display: 'none' 
              }),
            }}
          /> */}
          {/*
           <StyledAvatar
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          /> 
          
          <StyledCover alt={title} src={cover} />
        </StyledCardMedia>  */}

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
          <Typography gutterBottom variant="caption" sx={{ color: '#061B64', display: 'block' }}>
            {accountno}
          </Typography>

          <StyledTitle
            
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
                  color:'#061B64',
                  
                  
                  // ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: '#061B64',
                  }),
                }}
                
              >
                
                <Typography variant="caption">{type}</Typography>
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
                  color:'#061B64',
                  
                  
                  // ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: '#061B64',
                  }),
                }}
                
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(amount)}</Typography>
              </Box>
            ))}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
