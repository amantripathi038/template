import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, Tabs, Tab, Button, Stack, Divider, Grid, Dialog, DialogActions, TextField, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
// components
import { TabPanel, TabContext, LoadingButton } from '@mui/lab'
import Iconify from '../components/iconify';
import FloatingButton from './FloatingButton';
import store from '../store/store';
import GoalCard from '../sections/@dashboard/blog/GoalCard'
import userService from '../store/userService';

// ----------------------------------------------------------------------

export default function Goals() {
    const [value, setValue] = useState("1");
    const [dialog, dialogOpen] = useState(false)
    const { goals } = store.getState().user.user
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleDialogOpen = () => {
        dialogOpen(!dialog);
    };
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [goalName, setGoalName] = useState("")
    const [targetAmount, setTargetAmount] = useState(0)
    const [savedAmount, setSavedAmount] = useState(0)
    const [desiredDate, setDesiredDate] = useState(formattedDate)

    const handleAddGoal = async () => {
        if (!goalName || !targetAmount || !desiredDate) {
            alert("Complete all fields")
            return
        }
        setIsLoading(true)
        const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
        await userService.addGoal(token, goalName, targetAmount, savedAmount, desiredDate)
        setIsLoading(false)
        handleDialogOpen()
    }

    return (
        <>
            <Helmet>
                <title> Goals | BudMan </title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Goals
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleDialogOpen}>
                        New Goal
                    </Button>
                </Stack>
                <TabContext value={value}>
                    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Active" value="1" />
                            <Tab label="Paused" value="2" />
                            <Tab label="Completed" value="3" />
                        </Tabs>
                        <Divider />
                        <TabPanel value="1">
                            <Grid container spacing={3}>
                                {goals
                                    .filter(goal => goal.goalStatus === 'active')
                                    .map((goal, index) => (
                                        <GoalCard key={goal._id} goal={goal} index={index} />
                                    ))}
                            </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid container spacing={3}>
                                {goals
                                    .filter(goal => goal.goalStatus === 'paused')
                                    .map((goal, index) => (
                                        <GoalCard key={goal._id} goal={goal} index={index} />
                                    ))}
                            </Grid>
                        </TabPanel>
                        <TabPanel value="3">
                            <Grid container spacing={3}>
                                {goals
                                    .filter(goal => goal.goalStatus === 'completed')
                                    .map((goal, index) => (
                                        <GoalCard key={goal._id} goal={goal} index={index} />
                                    ))}
                            </Grid>
                        </TabPanel>
                    </Box>
                </TabContext>

                <Dialog open={dialog} onClose={handleDialogOpen}>
                    <DialogTitle>Add Goal</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter Goal Details
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="goalName"
                            label="Goal Name"
                            type="text"
                            value={goalName}
                            onChange={(event) => setGoalName(event.target.value)}
                            fullWidth
                            variant="standard"
                            required
                        />
                        <TextField
                            margin="dense"
                            id="targetAmount"
                            label="Target Amount"
                            type="number"
                            value={targetAmount}
                            onChange={(event) => setTargetAmount(event.target.value)}
                            fullWidth
                            variant="standard"
                            required
                        />
                        <TextField
                            margin="dense"
                            id="savedAmount"
                            label="Saved Amount"
                            type="number"
                            value={savedAmount}
                            onChange={(event) => setSavedAmount(event.target.value)}
                            fullWidth
                            variant="standard"
                            required
                        />
                        <TextField
                            margin="dense"
                            id="desiredDate"
                            label="Desired Date"
                            type="date"
                            value={desiredDate}
                            onChange={(event) => setDesiredDate(event.target.value)}
                            fullWidth
                            variant="standard"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogOpen}>Cancel</Button>
                        <LoadingButton onClick={handleAddGoal} loading={isLoading}>Add</LoadingButton>
                    </DialogActions>
                </Dialog>
                <FloatingButton />
            </Container>
        </>
    );
}
