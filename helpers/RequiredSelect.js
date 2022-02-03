import { Validator } from '@lion/form-core'

export default class RequiredSelect extends Validator {
  static get validatorName () {
    return 'RequiredSelect'
  }

  execute (value, param) {
    return parseInt(value) === param

  }

  static getMessage ({ fieldName }) {
    return new Promise(resolve => {
      resolve(`Value must be selected ${fieldName}`)
    })
  }
}
