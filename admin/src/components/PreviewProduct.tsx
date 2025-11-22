import { useFormUpdater } from "@/context/useUpdateFormContext";
import ProductCard from "./common/ProductCard";
import placeholderImage from "@/assets/placeholder.png";

const PreviewProduct = () => {
  const { form } = useFormUpdater();
  return (
    <div className="relative max-lg:hidden max-w-1/3 h-full flex items-center justify-center ">
      <div className="bg-[#F3F3F3] rounded-4xl flex items-center justify-center h-[70%] w-[320px] ">
        <ProductCard
          name={form.productName || "Untilled"}
          brand={form.brand || "With no branding"}
          average_rating={form.rating || 0.0}
          price={(form.prices[0]?.price as number) || 0.0}
          image={form.images[0] || placeholderImage}
        />
      </div>
    </div>
  );
};

export default PreviewProduct;
