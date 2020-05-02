import * as React from 'react';
import { connect } from "react-redux";
import { getGenres } from "../../actions/genre";

import GenreManagement from "../../components/GenreManagement";

import _ from "lodash";

interface IGenresContainerProps {
  getGenres: () => void
}

const GenresContainer: React.FunctionComponent<IGenresContainerProps> = (props) => {
  const getGenres = _.get(props, "getGenres", _.identity);

  React.useEffect(() => {
    getGenres();
  }, [getGenres])

  return (
    <React.Fragment>
      <GenreManagement />
    </React.Fragment>
  );
};

export default connect(null, { getGenres })(GenresContainer);
