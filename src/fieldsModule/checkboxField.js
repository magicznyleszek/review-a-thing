// -----------------------------------------------------------------------------
// checkboxField component with such attr-options as:
// - name (required attribute)
// - label (required attribute)
// -----------------------------------------------------------------------------

class CheckboxFieldController {
    static initClass() {
        CheckboxFieldController.getTemplate = () => {
            return `
                <label i-checkboxField>
                    <input
                        i-checkboxField-input
                        type="checkbox"
                        ng-model="$ctrl.value"
                        ng-change="$ctrl.onChange()"
                    >

                    <span i-checkboxField-label ng-bind="::$ctrl.label"></span>
                </label>
            `;
        };

        CheckboxFieldController.$inject = [
            '$attrs',
            'appStore',
            'appActions'
        ];
    }

    constructor($attrs, appStore, appActions) {
        if (typeof $attrs.name === 'undefined') {
            throw new Error('checkboxField requires name attribute to work!');
        }
        if (typeof $attrs.label === 'undefined') {
            throw new Error('checkboxField requires label attribute to work!');
        }

        this._appActions = appActions;

        this.label = $attrs.label;
        this.name = $attrs.name;
        this.value = null;
    }

    onChange() {
        this._appActions.setField(this.name, this.value);
    }
}

CheckboxFieldController.initClass();

angular.module('fieldsModule').component('checkboxField', {
    controller: CheckboxFieldController,
    template: CheckboxFieldController.getTemplate
});
