import TravelForm from "./TravelForm";

const UpdateTravel = ({initialValues, closeModal, setTravels}) => {
  return <TravelForm 
            initialValues={initialValues } 
            setTravels={setTravels} 
            closeModal={closeModal}
        />;
};


export default UpdateTravel;