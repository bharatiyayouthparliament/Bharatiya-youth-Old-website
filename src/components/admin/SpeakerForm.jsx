import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/admin/ImageUpload";

const SpeakerForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    bio: "",
    category: "",
    photo_url: "",
    photo_type: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        designation: initialData.designation || "",
        bio: initialData.bio || "",
        category: initialData.category || "",
        photo_url: initialData.photo_url || "",
        photo_type: initialData.photo_type || ""
      });
    }
  }, [initialData]);

  const validate = () => {
    let temp = {};

    if (!formData.name || formData.name.length < 3)
      temp.name = "Name must be at least 3 characters.";

    if (!formData.designation || formData.designation.length < 3)
      temp.designation = "Designation must be at least 3 characters.";

    if (!formData.bio || formData.bio.length < 10)
      temp.bio = "Bio must be at least 10 characters.";

    if (!formData.category)
      temp.category = "Category is required.";

    if (!formData.photo_url)
      temp.photo_url = "Photo is required.";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelectChange = (value) =>
    setFormData((prev) => ({ ...prev, category: value }));

  const handleImageUpload = (base64, file) => {
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      photo_url: base64,
      photo_type: file.type
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
        <Label>Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <Label>Designation</Label>
        <Input name="designation" value={formData.designation} onChange={handleChange} />
        {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
      </div>

      <div>
        <Label>Category</Label>
        <Select value={formData.category} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="social_activism">Social Activism</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="youth_empowerment">Youth Empowerment</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      <div>
        <Label>Bio</Label>
        <Textarea name="bio" value={formData.bio} onChange={handleChange} />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
      </div>

      <div>
        <Label>Photo</Label>
        <ImageUpload
          onUpload={handleImageUpload}
          initialImage={formData.photo_url}
          allowedTypes={["image/jpeg", "image/jpg", "image/png", "image/webp"]}
          maxSize={2 * 1024 * 1024}  // ✔ Strict 2MB limit
        />
        {errors.photo_url && <p className="text-red-500 text-sm">{errors.photo_url}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="bg-[#a0291f] hover:bg-[#7a1f17]">
        {isSubmitting ? "Saving..." : initialData ? "Update Speaker" : "Add Speaker"}
      </Button>
    </form>
  );
};

export default SpeakerForm;
