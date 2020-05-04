import * as React from 'react';
import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";
import MovieManagement from "../../components/MovieManagement";

interface IMoviesContainerProps {
}

const MoviesContainer: React.FunctionComponent<IMoviesContainerProps & ITFGeneralActions> = (props) => {
  const getData = props.getData;

  React.useEffect(() => {
    getData("movies");
    getData("genres");
  }, [getData])

  return (
    <React.Fragment>
      <MovieManagement />
    </React.Fragment>
  );
};

export default GeneralActions(MoviesContainer);
