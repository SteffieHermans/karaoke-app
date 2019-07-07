/* * * * * * * * * * * * *
 * FORM INPUT VALIDATION *
 * * * * * * * * * * * * */
import { isUndefined, isEmptyString, isFullString } from './utility';

export const validateInput = (value, rules, data = {}) => {
    if (!rules || (!rules.required && isEmptyString(value))) {
        return true;
    }

    const availableRules = [
        {
            name: 'required',
            test: (val) => isFullString(val.toString())
        },
        {
            name: 'minLength',
            test: (val) => val.length >= rules.minLength
        }
    ];

    let isValid = true;

    availableRules.forEach(({ name, test }) => {
        if (!isUndefined(rules[name]) && !test(value)) {
            isValid = false;
        }
    });

    return isValid;
};