import React, { useRef, useState, useEffect } from "react";
import { UploadCloud, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ImageUpload = ({
  onUpload,
  initialImage = "",
  allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  maxSize = 2 * 1024 * 1024, // 2MB
}) => {
  const fileInput = useRef(null);
  const [preview, setPreview] = useState(initialImage || null);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setPreview(initialImage || null);
  }, [initialImage]);

  // Convert to Base64
  const convertBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject("Error reading file");
      reader.readAsDataURL(file);
    });

  const handleFile = async (file) => {
    if (!file) return;

    // Type validation
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Allowed: ${allowedTypes.join(", ")}`);
      return;
    }

    // Size validation
    if (file.size > maxSize) {
      setError(`Max file size is ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    setError("");

    try {
      const base64 = await convertBase64(file);
      setPreview(base64);
      onUpload(base64, file); // IMPORTANT: send both
    } catch (e) {
      toast({
        title: "Error processing file",
        variant: "destructive",
      });
    }
  };

  const onFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const removeImage = () => {
    setPreview(null);
    onUpload("", null);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div>
      {preview ? (
        <div className="relative w-full h-48 border rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInput.current.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
        >
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold text-[#a0291f]">Click to upload</span>  
            or drag & drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP — max 2MB</p>
        </div>
      )}

      <input
        type="file"
        ref={fileInput}
        accept={allowedTypes.join(",")}
        className="hidden"
        onChange={onFileChange}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ImageUpload;
