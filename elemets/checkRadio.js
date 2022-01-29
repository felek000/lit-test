import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/radio-group/define';

const myCheckRadioGr = (inputData) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, dataset} = inputData;
    const options = dataset.map(el => {
        return html`
            <lion-radio .label="${el.label} ${el.value}" .choiceValue=${el.value}></lion-radio>`;
    })
    return html`
        <lion-radio-group
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...validators]}"
                .placeholder="${label}"
        >
            ${options}
        </lion-radio-group>
    `;
};

export default myCheckRadioGr;
