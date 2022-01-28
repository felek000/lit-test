import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import getValidators from "../helpers/validators.js";
import '@lion/textarea/define';

const myTextArea = (inputData, context) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, updateValue} = inputData;
    const fieldValidators = getValidators(validators);

    return html`
        <lion-textarea
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...fieldValidators]}"
                .placeholder="${label}"
                @model-value-changed=${({target}) => updateValue(name, target.value, context)}
                max-rows="4"
        ></lion-textarea>
    `;
};

export default myTextArea;
