const formData = {};

function updatePropertyType(propertyType) {
    formData["propertyType"] = propertyType;
}

function updateZipCode(zipCode, inputId) {
    formData[inputId] = zipCode
}