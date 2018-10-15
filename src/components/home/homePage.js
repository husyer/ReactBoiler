import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AuthContainer from '../../containers/auth/authContainer'



const styles = theme => ({
  maxHeightGrid: {
    marginTop: '-64px',
    height:'100%',
    // [theme.breakpoints.up('md')]: {
    //   paddingTop: 120,
    // },
  },
})

export class Home extends Component {


  render() {

    const { classes, theme } = this.props;

    return (
      <Fragment>

        <Grid
          className={classes.maxHeightGrid}
          container
          justify='center'
          alignItems="center"
          direction='row'
          spacing={16}
        >

          <Grid item xs={12} md={5}>
            <AuthContainer />
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography hidden align='center' variant='display1' component='p'>
              Hello and welcome to this simple Task List application.
              It may not have as many features as a professional one but it is free and ADS free.
              So try it out and start by registering or logging in.
              React Rocks !
          </Typography>
          </Grid>
        </Grid>
      </Fragment>

    )
  }
}

export default withStyles(styles)(Home)
