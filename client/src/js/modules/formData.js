const formData = {};

// TODO: Refator code

function updatePropertyType(propertyType) {
    formData["propertyType"] = propertyType;
}

function updateZipCode(zipCode, inputId) {
    formData[inputId] = zipCode
}

function updatePropertySize(size) {
    formData["movesize"] = size;
}

function updateMovingDate(movingDate) {
    formData["movedte"] = movingDate;
}

function updateName(name) {
    formData["fullName"] = name;
}

function updateEmail(email) {
    formData["email"] = email;
}

function updatePhone(phone) {
    formData["phone"] = phone;
}