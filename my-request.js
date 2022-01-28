import {LitElement, html} from "lit";
import {MyForm} from './elemets/my-form.js'
export class MyRequest extends LitElement {

    static get properties() {
        return {
            url: {type:String},
            formData: {type: Object},
        };
    }

    constructor() {
        super();
        this.url = 'http://www.wp.pl';
        this.getData()
    }


    render() {
        return html`<my-form .url="${this.url}" .formSettings="${this.formData}"></my-form>`;
    }


    async getData() {
        const data = await new Promise((resolve, _) => {
            const sampleData = {
                "name": {
                    "label":"Wpisz imię",
                    "type": "text",
                    "validators": ["required", "max-len:20", "min-len:3"],
                    "visibility": "always"
                },
                "surname": {
                    "label":"Wpisz Nazwisko",
                    "type": "text",
                    "validators": ["required", "max-len:20", "min-len:3"],
                    "visibility": "always"
                },
                "nationality": {
                    "label":"Wpisz narodowość",
                    "type": "select",
                    "validators": ["required"],
                    "dataset": ["PL", "GB", "DE"],
                    "visibility": "always"
                },
                "comment": {
                    "label":"Wpisz komentarz",
                    "type": "textarea",
                    "validators": ["required"],
                    "visibility": "always"
                },
                "pesel": {
                    "label":"Wpisz pesel",
                    "type": "text",
                    // "validators": ["required", "len:11"],
                    "validators": ["required"],
                    "visibility": "nationality === PL"
                },
                "hero":{
                    "label":"Ulubiony bohater",
                    "type": "checkbox",
                    "validators": ["required"],
                    "visibility": "nationality === PL",
                    "dataset": [
                        {
                            "label":"Potężny wiedzmin",
                            "value":"gertalt"
                        },
                        {
                            "label":"Czarodziejka",
                            "value":"yenyfer"
                        },
                        {
                            "label":"Trubadur",
                            "value":"Jaskier"
                        }
                    ],
                },
                "criminal":{
                    "label":"Ulubiony złoczyńca",
                    "type": "radio",
                    "validators": ["required"],
                    "visibility": "nationality === PL",
                    "dataset": [
                        {
                            "label":"Najlepszy tata",
                            "value":"Vader"
                        },
                        {
                            "label":"Manupulator",
                            "value":"Sidius"
                        },
                        {
                            "label":"Duelista",
                            "value":"Bane"
                        }
                    ],
                }
            };
            setTimeout(() => {
                resolve(sampleData)
            }, 1000)
        });
        this.formData = data;
    }
}

window.customElements.define('my-request', MyRequest);
