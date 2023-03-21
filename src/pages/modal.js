import React from "react";
import { withStyles, MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import { teal, grey } from "@material-ui/core/colors";

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  primaryColor: {
    color: teal[500]
  },
  secondaryColor: {
    color: grey[700]
  },

  padding: {
    padding: 0
  },
  mainHeader: {
    backgroundColor: grey[100],
    padding: 20,
    alignItems: "center"
  },
  mainContent: {
    padding: 40
  },
  secondaryContainer: {
    padding: "20px 25px",
    backgroundColor: grey[200]
  }
});
const Category = [
  {
    value: "food",
    label: "food"
  },
  {
    value: "stationary",
    label: "stationary"
  },
  {
    value: "fuel",
    label: "fuel"
  },
  {
    value: "medicine",
    label: "medicine"
  }
];

function WireInfo(props) {
  const { classes, open, onClose } = props;
  const [values, setValues] = React.useState({
    shipping: "Cat in the Hat",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    address: ""
  });

  return (
    <Dialog
      className={classes.root}
      fullWidth
      maxWidth="md"
      open={true}
      onClose={() => onClose("wireModal")}
    >
      <DialogContent className={classes.padding}>
        <Grid container>
          <Grid item xs={8}>
            <Grid container direction="row" className={classes.mainHeader}>
              <Grid item xs={8}>
                <Typography className={classes.primaryColor} variant="h5">
                  Transaction
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  className={classes.secondaryColor}
                  variant="subtitle1"
                  align="right"
                >
                  Enter your transaction detials
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              className={classes.mainContent}
              spacing={1}
            >
              <Grid item xs={10}>
                <TextField
                  style={{ marginBottom: 20 }}
                  fullWidth
                  select
                  margin="dense"
                  variant="outlined"
                  label="Category"
                  defaultValue="None"
                  id="Category"
                >
                  <MenuItem>Food</MenuItem>
                  <MenuItem>Medicine</MenuItem>
                  <MenuItem>travel</MenuItem>
                  <MenuItem>Stationary</MenuItem>
                  <MenuItem>Fuel</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Name"
                  id="city"
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Date"
                  id="Date"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  label="Amount"
                  id="Amount"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="dense"
                  multiline
                  rows="5"
                  variant="outlined"
                  label="Description"
                  id="Description"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} className={classes.secondaryContainer}>
            <Grid container>
              <Grid item xs={12} align="right" className={classes.padding}>
                <IconButton
                  edge="start"
                  align="right"
                  color="inherit"
                  aria-label="Close"
                  style={{ padding: 8 }}
                  //className={classes.padding}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(WireInfo);
