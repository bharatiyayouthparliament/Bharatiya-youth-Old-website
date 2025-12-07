import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";

const MediaForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    caption: "",
    description: "",
    file_url: "",
    file_type: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        caption: initialData.caption || "",
        description: initialData.description || "",
        file_url: initialData.file_url || "",
        file_type: initialData.file_type || "",
      });
    } else {
      setFormData({
        caption: "",
        description: "",
        file_url: "",
        file_type: "",
      });
    }
  }, [initialData]);

  const validate = () => {
    const temp = {};

    if (!formData.caption || formData.caption.length < 3)
      temp.caption = "Caption must be at least 3 characters.";

    if (!formData.file_url)
      temp.file_url = "A file is required.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (base64, file) => {
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      file_url: base64,
      file_type: file.type,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <Label>Media File (Image Only)</Label>

        <ImageUpload
          onUpload={(base64, file) => handleFileUpload(base64, file)}
          initialImage={formData.file_url}
          allowedTypes={[
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
          ]}
          maxSize={2 * 1024 * 1024} // 2MB
        />

        {errors.file_url && (
          <p className="text-red-500 text-sm mt-1">{errors.file_url}</p>
        )}
      </div>

      <div>
        <Label htmlFor="caption">Caption</Label>
        <Input
          id="caption"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
        />
        {errors.caption && (
          <p className="text-red-500 text-sm mt-1">{errors.caption}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#a0291f] hover:bg-[#7a1f17]"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Update Media"
            : "Add Media"}
        </Button>
      </div>
    </form>
  );
};

export default MediaForm;
