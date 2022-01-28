import {MinLength, Required, MaxLength,EqualsLength} from "@lion/form-core";

/**
 * @description validators for field
 * @param validators
 * @returns {*}
 */
const getValidators = (validators) => {
    return validators.map(v => {
        const validator = v.split(':');
        switch (validator[0]) {
            case 'required':
                return new Required();

            case 'max-len':
                return new MaxLength(validator[1]);

            case 'min-len':
                return new MinLength(validator[1]);

            case 'len':
                return new EqualsLength(validator[1]);

            case undefined:
                break
            default:
        }
    });
}

export default getValidators;
