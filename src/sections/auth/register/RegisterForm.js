import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import userService from '../../../store/userService';

// ----------------------------------------------------------------------

export default function RegisterForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        contact: '',
    });

    const handleClick = async () => {

        setIsLoading(true);
        try {
            const user = await userService.register(formData.name, formData.email, formData.password, formData.contact);
            if (user) {
                window.alert("Registered Successfully. You can login now.")
                navigate('/login', { replace: true });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <>
            <Stack spacing={3} >
                <TextField name="name" label="Full Name" value={formData.name} onChange={handleFormChange} />

                <TextField name="email" label="Email address" value={formData.email} onChange={handleFormChange} />

                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleFormChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField name="contact" label="Mobile No." value={formData.contact} onChange={handleFormChange} />

            </Stack>
            <br />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} loading={isLoading}>
                Register
            </LoadingButton>
        </>
    );
}
