import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/admin/RichTextEditor";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch.jsx";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";

import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BlogForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    image_url: "",
    status: "draft",
  });

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ------------------------------------------------
     Load initial data when editing
  ------------------------------------------------ */
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "",
        description: initialData.description || "",
        content: initialData.content || "",
        image_url: initialData.image_url || "",
        status: initialData.status || "draft",
      });
    }
  }, [initialData]);

  /* ------------------------------------------------
     VALIDATION
  ------------------------------------------------ */
  const validate = () => {
    let temp = {};

    if (!formData.title || formData.title.length < 5)
      temp.title = "Title must be at least 5 characters.";

    if (!formData.category) temp.category = "Category is required.";

    if (!formData.description || formData.description.length < 10)
      temp.description = "Description must be at least 10 characters.";

    if (!formData.content || formData.content.length < 20)
      temp.content = "Content must be at least 20 characters.";

    if (!formData.image_url) temp.image_url = "Featured image is required.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  /* ------------------------------------------------
     HANDLERS
  ------------------------------------------------ */
  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (value) =>
    setFormData((p) => ({ ...p, category: value }));

  const handleSwitchChange = (checked) =>
    setFormData((p) => ({ ...p, status: checked ? "published" : "draft" }));

  /* ------------------------------------------------
     IMAGE UPLOAD
  ------------------------------------------------ */
  const handleImageUpload = async (file) => {
    if (file?.remove) {
      setFormData((p) => ({ ...p, image_url: "" }));
      return;
    }

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image_url: "Max file size: 2MB" }));
      return;
    }

    setUploading(true);

    try {
      const fileName = `blog_images/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      setFormData((p) => ({ ...p, image_url: url }));
    } catch (err) {
      setErrors((p) => ({ ...p, image_url: "Upload failed." }));
    }

    setUploading(false);
  };

  /* ------------------------------------------------
     SUBMIT
  ------------------------------------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  /* =========================================================
      UI
  ========================================================= */
  return (
    <div className="max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ------------------------------------ */}
        {/* BASIC INFO */}
        {/* ------------------------------------ */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-4">

            {/* TITLE */}
            <div>
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="youth">Youth</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------ */}
        {/* CONTENT SECTION */}
        {/* ------------------------------------ */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Blog Content</h2>

          <RichTextEditor
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            placeholder="Write full blog content here..."
          />

          {errors.content && (
            <p className="text-red-500 text-sm mt-2">{errors.content}</p>
          )}
        </div>

        {/* ------------------------------------ */}
        {/* IMAGE SECTION */}
        {/* ------------------------------------ */}
        <div className="bg-white p-5 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Featured Image</h2>

          <ImageUpload
            onUpload={handleImageUpload}
            initialImage={formData.image_url}
            maxSizeMB={2}
          />

          {uploading && (
            <p className="text-blue-500 text-sm mt-1">Uploading...</p>
          )}

          {errors.image_url && (
            <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>
          )}
        </div>

        {/* ------------------------------------ */}
        {/* STATUS SWITCH */}
        {/* ------------------------------------ */}
        <div className="bg-white p-5 rounded-lg shadow-sm border flex items-center justify-between">
          <div>
            <Label>Status</Label>
            <p className="text-sm text-gray-500">Publish this post?</p>
          </div>

          <Switch
            checked={formData.status === "published"}
            onCheckedChange={handleSwitchChange}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || uploading}
            className="bg-[#a0291f] hover:bg-[#7a1f17] text-white px-6 py-2"
          >
            {isSubmitting ? "Saving..." : initialData ? "Update Post" : "Add Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;