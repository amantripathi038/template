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

EditExpenseModal.propTypes = {
    dialog: PropTypes.bool.isRequired,
    dialogOpen: PropTypes.func.isRequired,
    row: PropTypes.object.isRequired
};

export default function EditExpenseModal({ dialog, dialogOpen, row }) {
    const [isLoading, setIsLoading] = useState(false)
    const [addname, setName] = useState(row.name)
    const [addcategory, setCategory] = useState(row.category)
    const [adddescription, setDescription] = useState(row.description)
    const [adddate, setDate] = useState(row.date)
    const [addamount, setAmount] = useState(row.amount)

    const handleDialogClose = () => {
        dialogOpen(!dialog);
    };

    const handleNameChange = (event) => {
        setName(event.target.value)
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
    const handleEditTransaction = async () => {
        setIsLoading(true)
        try {
            const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
            await userService.editExpense(token, row._id, addname, addamount, addcategory, adddescription, adddate)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            handleDialogClose()
        }
    }
    return (
        <Dialog open={dialog} onClose={handleDialogClose}>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter details of the transaction.
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="addname"
                    label="Item Name"
                    type="text"
                    value={addname}
                    onChange={handleNameChange}
                    fullWidth
                    variant="standard" />
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addcategory}
                    label="Category"
                    onChange={handleCategoryChange}
                    fullWidth
                >
                    <MenuItem value={'Bills'}>Bills (Electricity / Water / Gas)</MenuItem>
                    <MenuItem value={'Food'}>Food</MenuItem>
                    <MenuItem value={'Medical'}>Medical</MenuItem>
                    <MenuItem value={'Travel'}>Travel</MenuItem>
                    <MenuItem value={'Others'}>Others</MenuItem>
                </Select>
                <TextField
                    margin="dense"
                    id="adddescription"
                    label="Description"
                    type="text"
                    value={adddescription}
                    onChange={handleDescriptionChange}
                    fullWidth
                    variant="standard" />
                <TextField
                    margin="dense"
                    id="adddate"
                    type="date"
                    value={adddate}
                    onChange={handleDateChange}
                    fullWidth
                    variant="standard" />
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
                <LoadingButton onClick={handleEditTransaction} loading={isLoading}>Edit</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}