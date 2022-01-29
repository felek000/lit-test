import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";

const myInput = (inputData) => {
        loadDefaultFeedbackMessages();
        const {name, label, validators} = inputData;

        return html`
            <lion-input
                    .label="${label}"
                    name="${name}"
                    .fieldName="${name}"
                    .validators="${[...validators]}"
                    .placeholder="${label}"
            ></lion-input>
        `;
    }
;

export default myInput;
