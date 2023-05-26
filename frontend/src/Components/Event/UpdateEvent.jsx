import EventForm from "./EventForm";

const UpdateEvent = ({initialValues, closeModal, setEvents}) => {
  return <EventForm 
            initialValues={initialValues } 
            setEvents={setEvents} 
            closeModal={closeModal}
        />;
};


export default UpdateEvent;