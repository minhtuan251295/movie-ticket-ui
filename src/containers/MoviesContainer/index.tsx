import * as React from 'react';
import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";
import MovieManagement from "../../components/MovieManagement";
import Movies from "../../components/Movies";

interface IMoviesContainerProps {
}

const MoviesContainer: React.FunctionComponent<IMoviesContainerProps & ITFGeneralActions> = (props) => {
  const getData = props.getData;
  const { pathname } = window.location;

  React.useEffect(() => {
    getData("movies");
    getData("genres");
  }, [getData])


  return (
    <React.Fragment>
      {pathname.indexOf("admin") !== -1 ? <MovieManagement /> : <Movies />}

    </React.Fragment>
  );
};

export default GeneralActions(MoviesContainer);
