import * as React from 'react';
import CinemaManagement from "../../components/CinemaManagement";
import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";

interface ICinemasContainerProps {
}

const CinemasContainer: React.FunctionComponent<ICinemasContainerProps & ITFGeneralActions> = (props) => {
  const getData = props.getData;

  React.useEffect(() => {
    getData("cinemas");
  }, [getData])

  return (
    <React.Fragment>
      <CinemaManagement />
    </React.Fragment>
  );
};

export default GeneralActions(CinemasContainer);
