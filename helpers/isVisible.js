/**
 * @description check if field based conditions
 * @param formData
 * @param visibility
 * @returns {boolean}
 */
const isVisible = (formData, visibility) => {
    const myVisibility = visibility.split('===');
    const propName = myVisibility[0].trim()
    if (propName === 'always') return true
    else if (formData[propName] !== undefined) {
        return myVisibility[1].trim().toLowerCase() === formData[propName].trim().toLowerCase();
    }
    return false;
}

export default isVisible;
