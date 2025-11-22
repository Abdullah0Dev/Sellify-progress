"use client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomFileUpload from "./common/CustomFileUpload";
import { useFormUpdater } from "@/context/useUpdateFormContext";
import { useAPIStore } from "@/context/APIContext";
import { createNewProduct, updateProduct, type ProductType } from "@/api";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router";
const ProductForm = () => {
  const { form, setForm } = useFormUpdater();
  const { dispatch } = useAPIStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEditScreen = pathname.includes("edit");

  const handleSubmitProduct = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payloadProduct: ProductType = {
      name: form.productName,
      brand: form.brand,
      description: form.description,
      category: form.category,
      average_rating: Number(form.rating),
      images: form.images,
      prices: form.prices.map((p) => ({
        size: p.size as "S" | "M" | "L",
        price: Number(p.price),
      })),
      quantity: 1,
    };
    if (isEditScreen) {
      // update item
      const id = pathname.split("/edit/")[1]
      try {
        const response = await toast.promise(updateProduct(id, payloadProduct), {
          pending: "Updating product... 🕐",
          success: "Product updated successfully! 🎉",
          error: "Failed to update product 😢",
        });
        dispatch({ type: "UPDATE_PRODUCT", payload: response });
        setForm({
          productName: "",
          brand: "",
          description: "",
          category: "",
          rating: "",
          images: [],
          prices: [
            { size: "S", price: "" },
            { size: "M", price: "" },
            { size: "L", price: "" },
          ],
        });
        navigate("/");
      } catch (error) {
        console.error("Failed to create product: ", error);
      }
    } else {
      try {
        const response = await toast.promise(createNewProduct(payloadProduct), {
          pending: "Creating product... 🕐",
          success: "Product created successfully! 🎉",
          error: "Failed to create product 😢",
        });
        dispatch({ type: "ADD_PRODUCT", payload: response });
        setForm({
          productName: "",
          brand: "",
          description: "",
          category: "",
          rating: "",
          images: [],
          prices: [
            { size: "S", price: "" },
            { size: "M", price: "" },
            { size: "L", price: "" },
          ],
        });
        navigate("/");
      } catch (error) {
        console.error("Failed to create product: ", error);
      }
    }
  };
  const categories = [
    // "Sweatshirt",
    // "Jackets",
    // "Pants",
    // "Jeans",
    // "Shorts",
    // "Suits",
    // "Traditional Wear",
    // "Shoes",
    // "Accessories",
    {
      id: "T-Shirts",
      label: "T-Shirts",
    },
    {
      id: "Shirts",
      label: "Shirts",
    },
    {
      id: "Hoodies",
      label: "Hoodies",
    },
    {
      id: "Sweatshirt",
      label: "Sweatshirt",
    },
    {
      id: "Jackets",
      label: "Jackets",
    },
    {
      id: "Pants",
      label: "Pants",
    },
  ];
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // allow only numbers & single decimal =>33.3.332
    if (!/^\d*\.?\d*$/.test(val)) return;
    // limit to 5
    const numVal = parseFloat(val);
    if (val === "" || (!isNaN(numVal) && numVal <= 5)) {
      setForm((prev) => ({ ...prev, rating: val }));
    }
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-5xl rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      {/* custom uploader */}
      <CustomFileUpload />
      <form className="my-8" onSubmit={handleSubmitProduct}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="name">Product Name</Label>
            <Input
              onChange={(e) =>
                setForm((prev) => ({ ...prev, productName: e.target.value }))
              }
              value={form.productName}
              id="name"
              placeholder="T-Shirt"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="brand">Brand</Label>
            <Input
              onChange={(e) =>
                setForm((prev) => ({ ...prev, brand: e.target.value }))
              }
              value={form.brand}
              id="brand"
              placeholder="Adidas"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Input
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            value={form.description}
            id="description"
            placeholder="An amazing T-Shirt Made by..."
            type="text"
          />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <div className="flex flex-col justify-around">
            {/* Prices */}
            <Label htmlFor="Prices">Prices</Label>
            <div className="flex flex-row space-x-2">
              <LabelInputContainer>
                <Input
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      prices: prev.prices.map((p) =>
                        p.size === "S" ? { ...p, price: e.target.value } : p
                      ),
                    }))
                  }
                  value={form.prices.find((p) => p.size === "S")?.price}
                  id="s-price"
                  className="hide-spinner"
                  placeholder="S: "
                  type="number"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Input
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      prices: prev.prices.map((p) =>
                        p.size === "M" ? { ...p, price: e.target.value } : p
                      ),
                    }))
                  }
                  value={form.prices.find((p) => p.size === "M")?.price}
                  id="m-price"
                  className="hide-spinner"
                  placeholder="M: "
                  type="number"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Input
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      prices: prev.prices.map((p) =>
                        p.size === "L" ? { ...p, price: e.target.value } : p
                      ),
                    }))
                  }
                  value={form.prices.find((p) => p.size === "L")?.price}
                  id="l-price"
                  className="hide-spinner"
                  placeholder="L: "
                  type="number"
                />
              </LabelInputContainer>
            </div>
          </div>
          <LabelInputContainer>
            <Label htmlFor="rating">Rating</Label>
            <Input
              onChange={handleRatingChange}
              value={form.rating}
              id="rating"
              placeholder="4.5"
              min={0}
              max={5}
              step={0.1}
              type="number"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(val) => {
                setForm((prev) => ({
                  ...prev,
                  category: String(val),
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </LabelInputContainer>
        </div>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <button
          className="group/btn relative cursor-pointer block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          {isEditScreen ? "Save Changes " : " Create Product "}&rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
export default ProductForm;
