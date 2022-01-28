import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import getValidators from "../helpers/validators.js";
import '@lion/radio-group/define';

const myCheckRadioGr = (inputData, context) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, updateValue, dataset} = inputData;
    const fieldValidators = getValidators(validators);
    const updateHandler = (name, target, context) => {
        const selectedValues = Array.from(target.querySelectorAll('input[type="radio"]:checked')).map(el => el.value);
        updateValue(name, selectedValues, context);
    }
    const options = dataset.map(el => {
        return html`
            <lion-radio .label="${el.label} ${el.value}" .choiceValue=${el.value}></lion-radio>`;
    })
    return html`
        <lion-radio-group
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...fieldValidators]}"
                .placeholder="${label}"
                @model-value-changed=${({target}) => updateHandler(name, target, context)}
        >
            ${options}
        </lion-radio-group>
    `;
};

export default myCheckRadioGr;
