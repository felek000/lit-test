import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import getValidators from "../helpers/validators.js";
import '@lion/checkbox-group/define';

const myCheckBoxGr = (inputData, context) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, updateValue, dataset} = inputData;
    const fieldValidators = getValidators(validators);
    const updateHandler = (name, target, context) => {
        const selectedValues = Array.from(target.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);
        updateValue(name, selectedValues, context);
    }
    const options = dataset.map(el => {
        return html`
            <lion-checkbox .label="${el.label} ${el.value}" .choiceValue=${el.value}></lion-checkbox>`;
    })
    return html`
        <lion-checkbox-group
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...fieldValidators]}"
                .placeholder="${label}"
                @model-value-changed=${({target}) => updateHandler(name, target, context)}
        >
            ${options}
        </lion-checkbox-group>
    `;
};

export default myCheckBoxGr;
