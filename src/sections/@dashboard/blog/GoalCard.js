import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Grid, Typography, CardContent, CircularProgress, Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
// utils
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Delete, PauseCircle, PlayCircle, Verified } from '@mui/icons-material';
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

GoalCard.propTypes = {
    goal: PropTypes.object.isRequired,
};

function getRandomColor() {
    const letters = 'BCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number,
    savedAmount: PropTypes.number,
    targetAmount: PropTypes.number
}

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} size={'28vh'} style={{ border: '0.6vh solid', borderRadius: '100vh', borderColor: 'GrayText' }} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h3" component="div">
                    {`${Math.round(props.value)}%`}
                    <br />
                    <Typography variant='caption' component='div' color='text-secondary'>
                        {`${props.savedAmount} / ${props.targetAmount}`}
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}

export default function GoalCard({ goal }) {
    const { goalName, desiredDate, savedAmount, targetAmount, goalStatus, _id } = goal;
    const color = getRandomColor();
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState(0)

    const handleGoalStatus = async (status) => {
        try {
            setIsLoading(true)
            const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
            await userService.changeGoalStatus(token, _id, status)
        }
        catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    const [creditToggle, setCreditToggle] = useState(false)
    const creditToggler = () => {
        setCreditToggle(!creditToggle)
    }

    const handleAddCredit = async (amount) => {
        setIsLoading(true)
        const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
        await userService.addSavedAmount(token, _id, amount)
        setIsLoading(false)
        creditToggler()
    }
    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ position: 'relative' }} style={{ background: color }}>
                <CardContent>
                    <StyledTitle
                        fontSize={"3.5vh"}
                        variant="subtitle2"
                        underline="none"
                        color="#061B64"
                        align='center'
                    >
                        {goalName}
                    </StyledTitle>
                    <Typography variant="caption" fontSize={"2.5vh"} color={"darkgreen"}><center><strong>{"Desired Date: "}{desiredDate}</strong></center></Typography>
                    <center><CircularProgressWithLabel value={Math.floor(savedAmount * 100 / targetAmount) > 100 ? 100 : Math.floor(savedAmount * 100 / targetAmount)} savedAmount={savedAmount} targetAmount={targetAmount} /></center>
                    <StyledInfo sx={{ display: 'flex', justifyContent: 'center' }}>
                        {goalStatus === 'active' &&
                            <>
                                <LoadingButton variant="text" onClick={() => handleGoalStatus('pause')} loading={isLoading}><PauseCircle /></LoadingButton>
                                <LoadingButton color='success' variant="text" onClick={() => handleGoalStatus('complete')} loading={isLoading}><Verified /></LoadingButton>
                            </>
                        }
                        {goalStatus === 'paused' &&
                            <>
                                <LoadingButton variant="text" onClick={() => handleGoalStatus('active')} loading={isLoading}><PlayCircle /></LoadingButton>
                                <LoadingButton color='success' variant="text" onClick={() => handleGoalStatus('complete')} loading={isLoading}><Verified /></LoadingButton>
                            </>
                        }
                        <LoadingButton color='error' variant="text" onClick={() => handleGoalStatus('delete')} loading={isLoading}><Delete /></LoadingButton>
                    </StyledInfo>
                    <br />
                    {goalStatus === 'active' && <center><Button variant="contained" onClick={creditToggler}>Add Saved Amount</Button></center>}
                </CardContent>
            </Card>
            <Dialog open={creditToggle} onClose={creditToggler}>
                <DialogTitle>Add Saved Amount</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="addCredit"
                        label="Amount"
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={creditToggler}>Cancel</Button>
                    <LoadingButton onClick={() => handleAddCredit(amount)} loading={isLoading}>Add</LoadingButton>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
