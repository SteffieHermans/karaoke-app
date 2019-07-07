/* * * * * * * * * * * * *
 * DEVELOPMENT UTILITIES *
 * * * * * * * * * * * * */
export const isUndefined = (value) => (typeof value === 'undefined');
export const isNull = (value) => (!value && typeof value === 'object');
export const isString = (value) => (typeof value === 'string');
export const isFullString = (value) => (isString(value) && !!value.trim().length);
export const isEmptyString = (value) => (isString(value) && !value.trim().length);
export const isArray = (value) => (typeof value === 'object' && Array.isArray(value));
export const isObject = (value) => (typeof value === 'object' && !isNull(value) && !isArray(value));

/* * * * * * * * * * * * * * *
 * OBJECT / ARRAY UTILITIES  *
 * * * * * * * * * * * * * * */
export const stringToArray = (input) => (isArray(input) ? input : isString(input) ? input.split(' ') : []);

export const addToArray = (newItems, currentArray) => (
    stringToArray(currentArray)
        .concat(stringToArray(newItems))
        .filter((value, index, outputArray) => value && outputArray.indexOf(value) === index)
);

/* * * * * * * * * * * * * * * * *
 * COMPONENT PROPERTY UTILITIES  *
 * * * * * * * * * * * * * * * * */
export const getStyles = (localStyles = {}) => function () {
    return [ ...arguments ]
        .reduce((output, classNames) => (
            output.concat(stringToArray(classNames).map((className) => (localStyles[className] || className)))
        ), [])
        .filter((className, index, output) => className && output.indexOf(className) === index)
        .join(' ').trim();
};

export const addModifierClasses = (modifiers, baseClassName, currentClasses) => {
    modifiers = stringToArray(modifiers)
        .map((mod) => (baseClassName && mod) ? `${baseClassName}--${mod}` : false);
    return addToArray(modifiers, currentClasses);
};

export const getEventAttributes = (events, targetObject) => {
    const isObject = (test) => test && test instanceof Object && test.constructor === Object;
    events = isObject(events) ? events : {};
    targetObject = isObject(targetObject) ? targetObject : {};
    for (let event in events) {
        if (event) {
            const eventAttribute = (`on${event[0].toUpperCase()}${event.substr(1)}`);
            targetObject[eventAttribute] = events[event];
        }
    }

    return targetObject;
};

/* * * * * * * * * * *
 * STRING UTILITIES  *
 * * * * * * * * * * */
export const createUniqueIdentifier = (prefix, length = 5, seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-') => `${prefix ? prefix.toLowerCase() : ''}_${Array(Math.max(Math.min(32, length), 1)).fill().reduce((id) => `${id}${seed[Math.floor(Math.random() * seed.length)]}`, '')}`;