import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/checkbox-group/define';

const myCheckBoxGr = (inputData) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, dataset} = inputData;
    const updateHandler = (target) => {
        const selectedValues = Array.from(target.querySelectorAll('input[type="checkbox"]:checked')).map(el => el.value);
        if (!selectedValues.length) return
        const options = {
            detail: {value: selectedValues},
            bubbles: true,
            composed: true,
        }
        target.dispatchEvent(new CustomEvent('update-element', options));

    }
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
                @model-value-changed=${({target}) => updateHandler(target)}
        >
            ${options}
        </lion-checkbox-group>
    `;
};

export default myCheckBoxGr;
