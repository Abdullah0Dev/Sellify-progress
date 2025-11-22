import React from "react";
import placeholderImage from "@/assets/placeholder.png";
import { motion } from "motion/react";
import { Plus, Star } from "lucide-react";

export type ProductCardType = {
  image?: string;
  name?: string;
  brand?: string;
  average_rating?: number | string;
  price?: number;
};
const ProductCard: React.FC<ProductCardType> = ({
  image = placeholderImage,
  name = "Untitled",
  brand = "with no branding",
  average_rating = 4.5,
  price = 3.99,
}) => {
  return (
    <motion.div
      className="p-4 rounded-3xl bg-gradient-to-tr from-white to-white/80 max-w-[200px]"
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "spring",
      }}
    >
      <div className="relative rounded-3xl overflow-hidden mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-[160px] object-cover rounded-xl"
        />
        <div className="absolute top-0 right-0 px-4 py-[3px] rounded-bl-3xl rounded-tr-xl bg-black/60 flex items-center gap-2 text-white text-sm">
          <Star className="w-4 h-4 text-orange-500" />
          <span> {average_rating} </span>
        </div>
      </div>
      {/* details => name, brand... */}
      <div className="">
        <h2 className="text-black text-base font-semibold"> {name} </h2>
        <p className="text-gray-400/60 text-sm"> {brand} </p>
        {/* price */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#D17842] font-semibold text-lg flex gap-x-1">
            $<p className="text-black font-bold">{price}</p>
          </span>
          <motion.button
            className="p-2 cursor-pointer rounded-lg bg-[#D17842] text-white"
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
