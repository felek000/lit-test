import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/checkbox-group/define';

const myCheckBoxGr = (inputData) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, dataset} = inputData;
    const options = dataset.map(el => {
        return html`
            <lion-checkbox .label="${el.label} ${el.value}" .choiceValue=${el.value}></lion-checkbox>`;
    })
    return html`
        <lion-checkbox-group
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...validators]}"
                .placeholder="${label}"
        >
            ${options}
        </lion-checkbox-group>
    `;
};

export default myCheckBoxGr;
