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

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const [isLoading, setIsLoading] = useState(false)
    const [addname, setName] = useState("")
    const [addcategory, setCategory] = useState("")
    const [adddescription, setDescription] = useState("")
    const [adddate, setDate] = useState(formattedDate)
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

    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleDateChange = (event) => {
        setDate(event.target.value)
    }
    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }
    const handleAddTransaction = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
            // console.log(token, addname, addamount, addcategory, adddescription, adddate)
            await userService.addExpense(token, addname, addamount, addcategory, adddescription, adddate)
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
                    variant="standard" />
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
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
                {/* <TextField
                    margin="dense"
                    id="adddescription"
                    label="Description"
                    type="text"
                    value={adddescription}
                    onChange={handleDescriptionChange}
                    fullWidth
                    variant="standard" /> */}
                {/* <TextField
                    margin="dense"
                    id="adddate"
                    type="date"
                    value={adddate}
                    onChange={handleDateChange}
                    fullWidth
                    variant="standard" /> */}
                <TextField
                    margin="dense"
                    id="addamount"
                    label="Amount"
                    type="text"
                    value={addamount}
                    onChange={handleAmountChange}
                    fullWidth
                    variant="standard" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <LoadingButton onClick={handleAddTransaction} loading={isLoading}>Add</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}