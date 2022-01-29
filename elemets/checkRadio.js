import {loadDefaultFeedbackMessages} from "@lion/validate-messages";
import {html} from "lit";
import '@lion/radio-group/define';

const myCheckRadioGr = (inputData) => {
    loadDefaultFeedbackMessages();
    const {name, label, validators, dataset} = inputData;
    const updateHandler = (target) => {
        const selectedValues = Array.from(target.querySelectorAll('input[type="radio"]:checked')).map(el => el.value);
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
            <lion-radio .label="${el.label} ${el.value}" .choiceValue=${el.value}></lion-radio>`;
    })
    return html`
        <lion-radio-group
                .label="${label}"
                name="${name}"
                .fieldName="${name}"
                .validators="${[...validators]}"
                .placeholder="${label}"
                @model-value-changed=${({target}) => updateHandler(target)}
        >
            ${options}
        </lion-radio-group>
    `;
};

export default myCheckRadioGr;
