import * as React from 'react';
import RoomManagement from "../../components/RoomManagement";
import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";

interface IRoomsContainerProps {
}

const RoomsContainer: React.FunctionComponent<IRoomsContainerProps & ITFGeneralActions> = (props) => {
  const getData = props.getData;

  React.useEffect(() => {
    getData("cinemas");
    getData("rooms");
  }, [getData])

  return (
    <React.Fragment>
      <RoomManagement />
    </React.Fragment>
  );
};

export default GeneralActions(RoomsContainer);
