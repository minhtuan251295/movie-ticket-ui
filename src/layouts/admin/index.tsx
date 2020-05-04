import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'

import Sidebar from "../../components/Sidebar";
import DashBoard from '../../components/Dashboard';
import GenresContainer from '../../containers/GenresContainer';
import MoviesContainer from '../../containers/MoviesContainer';
import CinemasContainer from '../../containers/CinemasContainer';
import RoomsContainer from '../../containers/RoomsContainer';
import SchedulesContainer from '../../containers/SchedulesContainer';
import UsersContainer from '../../containers/UsersContainer';
import CardsContainer from '../../containers/CardsContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

interface AdminProps {

}

const Admin = (props: AdminProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Sidebar />
      <main className={classes.content} style={{ width: "100%" }}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/admin/dashboard" exact component={DashBoard} />
          <Route path="/admin/genres" exact component={GenresContainer} />
          <Route path="/admin/movies" exact component={MoviesContainer} />
          <Route path="/admin/cinemas" exact component={CinemasContainer} />
          <Route path="/admin/rooms" exact component={RoomsContainer} />
          <Route path="/admin/schedules" exact component={SchedulesContainer} />
          <Route path="/admin/users" exact component={UsersContainer} />
          <Route path="/admin/cards" exact component={CardsContainer} />
        </Switch>
      </main>
    </div>
  );
}

export default Admin;