import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GeneralActions from '../../actions/generalActions';
import { connect } from "react-redux";
import _ from "lodash";
import api from "../../api"

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));



const Membership: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();

  const [card, setCard] = React.useState({});

  React.useEffect(() => {
    const userId = _.get(props, "userInformation.id");
    api.get(`/users/${userId}/card`)
      .then(res => {
        setCard(res.data);
      })
      .catch(console.log)
  }, [])

  const subscribeOrUpdateLevel = (level: string) => {
    const userId = _.get(props, "userInformation.id");
    const cardId = _.get(card, "id");
    if (_.isEmpty(card)) {
      // subscribe - POST /cards
      props.createData("cards", "card", {
        level,
        userId: Number(userId)
      })
    } else {
      // update - PATCH /cards
      props.updateData("cards", "card", {
        level,
        userId: Number(userId)
      }, cardId, false)
        .then(() => {
          setCard({
            ...card,
            level
          })
        })
    }
  }

  const tiers = [
    {
      title: 'Silver',
      level: 'silver',
      price: '19',
      description: ['2 movies/day'],
      buttonText: card && _.get(card, "level") === "silver" ? "Your level" : "Get started",
      isDisabled: card && _.get(card, "level") === "silver",
      buttonVariant: 'outlined',
    },
    {
      title: 'Gold',
      level: 'gold',
      subheader: 'Most popular',
      price: '39',
      description: ['5 movies/day'],
      buttonText: card && _.get(card, "level") === "gold" ? "Your level" : "Get started",
      isDisabled: card && _.get(card, "level") === "gold",
      buttonVariant: 'contained',
    },
    {
      title: 'Diamond',
      level: 'diamond',
      price: '79',
      description: ['Unlimited movies/day'],
      buttonText: card && _.get(card, "level") === "diamond" ? "Your level" : "Get started",
      isDisabled: card && _.get(card, "level") === "diamond",
      buttonVariant: 'outlined',
    },
  ];

  return <React.Fragment>
    <CssBaseline />
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Company name
          </Typography>
        <nav>
          <Link variant="button" color="textPrimary" href="#" className={classes.link}>
            Features
            </Link>
          <Link variant="button" color="textPrimary" href="#" className={classes.link}>
            Enterprise
            </Link>
          <Link variant="button" color="textPrimary" href="#" className={classes.link}>
            Support
            </Link>
        </nav>
        <Button href="#" color="primary" variant="outlined" className={classes.link}>
          Login
          </Button>
      </Toolbar>
    </AppBar>
    {/* Hero unit */}
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Pricing
        </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        You are not membership yet. Register and enjoy movies
      </Typography>
    </Container>
    {/* End hero unit */}
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {tiers.map((tier, index) => (
          // Enterprise card is full width at sm breakpoint
          <Grid item key={index} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                action={tier.title === 'Pro' ? <StarIcon /> : null}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardPricing}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    /mo
                    </Typography>
                </div>
                <ul>
                  {tier.description.map((line) => (
                    <Typography component="li" variant="subtitle1" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth color="primary"
                  onClick={() => subscribeOrUpdateLevel(tier.level)}
                  disabled={tier.isDisabled}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </React.Fragment>
};

const mapStateToProps = (state: any) => {
  return {
    userInformation: state.userInformation
  }
}

export default connect(mapStateToProps)(GeneralActions(Membership));
