const selectedFlag = document.querySelector('.iti__selected-flag');
const flagContainer = document.querySelector('.iti__flag-container');
const listOfCountries = document.getElementById('iti-0__country-listbox');
let isClicked = false;

selectedFlag.addEventListener('click', () => {
    if (!isClicked) {
        flagContainer.style.width = '100%';
        listOfCountries.style.width = '100%';
        isClicked = true;
    } else {
        flagContainer.style.width = '';
        listOfCountries.style.width = '';
        isClicked = false;
    }
})

const countryItems = document.querySelectorAll('.iti__country');

countryItems.forEach(countryItem => {
    countryItem.addEventListener('click', () => {

        flagContainer.style.width = '';
        listOfCountries.style.width = '';
        isClicked = false;
    });
});
