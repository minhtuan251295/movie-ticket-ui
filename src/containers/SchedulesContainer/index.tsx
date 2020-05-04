import * as React from 'react';
import ScheduleManagement from "../../components/ScheduleManagement";
import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";

interface ISchedulesContainerProps {
}

const SchedulesContainer: React.FunctionComponent<ISchedulesContainerProps & ITFGeneralActions> = (props) => {
  const getData = props.getData;

  React.useEffect(() => {
    getData("movies");
    getData("rooms");
    getData("schedules");
  }, [getData])

  return (
    <React.Fragment>
      <ScheduleManagement />
    </React.Fragment>
  );
};

export default GeneralActions(SchedulesContainer);
