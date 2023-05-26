import BlogForm from "./BlogForm";

const UpdateBlog = ({ initialValues, closeModal, setBlogs }) => {
  return <BlogForm 
            initialValues={initialValues} 
            setBlogs={setBlogs} 
            closeModal={closeModal}
          />;
};

export default UpdateBlog;
