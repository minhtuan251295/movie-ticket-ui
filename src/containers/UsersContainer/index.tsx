import * as React from 'react';
import UserManagement from "../../components/UserManagement";
import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";

interface IUsersContainerProps {
}

const UsersContainer: React.FunctionComponent<IUsersContainerProps & ITFGeneralActions> = (props) => {
  const getData = props.getData;

  React.useEffect(() => {
    getData("users");
  }, [getData])

  return (
    <React.Fragment>
      <UserManagement />
    </React.Fragment>
  );
};

export default GeneralActions(UsersContainer);
