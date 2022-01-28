import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/select/define';


const mySelect = (inputData, context) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, updateValue, dataset} = inputData;
    const isValid = () => {
        if (validators[0] === 'required') {
            return context.formData[name] ? true : false
        }
        return true
    }
    const errorComponent = () => {
        if(isValid()) return '';
        return html`
            <lion-validation-feedback
                    data-tag-name="lion-validation-feedback"
                    slot="feedback" aria-live="assertive"
                    type="error"
            >
                Pole jest wymagane
            </lion-validation-feedback>`
    };

    const options = dataset.map(el => {
        return html`
            <option value="${el}">${el}</option>`;
    })
    const handleChange = (name, value, context) => {
        updateValue(name, value, context);
    }
    return html`
        <lion-select
                .name="${name}"
                .label="${label}"
                .modelValue="${name}"
                @model-value-changed=${({target}) => handleChange(name, target.value, context)}
        >
            <select slot="input">
                <option selected hidden value>Please select</option>
                ${options}
            </select>
        </lion-select>
        ${errorComponent()}
    `;
};

export default mySelect;
