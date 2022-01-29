import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/select/define';

const mySelect = (inputData) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, dataset} = inputData;
    const initialValue = dataset[0];
    const options = dataset.map((el,index) => {
        return html`
            <option value="${el}">${el}</option>`;
    })

    return html`
        <lion-select
                .validators="${[...validators]}"
                .name="${name}"
                .label="${label}"  
                .modelValue="${initialValue}"
        >
            <select slot="input">
                ${options}
            </select>
        </lion-select>
    `;
};

export default mySelect;
