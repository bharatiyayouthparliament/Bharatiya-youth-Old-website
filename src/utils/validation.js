export const validateEmail = (email) => {
    if (!email) return false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
    if (!phone) return false;
    // Validates 10-digit Indian mobile numbers
    const re = /^[6-9]\d{9}$/;
    return re.test(String(phone));
};

export const validatePassword = (password) => {
    // Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special
    const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return strongPass.test(password);
};


export const validateURL = (url) => {
    if (!url) return true; // Optional field
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
};

export const validateFileType = (file, allowedTypes) => {
    return file && allowedTypes.includes(file.type);
};

export const validateFileSize = (file, maxSize) => {
    return file && file.size <= maxSize;
};

export const validateRegistrationForm = (formData, showOtherCollege) => {
    const errors = {};

    // Name
    if (!formData.fullName || formData.fullName.trim().length < 3) {
        errors.fullName = "Full name must be at least 3 characters long.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
        errors.fullName = "Full name can only contain letters and spaces.";
    }

    // Email
    if (!formData.email) {
        errors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
        errors.email = "Please enter a valid email address.";
    }

    // Phone
    if (!formData.phone) {
        errors.phone = "Phone number is required.";
    } else if (!validatePhone(formData.phone)) {
        errors.phone = "Please enter a valid 10-digit phone number.";
    }

    // City
    if (!formData.city || formData.city.trim().length < 2) {
        errors.city = "City is required and must be at least 2 characters.";
    }

    // College
    if (!formData.college) {
        errors.college = "Please select your college.";
    } else if (showOtherCollege && (!formData.otherCollege || formData.otherCollege.trim() === '')) {
        errors.otherCollege = "Please specify your college name.";
    }

    // DOB
    if (!formData.dob) {
        errors.dob = "Date of birth is required.";
    }

    // Course
    if (!formData.course || formData.course.trim().length < 2) {
        errors.course = "Course is required and must be at least 2 characters.";
    }
    
    // Aadhar
    if (!formData.aadhar) {
        errors.aadhar = "Aadhar number is required.";
    } else if (!/^\d{12}$/.test(formData.aadhar)) {
        errors.aadhar = "Aadhar number must be exactly 12 digits.";
    }

    // Mode of Presence
    if (!formData.modeOfPresence) {
        errors.modeOfPresence = "Please select your mode of presence.";
    }

    // Conditional validation for Offline mode
    if (formData.modeOfPresence === 'Offline') {
        if (!formData.video) {
            errors.video = "Video upload is required for offline mode.";
        }
        if (!formData.photo) {
            errors.photo = "Photo upload is required for offline mode.";
        }
        if (!formData.attendSummit) {
            errors.attendSummit = "Please select if you want to attend the Global Summit.";
        }
    }

    // Terms and Conditions
    if (!formData.termsAccepted) {
        errors.termsAccepted = "You must accept the terms and conditions to continue.";
    }

    return errors;
};
