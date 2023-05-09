import { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Select,
    InputLabel,
    MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import userService from '../store/userService';

AddAccountModal.propTypes = {
    dialog: PropTypes.string.isRequired,
    dialogOpen: PropTypes.bool.isRequired,
};


export default function AddAccountModal({ dialog, dialogOpen }) {

    const [isLoading, setIsLoading] = useState(false)
    const [addname, setName] = useState("")
    const [addcategory, setCategory] = useState("Cash")
    const [addamount, setAmount] = useState(0)
    const [addnumber, setNumber] = useState("")

    const handleDialogClose = () => {
        dialogOpen(!dialog);
    };

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNumber(event.target.value)
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)

    }

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }
    const handleAddAccount = async () => {
        if (!addamount || !addcategory || !addname) {
            alert("Please fill complete details")
            return
        }
        setIsLoading(true)
        try {
            const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
            // console.log(token, addname, addamount, addcategory, addnumber)
            await userService.addAccount(token, addnumber, addname, addcategory, addamount)
            // const user = await userService.addExpense(token, name, amount, category, description, date);
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            handleDialogClose()
        }
    }
    return (
        <Dialog open={dialog} onClose={handleDialogClose}>
            <DialogTitle>Add Account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter Account Details
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="addnumber"
                    label="Account Number"
                    type="number"
                    value={addnumber}
                    onChange={handleNumberChange}
                    fullWidth
                    variant="standard" />
                <TextField
                    margin="dense"
                    id="addname"
                    label="Account Name"
                    type="text"
                    value={addname}
                    onChange={handleNameChange}
                    fullWidth
                    variant="standard"
                    required
                />
                <InputLabel id="demo-simple-select-label" required>Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addcategory}
                    label="Type"
                    onChange={handleCategoryChange}
                    fullWidth
                >
                    <MenuItem value={'Current'}>Current </MenuItem>
                    <MenuItem value={'Savings'}>Savings</MenuItem>
                    <MenuItem value={'Cash'}>Cash</MenuItem>
                    <MenuItem value={'Investment'}>Investment</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
                <TextField
                    margin="dense"
                    id="addamount"
                    label="Amount"
                    type="text"
                    value={addamount}
                    onChange={handleAmountChange}
                    fullWidth
                    variant="standard"
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <LoadingButton onClick={handleAddAccount} loading={isLoading}>Add</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}