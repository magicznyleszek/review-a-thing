class TextFieldController {
    static initClass() {
        TextFieldController.style = {
            initial: '',
            error: 'error',
            valid: 'valid'
        };
        TextFieldController.$inject = ['$attrs', 'validator', 'state'];
    }

    constructor($attrs, validator, state) {
        this._validator = validator;

        this.name = $attrs.name;
        this.value = null;
        this.stateModifier = TextFieldController.style.initial;
        this.isRequired = typeof $attrs.required !== 'undefined';
    }

    onChange() {
        this._validate();
    }

    onBlur() {
        this._validate();
    }

    _validate() {
        if (this.isRequired) {
            if (this._validator.isNonEmptyString(this.value)) {
                this.stateModifier = TextFieldController.style.valid;
            } else {
                this.stateModifier = TextFieldController.style.error;
            }
        }
    }
}

TextFieldController.initClass();

angular.module('fieldsModule').component('textField', {
    controller: TextFieldController,
    template: `
        <label i-textField="[[$ctrl.stateModifier]] [[$ctrl.isRequired?'required':'']]">
            <input
                i-textField-input
                placeholder="[[::$ctrl.name]]"
                type="text"
                ng-model="$ctrl.value"
                ng-change="$ctrl.onChange()"
                ng-blur="$ctrl.onBlur()"
            >
        </label>
    `
});
