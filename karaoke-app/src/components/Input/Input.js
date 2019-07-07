import React, {useState, useMemo, Fragment, useRef, useEffect} from 'react';
import {getStyles, createUniqueIdentifier, isObject, addModifierClasses, addToArray, getEventAttributes} from '../../shared/utility';

import localStyles from './Input.module.scss';
const styles = getStyles(localStyles);

const input = React.memo((props) => {
    // destruct props
    const {
        inputReference, id, name,
        value, placeholder, attrs = {},
        events = {}, modifiers = [], classes = '',
        invalid, touched, loading,
        readonly, required, disabled,
        description, error,
        children, label, labelClasses, labelContentClasses,
    } = props;
    
    /* * * * * * * * * *
     * INPUT REFERENCE *
     * * * * * * * * * */
    const inputRef = isObject(inputReference) ? inputReference : useRef();
    const [inputHasFocus, setInputHasFocus] = useState(inputRef.current === document.activeElement);

    useEffect(() => {
        const inputEl = inputRef.current;
        if (inputEl) {
            inputEl.onfocus = () => { setInputHasFocus(true); };
            inputEl.onblur = () => { setInputHasFocus(false); };
        }
        return () => {
            if (inputEl) {
                inputEl.onfocus = null;
                inputEl.onblur = null;
            }
        };
    }, [inputRef]);

    /* * * * * * * * * * *
     * INPUT PROPERTIES  *
    ** * * * * * * * * * */
    const showInvalidState = !inputHasFocus && touched && (invalid || error);

    let inputClasses = [];
    const mods = modifiers
        .concat(showInvalidState ? 'invalid' : []);

    inputClasses = addModifierClasses(mods, 'input', ['input']);
    inputClasses = addToArray([classes], inputClasses);

    // immutable id
    const [input_id] = useState(id || (attrs && attrs.id ? attrs.id : createUniqueIdentifier('input', 10)));

    const evtAttrs = getEventAttributes(events, {});

    const properties = {
        ref: inputRef,
        id: input_id,
        name: name || attrs.name,
        placeholder: placeholder,
        className: inputClasses,
        readOnly: (readonly || loading),
        disabled, required,
        ...evtAttrs,
        ...(evtAttrs.onChange ? { value } : { defaultValue: value })
    };

    /* * * * * * * * *
     * HTML ELEMENT  *
    ** * * * * * * * */
    const htmlAttributes = { ...attrs, ...properties };
    let inputElement = <input {...htmlAttributes} />;

    /* * * * *
     * LABEL *
    ** * * * */
    const labelContent = label || children;
    let labelElement;
    if (labelContent) {
        const labelModifiers = []
            .concat(modifiers)
            .concat(htmlAttributes.disabled ? 'disabled' : null);

        let labelElementClasses = ['label'];
        labelElementClasses = addModifierClasses(labelModifiers, 'label', labelElementClasses);
        labelElementClasses = labelElementClasses.concat(labelClasses);

        const labelContentModifiers = []
            .concat(htmlAttributes.required ? 'required' : null);

        let labelElementContentClasses = ['label__content'];
        labelElementContentClasses = addModifierClasses(labelContentModifiers, 'label__content', labelElementContentClasses);
        labelElementContentClasses = labelElementContentClasses.concat(labelContentClasses);

        labelElement = (
            <label
                className={styles(labelElementClasses)}
                htmlFor={(htmlAttributes.id) || null}
            >
                <span className={styles(labelElementContentClasses)}>
                    {labelContent}
                </span>
            </label>
        );
    }

    /* * * * * * * * * * * *
     * DESCRIPTION / ERROR *
     * * * * * * * * * * * */
    const descriptionElement = useMemo(() => (
        <p className={styles(showInvalidState ? 'error' : 'description')}>
            {showInvalidState ? (error || 'Please fill in this field.') : description}
        </p>
    ), [showInvalidState, error, description]);

    /* * * * * *
     * OUTPUT  *
     * * * * * */
    return (
        <Fragment>
            {labelElement}
            {inputElement}
            {descriptionElement}
        </Fragment>
    );
});

export default input;