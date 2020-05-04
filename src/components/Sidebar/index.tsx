import * as React from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PieChartIcon from '@material-ui/icons/PieChart';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Store from "@material-ui/icons/Store";
import Collapse from '@material-ui/core/Collapse';
// import CardTravel from "@material-ui/icons/CardTravel";
import Movie from "@material-ui/icons/Movie";
import Theaters from "@material-ui/icons/Theaters";
import Room from "@material-ui/icons/Room";
import Schedule from "@material-ui/icons/Schedule";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import CreditCard from "@material-ui/icons/CreditCard";

import { connect } from "react-redux";
import { toggleDrawer } from "../../actions/main";
import { withRouter, RouteComponentProps } from "react-router-dom";

import _ from "lodash";

const drawerWidth = 256;

interface ISidebarProps {
  container?: any;
  openDrawer: boolean;
  toggleDrawer: (value: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    info: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    name: {
      fontWeight: 500,
      paddingTop: '16px',
      marginBottom: 0,
    },
    avatar: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      padding: '0 16px 16px 16px',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

const Sidebar: React.FunctionComponent<ISidebarProps & RouteComponentProps> = (props) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const { pathname } = window.location;
  const type = _.chain(pathname).split("/").last().value();
  let value = 0;
  switch (type) {
    case "dashboard":
      value = 0;
      break;

    case "genres":
      value = 1;
      break;

    case "movies":
      value = 2;
      break;

    case "cinemas":
      value = 3;
      break;

    case "rooms":
      value = 4;
      break;

    case "schedules":
      value = 5;
      break;

    case "users":
      value = 6;
      break;

    case "cards":
      value = 7;
      break;

    default:
      value = 0;
      break;
  }

  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(value);
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const goToAnotherPage = (type: string) => {
    props.history.push(type);
  }

  const drawer = (
    <React.Fragment>
      <div className={classes.toolbar} />
      <Divider />
      <div className={classes.info}>
        <Typography variant="subtitle1" gutterBottom className={classes.name}>
          Van Pho
        </Typography>
        <Typography variant="body2" gutterBottom>
          Administrator
        </Typography>
      </div>
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem button selected={selectedIndex === 0}
          onClick={(event) => {
            handleListItemClick(event, 0);
            goToAnotherPage("/admin/dashboard")
          }}>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={handleClick}>
          <ListItemText primary="Management" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}
              selected={selectedIndex === 1}
              onClick={(event) => {
                handleListItemClick(event, 1);
                goToAnotherPage("/admin/genres");
              }}>
              <ListItemIcon>
                <Store />
              </ListItemIcon>
              <ListItemText primary="Genres" />
            </ListItem>

            <ListItem button className={classes.nested}
              selected={selectedIndex === 2}
              onClick={(event) => {
                handleListItemClick(event, 2);
                goToAnotherPage("/admin/movies");
              }}>
              <ListItemIcon>
                <Movie />
              </ListItemIcon>
              <ListItemText primary="Movies" />
            </ListItem>

            <ListItem button className={classes.nested}
              selected={selectedIndex === 3}
              onClick={(event) => {
                handleListItemClick(event, 3);
                goToAnotherPage("/admin/cinemas");
              }}>
              <ListItemIcon>
                <Theaters />
              </ListItemIcon>
              <ListItemText primary="Cinemas" />
            </ListItem>

            <ListItem button className={classes.nested}
              selected={selectedIndex === 4}
              onClick={(event) => {
                handleListItemClick(event, 4);
                goToAnotherPage("/admin/rooms");
              }}>
              <ListItemIcon>
                <Room />
              </ListItemIcon>
              <ListItemText primary="Rooms" />
            </ListItem>

            <ListItem button className={classes.nested}
              selected={selectedIndex === 5}
              onClick={(event) => {
                handleListItemClick(event, 5);
                goToAnotherPage("/admin/schedules");
              }}>
              <ListItemIcon>
                <Schedule />
              </ListItemIcon>
              <ListItemText primary="Schedules" />
            </ListItem>

            <ListItem button className={classes.nested}
              selected={selectedIndex === 6}
              onClick={(event) => {
                handleListItemClick(event, 6);
                goToAnotherPage("/admin/users");
              }}>
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>

            <ListItem button className={classes.nested}
              selected={selectedIndex === 7}
              onClick={(event) => {
                handleListItemClick(event, 7);
                goToAnotherPage("/admin/cards");
              }}>
              <ListItemIcon>
                <CreditCard />
              </ListItemIcon>
              <ListItemText primary="Cards" />
            </ListItem>
          </List>
        </Collapse>

      </List>
    </React.Fragment>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.openDrawer}
          onClose={props.toggleDrawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const mapStateToprops = (state: any) => {
  return {
    openDrawer: state.main.openDrawer
  }
}

export default connect(mapStateToprops, { toggleDrawer })(withRouter(Sidebar));
