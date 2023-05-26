import ProductForm from "./ProductForm";

const AddProduct = ({closeModal, setProducts}) => {
  return <ProductForm closeModal={closeModal} setProducts={setProducts}/>;
};


export default AddProduct;