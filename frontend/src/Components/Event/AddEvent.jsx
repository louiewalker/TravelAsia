import EventForm from "./EventForm";

const AddEvent = ({closeModal, setEvents}) => {
  return <EventForm  closeModal={closeModal} setEvents={setEvents}/>;
};


export default AddEvent;