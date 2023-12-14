const formData = {};

function updateCountry(country, type) {
    formData[`${type}Country`] = country;
}

function updateFormData(key, value) {
    formData[key] = value;
}