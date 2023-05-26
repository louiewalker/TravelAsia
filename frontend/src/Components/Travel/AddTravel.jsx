import TravelForm from "./TravelForm";

const AddTravel = ({closeModal, setTravels}) => {
  return <TravelForm setTravels={setTravels} closeModal={closeModal}/>;
};


export default AddTravel;