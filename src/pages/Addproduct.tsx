import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productDesc: "",
    price: "",
    coverImage: "",
    images: [] as string[],
    categories: [] as string[],
    defaultColor: "",
    avilableColors: [] as string[],
    inStocks: "",
  });

  const [newImage, setNewImage] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      [key]: (prev[key as keyof typeof formData] as string[]).filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      inStocks: Number(formData.inStocks),
      totalStars: 0,
      starNumber: 0,
      sales: 0,
    };

    console.log("Sending to backend:", payload);
  };

  return (
    <div className=" mx-auto">
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
          <label className="block mb-1 font-medium">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            required
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Add Images */}
        <div>
          <label className="block mb-1 font-medium">Add Image URLs</label>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Image URL"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={() => {
                handleAddToArray("images", newImage);
                setNewImage("");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.images.map((img, i) => (
              <span
                key={i}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full cursor-pointer"
                onClick={() => handleRemoveFromArray("images", img)}
              >
                {img} ❌
              </span>
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

        {/* In Stock */}
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

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded mt-4 hover:bg-green-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
