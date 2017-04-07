// -----------------------------------------------------------------------------
// textField component with such attr-options as:
// - name (required attribute)
// - label
// - multiline
// - required
// -----------------------------------------------------------------------------

class TextFieldController {
    static initClass() {
        TextFieldController.getTemplate = ($attrs) => {
            let input = '';
            if (typeof $attrs.multiline === 'string') {
                input = `
                    <textarea
                        i-textField-input="multiline"
                        placeholder="[[::$ctrl.label]]"
                        ng-model="$ctrl.value"
                        ng-change="$ctrl.onChange()"
                        ng-blur="$ctrl.onBlur()"
                        rows="4"
                    ></textarea>
                `;
            } else {
                input = `
                    <input
                        i-textField-input
                        placeholder="[[::$ctrl.label]]"
                        type="text"
                        ng-model="$ctrl.value"
                        ng-change="$ctrl.onChange()"
                        ng-blur="$ctrl.onBlur()"
                    >
                `;
            }

            return `
                <label i-textField="[[$ctrl.getValidModifier()]] [[::$ctrl.isRequired?'required':'']]">
                    ${input}
                </label>
            `;
        };

        TextFieldController.$inject = ['$attrs', 'validator', 'state'];
    }

    constructor($attrs, validator, state) {
        if (typeof $attrs.name === 'undefined') {
            throw new Error('textField requires name attribute to work!');
        }

        this._validator = validator;
        this._state = state;

        this.label = $attrs.label;
        this.name = $attrs.name;
        this.value = null;
        this.isRequired = typeof $attrs.required !== 'undefined';
        this.isValid = null;
    }

    onChange() {
        this._verifyValue();
        this._saveValue();
    }

    onBlur() {
        this._verifyValue();
        this._saveValue();
    }

    _verifyValue() {
        if (this.isRequired) {
            this.isValid = this._validator.isNonEmptyString(this.value);
        }
    }

    _saveValue() {
        const currentState = this._state.get();
        let textFieldsData = currentState.textFields;
        if (typeof textFieldsData !== 'object') {
            textFieldsData = {};
        }
        textFieldsData[this.name] = {
            value: this.value,
            isValid: this.isValid
        };
        this._state.setParam('textFields', textFieldsData);
    }

    getValidModifier() {
        if (this.isValid === true) {
            return 'valid';
        } else if (this.isValid === false) {
            return 'error';
        } else {
            return '';
        }
    }
}

TextFieldController.initClass();

angular.module('fieldsModule').component('textField', {
    controller: TextFieldController,
    template: TextFieldController.getTemplate
});
