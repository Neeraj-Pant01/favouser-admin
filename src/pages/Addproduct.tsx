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
    categories: [] as string[],
    defaultColor: "",
    avilableColors: [] as string[],
    inStocks: "",
  });

  const token = useSelector((state: any) => state.user.loggedUser.token)

  const [newImage, setNewImage] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("");
  const [loading, setLoading] = useState(false)
  const [productImage, setProductImage] = useState<File | null>(null)
  const [productImages, setProductImages] = useState<any>([])
  const [message, setmessage] = useState("")
  const [errMessage, setrMessage] = useState("")


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
  setLoading(true);

  const payload = {
    ...formData,
    price: Number(formData.price),
    inStocks: Number(formData.inStocks),
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
      const uploadPromises = productImages.map((img: File) => uploadItemImage(img));
      additionalImageUrls = await Promise.all(uploadPromises);
    }

    // Now send the product data including all image URLs
    const response : any = await uploadNewProduct(token, {
      ...payload,
      coverImage: coverImageUrl,
      images: additionalImageUrls,
    });
    if(response.status === 200){
      setmessage('prodcut uploaded successfully check product page for more info !')
      setTimeout(()=>{
        setmessage("")
      },3000)
    }
    console.log('Product upload response:', response);
    setLoading(false);
    setFormData({
      productName: "",
      productDesc: "",
      price: "",
      categories: [],
      defaultColor: "",
      avilableColors: [],
      inStocks: "",
    });
    setProductImage(null);
    setProductImages([]);

  } catch (err) {
    console.error("Upload failed:", err);
    alert("Error uploading product. Try again.");
    setLoading(false);
    setrMessage('Upload failed ! try dain !')
    setTimeout(()=>{
        setmessage("")
      },3000)
  }
};


  return (
    <div className=" mx-auto">
      {
        loading &&
        <Loader />
      }
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
          <label className="block mb-1 font-medium">Cover Image</label>
          {
            productImage &&
            <img src={URL.createObjectURL(productImage)} alt="product image" className="h-[300px]" />
          }
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
          <label className="block mb-1 font-medium">Add Images</label>
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
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded mt-4 hover:bg-green-700"
          >
            {
              loading ? 'uploading...' : "Add Product"
            }
          </button>
        </div>
        <div></div>
        {(message || errMessage) &&
      <div className={`flex text-center items-center justify-center font-semibold w-[100%] ${message && 'text-green-500' || errMessage && 'text-red-400'} py-2 px-4`}>{message || errMessage}</div>
        }
      </form>
    </div>
  );
}
