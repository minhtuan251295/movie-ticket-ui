import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import FaceIcon from "@material-ui/icons/Face";
import { connect } from "react-redux";
import _ from "lodash";

import { changeUserData, changePassword } from "../../actions/auth";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0,0,0,0.52)',
    borderRadius: '10px',
    padding: '20px',
    minHeight: '150px',
    maxHeight: '600px',
  },
  marginAdded: {
    marginTop: 100,
  }
}));

const Account = (props: any) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.marginAdded}>
      <div className={classes.root}>
        <Grid container spacing={3} className="mt-1">
          <Grid item xs={4}>
            <div className="circle-avatar">
              <FaceIcon />
              <Typography variant="body1" gutterBottom>
                {_.get(props, "userInformation.name", "")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <form noValidate autoComplete="off" style={{ padding: '10px' }}>
              <div className="w-100">
                <TextField id="outlined-basic1"
                  label="Full name" variant="outlined" className="mb-1 w-100" name="fullName"
                  value={props.userInformation.name} />
              </div>
              <div className="w-100">
                <TextField id="outlined-basic2"
                  label="Phone" variant="outlined" className="w-100 mb-1" name="phone"
                  value={props.userInformation.role} />
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

const mapStateToProps = (state: any) => {
  return { userInformation: state.userInformation }
}

export default connect(mapStateToProps, { changeUserData, changePassword })(Account);