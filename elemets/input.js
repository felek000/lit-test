import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import getValidators from "../helpers/validators.js";

const myInput = (inputData, context) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, updateValue} = inputData;
    const fieldValidators = getValidators(validators);

    return html`
        <lion-input
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...fieldValidators]}"
                .placeholder="${label}"
                @model-value-changed=${({target}) => updateValue(name, target.value, context)}
        ></lion-input>
    `;
};

export default myInput;
