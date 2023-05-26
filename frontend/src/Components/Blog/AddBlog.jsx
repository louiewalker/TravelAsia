import BlogForm from "./BlogForm";

const AddBlog = ({closeModal, setBlogs}) => {
  return <BlogForm setBlogs={setBlogs} closeModal={closeModal}/>;
};

export default AddBlog;
