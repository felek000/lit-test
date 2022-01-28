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

export class MyForm extends LitElement {

    static properties = {
        url: {type: String},
        formSettings: {type: Object},
        formData: {},
        responseStatus: {}
    }

    constructor() {
        super();
        localize.locale = 'pl-PL';
        this.formData = {}
        this.responseStatus = {showMessage: false, status: null}
    }

    /**
     * @description update formData and dom
     * @param name
     * @param value
     * @param context
     */
    updateValue(name, value, context) {
        context.formData[name] = value;
        context.requestUpdate();
    }

    createFields() {
        const elements = [];
        for (const [formKey, formValue] of Object.entries(this.formSettings)) {
            if (!isVisible(this.formData, formValue.visibility)) {
                continue;
            }
            const options = {
                updateValue: this.updateValue,
                name: formKey,
                ...formValue
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


    async handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.formData);
        if (ev.target.hasFeedbackFor.includes('error')) {
            console.log('są błędy');
            return;
        }
        const response = await this.sendData();
        if(response){
            this.responseStatus = {showMessage: true, status: response}
            this.formData = {};
            return
        }
        this.responseStatus = {showMessage: true, status: false}
        console.log(response);
    }

    async sendData() {
        /**
         * @description simulate api
         */
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const response = Math.random() < 0.5;
                resolve(response)
            }, 1000)
        });
    }

    /**
     * @description template for response info message
     * @returns {TemplateResult<1>}
     */
    responseMessage(){
        if(!this.responseStatus.showMessage) return html``;
        if(this.responseStatus.status){
            return html`<div style="color: green;">Formularz wysłany</div>`;
        }
        return html`<div style="color: red;">Formularz nie wysłany</div>`;
    }
    render() {
        if (!isVisible || this.formSettings === undefined) return html`
            <div>Wczytywanie</div>`;

        return html`
            <lion-form @submit=${this.handleSubmit}>
                <form @submit=${ev => ev.preventDefault()}>
                    ${this.createFields()}
                    <button type="submit">Zapisz</button>
                </form>
            </lion-form>
            ${this.responseMessage()}
        `;
    }
}

window.customElements.define('my-form', MyForm);
