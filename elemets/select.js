import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/select/define';

const mySelect = (inputData) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, dataset} = inputData;
    const options = dataset.map((el,index) => {
        return html`
            <option ?selected="${index===0}" value="${el}">${el}</option>`;
    })

    return html`
        <lion-select
                .validators="${[...validators]}"
                .name="${name}"
                .label="${label}"  
                .modelValue="${name}"
        >
            <select slot="input">
                ${options}
            </select>
        </lion-select>
    `;
};

export default mySelect;
