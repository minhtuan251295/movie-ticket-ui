import * as React from 'react';
import CardManagement from "../../components/CardManagement";
import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";

interface ICardsContainerProps {
}

const CardsContainer: React.FunctionComponent<ICardsContainerProps & ITFGeneralActions> = (props) => {
  const getData = props.getData;

  React.useEffect(() => {
    getData("cards");
    getData("users");
  }, [getData])

  return (
    <React.Fragment>
      <CardManagement />
    </React.Fragment>
  );
};

export default GeneralActions(CardsContainer);
