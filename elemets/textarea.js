import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/textarea/define';

const myTextArea = (inputData) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators} = inputData;

    const handleChange = (target) => {
        const value = target.value;
        if (!value.length) return
        const options = {
            detail: {value: target.value},
            bubbles: true,
            composed: true,
        }
        target.dispatchEvent(new CustomEvent('update-element', options));
    }

    return html`
        <lion-textarea
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...validators]}"
                .placeholder="${label}"
                @model-value-changed=${({target}) => handleChange(target)}
                max-rows="4"
        ></lion-textarea>
    `;
};

export default myTextArea;
