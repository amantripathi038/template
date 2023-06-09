import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import { Slide } from 'react-reveal';
import Iconify from '../components/iconify';
import BlogPostCard from '../sections/@dashboard/blog/BlogPostCard';
// mock
import AddAccountModal from './addAccountModal';
import store from '../store/store';
import FloatingButton from './FloatingButton';

export default function BlogPage() {
  const [dialog, dialogOpen] = useState(false)
  const { accounts } = store.getState().user.user
  const POSTS = accounts
  const handleDialogOpen = () => {
    dialogOpen(!dialog);
  };
  return (
    <>
      <Helmet>
        <title> Accounts | BudMan </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Accounts
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleDialogOpen}>
            New Account
          </Button>
          <AddAccountModal dialog={dialog} dialogOpen={dialogOpen} />
        </Stack>
        <Slide right>
          <Grid container spacing={3}>
            {POSTS.map((post, index) => (
              <BlogPostCard key={post._id} post={post} index={index} />
            ))}
          </Grid>
        </Slide>
        <FloatingButton />
      </Container>
    </>
  );
}
