/**
 * 
 * @param {String} value 
 * @param {integer} maxLength 
 * @returns 
 */
export function checkMaxLength(value, maxLength) {
    if(value.length > maxLength) {
        return false
    }

    return true
}

/**
 * 
 * @param {String} value 
 * @param {integer} minLength 
 * @returns 
 */
export function checkMinLength(value, minLength) {
    if(value.length < minLength) {
        return false
    }

    return true
}

/**
 * 
 * @param {String} value 
 * @param {integer} minLength 
 * @param {integer} maxLength 
 * @returns 
 */
export function checkInvalleLength(value, minLength, maxLength) {
    if(!checkMinLength(value, minLength) || !checkMaxLength(value, maxLength)) {
        return false
    }

    return true
}

/**
 * Check if the sended value is numerical
 * 
 * @param {*} value 
 * @returns 
 */
export function checkNumericalValue(value) {
    if(isNaN(value)) {
        return false
    }

    return true
}