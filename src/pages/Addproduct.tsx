import { useState } from "react";
import { uploadNewProduct } from "../utils/products";
import { useSelector } from "react-redux";
import Loader from "../componenets/Loader";
import { uploadItemImage } from "../utils/uploads/uploadSingleImage";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productDesc: "",
    price: "",
    maxPrice: "",
    offer: "",
    categories: [] as string[],
    subcategories: [] as Array<{ name: string; types: string[] }>,
    defaultColor: "",
    avilableColors: [] as string[],
    inStocks: "",
    length: "10",
    breadth: "10",
    height: "10",
    weight: "0.5",
  });

  const token = useSelector((state: any) => state.user.loggedUser.token);

  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    type: "",
  });
  const [newImage, setNewImage] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImages, setProductImages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddToArray = (key: string, value: string) => {
    if (!value) return;
    setFormData((prev) => ({
      ...prev,
      [key]: [...(prev[key as keyof typeof formData] as string[]), value],
    }));
  };

  const handleRemoveFromArray = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key as keyof typeof formData] as string[]).filter(
        (item) => item !== value
      ),
    }));
  };

  const handleAddSubcategory = () => {
    if (!newSubcategory.name) return;
    
    setFormData((prev) => {
      // Check if subcategory with this name already exists
      const existingIndex = prev.subcategories.findIndex(
        (sc) => sc.name === newSubcategory.name
      );

      if (existingIndex >= 0) {
        // Add type to existing subcategory if it doesn't already exist
        const updatedSubcategories = [...prev.subcategories];
        if (newSubcategory.type && !updatedSubcategories[existingIndex].types.includes(newSubcategory.type)) {
          updatedSubcategories[existingIndex] = {
            ...updatedSubcategories[existingIndex],
            types: [...updatedSubcategories[existingIndex].types, newSubcategory.type],
          };
        }
        return {
          ...prev,
          subcategories: updatedSubcategories,
        };
      } else {
        // Create new subcategory
        return {
          ...prev,
          subcategories: [
            ...prev.subcategories,
            {
              name: newSubcategory.name,
              types: newSubcategory.type ? [newSubcategory.type] : [],
            },
          ],
        };
      }
    });

    setNewSubcategory({ name: "", type: "" });
  };

  const handleRemoveSubcategory = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.filter((sc) => sc.name !== name),
    }));
  };

  const handleRemoveSubcategoryType = (subcategoryName: string, type: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.map((sc) => {
        if (sc.name === subcategoryName) {
          return {
            ...sc,
            types: sc.types.filter((t) => t !== type),
          };
        }
        return sc;
      }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrMessage("");

    const payload = {
      ...formData,
      price: Number(formData.price),
      maxPrice: formData.maxPrice ? Number(formData.maxPrice) : undefined,
      inStocks: Number(formData.inStocks),
      length: Number(formData.length),
      breadth: Number(formData.breadth),
      height: Number(formData.height),
      weight: Number(formData.weight),
      totalStars: 0,
      starNumber: 0,
      sales: 0,
    };

    try {
      if (!productImage) throw new Error("No product image selected");

      // Upload main product image
      const coverImageUrl = await uploadItemImage(productImage);
      if (!coverImageUrl) throw new Error("Failed to upload cover image");

      // Upload additional product images (if any)
      let additionalImageUrls: string[] = [];
      if (productImages.length > 0) {
        const uploadPromises = productImages.map((img: File) =>
          uploadItemImage(img)
        );
        additionalImageUrls = await Promise.all(uploadPromises);
      }

      // Now send the product data including all image URLs
      const response: any = await uploadNewProduct(token, {
        ...payload,
        coverImage: coverImageUrl,
        images: additionalImageUrls,
      });
      if (response.status === 200) {
        setMessage("Product uploaded successfully! Check product page for more info.");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
      console.log("Product upload response:", response);
      setLoading(false);
      // Reset form
      setFormData({
        productName: "",
        productDesc: "",
        price: "",
        maxPrice: "",
        offer: "",
        categories: [],
        subcategories: [],
        defaultColor: "",
        avilableColors: [],
        inStocks: "",
        length: "10",
        breadth: "10",
        height: "10",
        weight: "0.5",
      });
      setProductImage(null);
      setProductImages([]);
    } catch (err) {
      console.error("Upload failed:", err);
      setErrMessage("Error uploading product. Please try again.");
      setLoading(false);
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
    }
  };

  return (
    <div className="mx-auto">
      {loading && <Loader />}
      <h2 className="text-2xl font-semibold mb-2">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md"
      >
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
            required
            value={formData.productName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price (Rs)</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block mb-1 font-medium">Max Price (Rs)</label>
          <input
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Optional"
          />
        </div>

        {/* Offer */}
        <div>
          <label className="block mb-1 font-medium">Offer</label>
          <input
            type="text"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g., 20% off"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Product Description</label>
          <textarea
            name="productDesc"
            required
            value={formData.productDesc}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded h-28 resize-none"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          {productImage && (
            <img
              src={URL.createObjectURL(productImage)}
              alt="product image"
              className="h-[300px]"
            />
          )}
          <input
            type="file"
            name="coverImage"
            required
            onChange={(e: any) => setProductImage(e.target.files[0])}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Add Images */}
        <div>
          <label className="block mb-1 font-medium">Additional Images</label>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="file"
              onChange={(e: any) => setNewImage(e.target.files[0])}
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={() => {
                if (newImage) {
                  setProductImages((prev: any[]) => [...prev, newImage]);
                  setNewImage(null);
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {productImages.map((img: any, i: number) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`product-img-${i}`}
                  className="h-20 w-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductImages((prev: any[]) =>
                      prev.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block mb-1 font-medium">Categories</label>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={() => {
                handleAddToArray("categories", newCategory);
                setNewCategory("");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.categories.map((cat, i) => (
              <span
                key={i}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full cursor-pointer"
                onClick={() => handleRemoveFromArray("categories", cat)}
              >
                {cat} ❌
              </span>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Subcategories</label>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newSubcategory.name}
                onChange={(e) =>
                  setNewSubcategory({ ...newSubcategory, name: e.target.value })
                }
                placeholder="Subcategory name (e.g., T-Shirt)"
                className="flex-1 border px-3 py-2 rounded"
              />
              <input
                type="text"
                value={newSubcategory.type}
                onChange={(e) =>
                  setNewSubcategory({ ...newSubcategory, type: e.target.value })
                }
                placeholder="Type (e.g., Plain, Printed)"
                className="flex-1 border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={handleAddSubcategory}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {formData.subcategories.map((subcat, index) => (
                <div key={index} className="border p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{subcat.name}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubcategory(subcat.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  {subcat.types.length > 0 && (
                    <div className="pl-4">
                      <h5 className="text-sm font-medium mb-1">Types:</h5>
                      <div className="flex flex-wrap gap-2">
                        {subcat.types.map((type, typeIndex) => (
                          <span
                            key={typeIndex}
                            className="bg-gray-200 text-sm px-2 py-1 rounded-full flex items-center"
                          >
                            {type}
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveSubcategoryType(subcat.name, type)
                              }
                              className="ml-1 text-red-500"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Default Color */}
        <div>
          <label className="block mb-1 font-medium">Default Color</label>
          <input
            type="text"
            name="defaultColor"
            required
            value={formData.defaultColor}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Available Colors */}
        <div>
          <label className="block mb-1 font-medium">Available Colors</label>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="Enter color"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={() => {
                handleAddToArray("avilableColors", newColor);
                setNewColor("");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.avilableColors.map((color, i) => (
              <span
                key={i}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full cursor-pointer"
                onClick={() => handleRemoveFromArray("avilableColors", color)}
              >
                {color} ❌
              </span>
            ))}
          </div>
        </div>

        {/* Stock Count */}
        <div>
          <label className="block mb-1 font-medium">Stock Count</label>
          <input
            type="number"
            name="inStocks"
            value={formData.inStocks}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Dimensions and Weight */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-4 gap-4 border-t pt-4">
          <div>
            <label className="block mb-1 font-medium">Length (cm)</label>
            <input
              type="number"
              name="length"
              value={formData.length}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Breadth (cm)</label>
            <input
              type="number"
              name="breadth"
              value={formData.breadth}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Weight (kg)</label>
            <input
              type="number"
              step="0.01"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded mt-4 hover:bg-green-700"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </div>
        <div></div>
        {(message || errMessage) && (
          <div
            className={`flex text-center items-center justify-center font-semibold w-[100%] ${
              (message && "text-green-500") || (errMessage && "text-red-400")
            } py-2 px-4`}
          >
            {message || errMessage}
          </div>
        )}
      </form>
    </div>
  );
}