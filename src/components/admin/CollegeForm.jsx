import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const indianStates = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
    "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
    "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
    "Uttarakhand","West Bengal","Delhi","Puducherry","Jammu and Kashmir","Ladakh"
];

const CollegeForm = ({ onSubmit, initialData, existingColleges = [] }) => {

    const [formData, setFormData] = useState({
        name: '',
        city: '',
        state: '',
        type: '',
    });

    const [generatedCode, setGeneratedCode] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

   function generateCollegeCode(name, existingCodes = []) {
    // 1. Create abbreviation from first letters of each word
    const nameAbbrev = name
        .split(" ")
        .filter(w => w.trim().length > 0)
        .map(word => word[0])
        .join("")
        .toUpperCase();

    // 2. Prefix is fixed
    const prefix = "BYP-2026";

    // 3. Serial calculation
    let serial = 1;
    let finalCode = `${nameAbbrev}-${prefix}-${String(serial).padStart(2, "0")}`;

    while (existingCodes.includes(finalCode)) {
        serial++;
        finalCode = `${nameAbbrev}-${prefix}-${String(serial).padStart(2, "0")}`;
    }

    return finalCode;
}



    // Load data into form when editing
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                city: initialData.city || '',
                state: initialData.state || '',
                type: initialData.type || '',
            });
            setGeneratedCode(initialData.code || '');
        } else {
            setFormData({ name: '', city: '', state: '', type: '' });
            setGeneratedCode('');
        }
    }, [initialData]);

    // Auto generate code
    useEffect(() => {
        if (!initialData && formData.name.trim()) {
            const code = generateCollegeCode(
                formData.name,
                existingColleges.map(c => c.code)
            );
            setGeneratedCode(code);
        }
    }, [formData.name, initialData, existingColleges]);

    const validate = () => {
        let tempErrors = {};

        if (!formData.name || formData.name.length < 3)
            tempErrors.name = "College name must be at least 3 characters.";

        else {
            const nameExists = existingColleges.some(
                c => c.name.toLowerCase() === formData.name.toLowerCase() &&
                     c.id !== initialData?.id
            );
            if (nameExists) tempErrors.name = "This college already exists.";
        }

        if (!formData.city) tempErrors.city = "City is required.";
        if (!formData.state) tempErrors.state = "State is required.";
        if (!formData.type) tempErrors.type = "College type is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        const payload = {
            ...formData,
            code: generatedCode
        };

        await onSubmit(payload);
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
                <Label htmlFor="name">College Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* CITY & STATE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div>
                    <Label>State</Label>
                    <Select value={formData.state} onValueChange={(v) => handleSelectChange('state', v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent>
                            {indianStates.map(s => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                </div>
            </div>

            {/* TYPE */}
            <div>
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={(v) => handleSelectChange('type', v)}>
                    <SelectTrigger><SelectValue placeholder="Select college type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="deemed">Deemed</SelectItem>
                    </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
            </div>

            {/* AUTO CODE */}
            {generatedCode && (
                <div>
                    <Label>College Code (Auto-generated)</Label>
                    <Input value={generatedCode} readOnly disabled />
                </div>
            )}

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#a0291f] hover:bg-[#7a1f17]"
                >
                    {isSubmitting ? "Saving..." : (initialData ? "Update College" : "Add College")}
                </Button>
            </div>
        </form>
    );
};

export default CollegeForm;
