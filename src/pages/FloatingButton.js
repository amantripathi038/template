import { FloatButton } from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone, DollarCircleTwoTone } from '@ant-design/icons';
import { useState } from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import userService from "../store/userService";
import AddExpenseModal from './addExpenseModal';

export default function FloatingButton() {
    const [creditToggle, setCreditToggle] = useState(false)
    const [salary, setSalary] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const handleSalaryChange = (event) => {
        setSalary(event.target.value)
    }
    const creditToggler = () => {
        setCreditToggle(!creditToggle)
    }

    const handleAddCredit = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token') ? localStorage.getItem('token').slice(1, -1) : (sessionStorage.getItem('token') ? sessionStorage.getItem('token').slice(1, -1) : null);
        await userService.addCredit(token, salary)
        setIsLoading(false)
        creditToggler()
    }

    const [dialog, dialogOpen] = useState(false)

    const handleDialogOpen = () => {
        dialogOpen(!dialog);
    };


    return (
        <>
            <FloatButton.Group
                icon={<DollarCircleTwoTone />}
                shape="circle"
                trigger='click'
            >
                <FloatButton
                    icon={<PlusCircleTwoTone />}
                    shape="square"
                    tooltip="Add Credit"
                    onClick={creditToggler}
                />
                <FloatButton
                    icon={<MinusCircleTwoTone />}
                    shape="square"
                    tooltip="Add Expense"
                    onClick={handleDialogOpen}
                />
            </FloatButton.Group>
            <Dialog open={creditToggle} onClose={creditToggler}>
                <DialogTitle>Add Credit</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="addCredit"
                        label="Amount"
                        type="text"
                        value={salary}
                        onChange={handleSalaryChange}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={creditToggler}>Cancel</Button>
                    <LoadingButton onClick={handleAddCredit} loading={isLoading}>Add</LoadingButton>
                </DialogActions>
            </Dialog>
            <AddExpenseModal dialog={dialog} dialogOpen={dialogOpen} />
        </>
    )
} 