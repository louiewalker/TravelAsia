import ProductForm from "./ProductForm";

const UpdateProduct= ({initialValues, closeModal, setProducts}) => {
  return <ProductForm 
            initialValues={initialValues } 
            setProducts={setProducts} 
            closeModal={closeModal}
        />;
};


export default UpdateProduct;