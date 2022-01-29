import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/textarea/define';

const myTextArea = (inputData) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators} = inputData;

    return html`
        <lion-textarea
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...validators]}"
                .placeholder="${label}"
                max-rows="4"
        ></lion-textarea>
    `;
};

export default myTextArea;
