// sharedState.js
let fnum = 1; // Initial filter value
let currentValue = 1; // Variable to hold current value

const setFnum = (value) => {
    fnum = value;
};

const getFnum = () => {
    return fnum;
};

// Function to set currentValue
const setCurrentValue = (value) => {
    currentValue = value;
};

const getCurrentValue = () => {
    return currentValue;
};

module.exports = {
    setFnum,
    getFnum,
    setCurrentValue,
    getCurrentValue
};
