import * as React from 'react';

import { RouteComponentProps } from "react-router-dom"
import _ from "lodash";
import GeneralActions from "../../../actions/generalActions";
import ITFGeneralActions from "../../../interfaces/generalActions";
import Container from '@material-ui/core/Container';
import * as ITF from "../../../interfaces/general";

interface IPageDetailProps {
}

const PageDetail: React.FunctionComponent<IPageDetailProps & RouteComponentProps & ITFGeneralActions> = (props) => {
  const { params } = props.match;
  const movieId = _.get(params, "filmId", "");
  const [movie, setMovie] = React.useState({} as ITF.Movie)

  React.useEffect(() => {
    props.getDataById("movies", "movie", movieId)
      .then((res) => console.log(res))
  }, [])// eslint-disable-line
  return (
    <React.Fragment>
      <Container maxWidth="md" className="my-2 py-2">
        {/* <Grid container spacing={3}>
          <Grid item xs={6}>
            <img src={props.} alt="" />
          </Grid>
          <Grid item xs={6}>
          </Grid>
        </Grid> */}
      </Container>
    </React.Fragment>
  );
};

export default GeneralActions(PageDetail);
