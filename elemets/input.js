import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";

const myInput = (inputData) => {
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
            <lion-input
                    .label="${label}"
                    name="${name}"
                    .fieldName="${name}"
                    .validators="${[...validators]}"
                    .placeholder="${label}"
                    @model-value-changed=${({target}) => handleChange(target)}
            ></lion-input>
        `;
    }
;

export default myInput;
