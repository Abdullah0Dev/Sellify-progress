import PreviewProduct from "@/components/PreviewProduct";
import ProductForm from "@/components/ProductForm";

const EditProductScreen = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex mx-lg:flex-col h-full items-center gap-x-12 justify-between p-5">
        <ProductForm />
        <PreviewProduct />
      </div>
    </div>
  );
};

export default EditProductScreen;
// 6915764036b41e0c3270b440 | 