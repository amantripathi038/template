import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
// mocks_
import { LoadingButton } from '@mui/lab';

import { useNavigate } from 'react-router-dom';
import userService from '../../../store/userService';
import account from '../../../_mock/account';
import Iconify from '../../../components/iconify'

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     icon: 'eva:home-fill',
//   },
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//   },
//   {
//     label: 'Settings',
//     icon: 'eva:settings-2-fill',
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const [profile, setProfileOpen] = useState(false);
  const [name, setName] = useState(account.displayName)
  const [contact, setContact] = useState(account.contact)
  const [email, setEmail] = useState(account.email)
  const [isLoading, setIsLoading] = useState(false)
  const handleProfileOpen = () => {
    setProfileOpen(true);
    setOpen(false)
  }
  const handleEditProfile = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
      await userService.updateProfile(name, email, contact, token)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setName(account.displayName)
      setEmail(account.email)
      setContact(account.contact)
      setIsLoading(false)
      handleProfileClose()
    }
  }

  const handleProfileClose = () => {
    setProfileOpen(false);
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleContactChange = (event) => {
    setContact(event.target.value)
  }

  const handleLogout = async () => {
    localStorage.clear()
    sessionStorage.clear()
    await userService.logout()
    navigate('/login', { replace: true });
  }


  const [settingOpen, setSettingOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSettingOpen = () => {
    setSettingOpen(true)
    setOpen(false)
  }

  const handleSettingClose = () => {
    setSettingOpen(false)
  }

  const handlePasswordChange = (event) => {
    setOldPassword(event.target.value)
  }

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  const handleChangePassword = async () => {
    try {
      setIsLoading(true)
      if (newPassword === confirmPassword) {
        const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
        await userService.changePassword(oldPassword, newPassword, token)
      }
      else {
        alert("New Password & Confirm Password are not identical")
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setNewPassword("")
      setOldPassword("")
      setConfirmPassword("")
      setIsLoading(false)
      handleSettingClose()
    }
  }

  return (

    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem onClick={handleProfileOpen}>
            <Iconify icon={'eva:person-fill'} />Profile
          </MenuItem>
          <MenuItem onClick={handleSettingOpen}>
            <Iconify icon={'eva:settings-2-fill'} />Settings
          </MenuItem>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          <Iconify icon={'material-symbols:logout'} />Logout
        </MenuItem>
      </Popover>
      <Dialog open={profile} onClose={handleProfileClose}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>

          <TextField
            margin="dense"
            id="userName"
            label="Name"
            type="text"
            value={name}
            onChange={handleNameChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="userEmail"
            label="Email"
            type="text"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            variant="standard"
            disabled
          />
          <TextField
            margin="dense"
            id="userContact"
            label="Contact"
            type="text"
            value={contact}
            onChange={handleContactChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose}>Cancel</Button>
          <LoadingButton onClick={handleEditProfile} loading={isLoading}>Save</LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog open={settingOpen} onClose={handleSettingClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>

          <TextField
            margin="dense"
            id="password"
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={handlePasswordChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="newPassword"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingClose}>Cancel</Button>
          <LoadingButton onClick={handleChangePassword} loading={isLoading}>Change Password</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
