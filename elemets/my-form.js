import {LitElement, html} from "lit";
import '@lion/input/define';
import '@lion/form/define';
import {localize} from '@lion/localize';
import myInput from './input.js';
import mySelect from './select.js'
import myTextArea from './textarea.js'
import isVisible from "../helpers/isVisible.js";
import myCheckBoxGr from "./checkBox.js";
import myCheckRadioGr from "./checkRadio.js";
import getValidators from "../helpers/validators.js";

export class MyForm extends LitElement {

    static properties = {
        url: {type: String},
        formSettings: {type: Object},
        responseStatus: {}
    }

    constructor() {
        super();
        localize.locale = 'pl-PL';
        this.responseStatus = {showMessage: false, status: null}
    }

    createFields() {
        const formData = this?.form?.serializedValue ?? {};
        const elements = [];
        for (const [formKey, formValue] of Object.entries(this.formSettings)) {
            if (!isVisible(formData, formValue.visibility)) {
                continue;
            }
            const options = {
                name: formKey,
                ...formValue,
                validators: getValidators(formValue.validators)
            }
            switch (formValue.type) {
                case 'text':
                    elements.push(myInput(options, this));
                    break
                case 'select':
                    elements.push(mySelect(options, this));
                    break
                case 'textarea':
                    elements.push(myTextArea(options, this));
                    break
                case 'checkbox':
                    elements.push(myCheckBoxGr(options, this));
                    break
                case 'radio':
                    elements.push(myCheckRadioGr(options, this));
                    break
                default:
                    break
            }
        }
        return html`${elements}`;
    }

    get form() {
        return this.shadowRoot.querySelector('lion-form') ?? null;
    }

    async handleSubmit(ev) {
        ev.preventDefault();
        if (ev.target.hasFeedbackFor.includes('error')) {
            console.error('są błędy');
            return;
        }
        const formData = ev.target.serializedValue;
        const response = await this.sendData(formData);
        if (response) {
            this.responseStatus = {showMessage: true, status: response}
            this.form.reset();
            return
        }
        this.responseStatus = {showMessage: true, status: false}
        console.log(response);
    }

    async sendData(formData) {
        /**
         * @description simulate api
         */
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(this.url, formData);
                const response = Math.random() < 0.5;
                resolve(response)
            }, 1000)
        });
    }

    /**
     * @description template for response info message
     * @returns {TemplateResult<1>}
     */
    responseMessage() {
        if (!this.responseStatus.showMessage) return html``;
        if (this.responseStatus.status) {
            return html`
                <div style="color: green;">Formularz wysłany</div>`;
        }
        return html`
            <div style="color: red;">Formularz nie wysłany</div>`;
    }

    handleReset(ev) {
        ev.currentTarget.parentElement.reset();
    }

    /**
     * @description handle update ui for visibility
     * @param e{Event}
     */
    handleUpdate({detail}) {

        /**
         * @description update one time on init - because visibility conditions
         */
        if (detail.initialize) {
            this.requestUpdate();
            return;
        }
        const name = detail?.formPath[0]?.name ?? null;
        const visibilityTriggerNames = getNames(this.formSettings);

        /**
         * @description ui needs to update
         */
        if (visibilityTriggerNames.has(name)) {
            this.requestUpdate();
        }

        /**
         * @description get names to watch for update
         */
        function getNames(formSettings) {
            const visibilityTriggerNames = new Set();
            for (const [formKey, formValue] of Object.entries(formSettings)) {
                const visibilityName = formValue.visibility.split('===')[0].trim();
                if (visibilityName && visibilityName !== 'always') visibilityTriggerNames.add(visibilityName);
            }
            return visibilityTriggerNames;
        }
    }

    render() {
        if (!isVisible || this.formSettings === undefined) return html`
            <div>Wczytywanie</div>`;

        return html`
            <lion-form
                    @submit="${this.handleSubmit}"
                    @model-value-changed="${(e) => this.handleUpdate(e)}"
            >
                <form @submit=${ev => ev.preventDefault()}>
                    ${this.createFields()}
                    <button type="submit">Zapisz</button>
                    <lion-button-reset
                            @click=${ev => this.handleReset(ev)}
                    >Reset
                    </lion-button-reset>
                </form>
            </lion-form>
            ${this.responseMessage()}
        `;
    }
}

window.customElements.define('my-form', MyForm);
