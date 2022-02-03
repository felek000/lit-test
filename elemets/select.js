import { loadDefaultFeedbackMessages } from '@lion/validate-messages'
import { html } from 'lit'
import '@lion/select/define'
import RequiredSelect from '../helpers/RequiredSelect.js'

const mySelect = (inputData) => {
  loadDefaultFeedbackMessages()
  const markNotSelected = -1
  const { name, label, validators, dataset } = inputData
  const options = dataset.map((el, index) => {
    return html`
        <option value="${el}">${el}</option>`
  })

  /**
   * @description If Select get required custom data
   * @TODO mayby better
   */
  const mySelectValidators = validators.map(validator => {
    if (validator.constructor.name === 'Required') {
      return new RequiredSelect(markNotSelected)
    }
    return validator
  })

  return html`
      <lion-select
              .validators="${[...mySelectValidators]}"
              .name="${name}"
              .label="${label}"
              .modelValue=""
      >
          <select slot="input">
              <option value="${markNotSelected}">----</option>
              ${options}
          </select>
      </lion-select>
  `
}

export default mySelect
