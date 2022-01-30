/**
 * @description check if field based conditions
 * @param formData
 * @param visibility
 * @returns {boolean}
 */
const isVisible = (formData, visibility) => {
    const visibilityArray = visibility.split(' ');
    const propName = visibilityArray[0].trim();
    if (propName === 'always') return true;
    if (formData[propName] === undefined) return false;

    const condition = visibilityArray[1].trim().toLowerCase();
    const value = visibilityArray[2].trim().toLowerCase();
    const propToValidate = formData[propName].trim().toLowerCase();
    switch (condition) {
        case '===':
            return value === propToValidate;

        case '==':
            return value == propToValidate;

        case '>=':
            return value >= propToValidate;

        case '<=':
            return value >= propToValidate;

        default:
            return false
    }

    // const myVisibility = visibility.split('===');
    // const propName = myVisibility[0].trim()
    // if (propName === 'always') return true
    // else if (formData[propName] !== undefined) {
    //     return myVisibility[1].trim().toLowerCase() === formData[propName].trim().toLowerCase();
    // }
    // return false;
}

export default isVisible;
