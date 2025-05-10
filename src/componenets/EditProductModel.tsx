import { useState, useEffect } from "react";
import { uploadItemImage } from "../utils/uploads/uploadSingleImage";
import { updateProduct } from "../utils/products";
import Loader from "../componenets/Loader";

interface EditProductModalProps {
  token: string;
  product: any;
  onClose: () => void;
  onUpdated: (updated: any) => void;
}

export default function EditProductModal({
  token,
  product,
  onClose,
  onUpdated,
}: EditProductModalProps) {
  const [formData, setFormData] = useState({ ...product });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [tempImages, setTempImages] = useState<File[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const removeCoverImage = () => {
    setFormData((prev: any) => ({ ...prev, coverImage: null }));
    setNewImage(null);
  };

  const removeExistingImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  const removeTempImage = (index: number) => {
    setTempImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTempImagesToList = () => {
    const totalCount = (formData.images?.length || 0) + newImages.length + tempImages.length;
    if (totalCount > 3) {
      alert("You can only have up to 3 additional images.");
      return;
    }
    setNewImages([...newImages, ...tempImages]);
    setTempImages([]);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let coverImage = formData.coverImage;
      if (newImage) {
        coverImage = await uploadItemImage(newImage);
      }

      let images = [...(formData.images || [])];
      if (newImages.length > 0) {
        const uploaded = await Promise.all(newImages.map((img) => uploadItemImage(img)));
        images = [...images, ...uploaded];
      }

      const payload = {
        ...formData,
        price: Number(formData.price),
        inStocks: Number(formData.inStocks),
        coverImage,
        images,
      };

      const res: any = await updateProduct(token, formData._id, payload);
      if (res.status === 200) {
        setMessage("✅ Product updated!");
        onUpdated(payload);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err) {
      console.error("Update failed", err);
      setMessage("❌ Failed to update product.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 w-[95%] md:w-[600px] rounded-lg shadow-xl space-y-4 overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-xl font-semibold">Edit Product</h2>
        {loading && <Loader />}

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
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
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Product Description</label>
          <textarea
            name="productDesc"
            value={formData.productDesc}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded h-28 resize-none"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            name="inStocks"
            value={formData.inStocks}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          {formData.coverImage && (
            <div className="relative w-fit mb-2">
              <img
                src={newImage ? URL.createObjectURL(newImage) : formData.coverImage}
                alt="Cover"
                className="w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm"
              >
                ×
              </button>
            </div>
          )}
          <input
            type="file"
            onChange={(e: any) => setNewImage(e.target.files[0])}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Additional Images */}
        <div>
          <label className="block mb-1 font-medium">Additional Images (max 3)</label>
          <input
            type="file"
            multiple
            onChange={(e: any) => {
              const selected = Array.from(e.target.files) as File[];
              if (selected.length + newImages.length + (formData.images?.length || 0) > 3) {
                alert("You can only upload up to 3 additional images in total.");
                return;
              }
              setTempImages(selected);
            }}
            className="w-full border px-3 py-2 rounded"
          />

          {/* Previews to confirm adding */}
          {tempImages.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-1">Selected (not added yet):</p>
              <div className="flex gap-2 flex-wrap">
                {tempImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={URL.createObjectURL(img)} className="w-16 h-16 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeTempImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addTempImagesToList}
                className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Add this Image
              </button>
            </div>
          )}

          {/* Existing + Added */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[...(formData.images || []), ...newImages].map((img: any, idx: number) => (
              <div key={idx} className="relative">
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  className="w-16 h-16 object-cover rounded"
                />
                {idx < (formData.images?.length || 0) ? (
                  <button
                    type="button"
                    onClick={() => removeExistingImage(idx)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
                  >
                    ×
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setNewImages((prev) =>
                        prev.filter((_, newIdx) => newIdx !== idx - (formData.images?.length || 0))
                      )
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <p className="text-center text-sm text-blue-600 mt-2">{message}</p>
      </form>
    </div>
  );
}
