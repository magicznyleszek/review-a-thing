// -----------------------------------------------------------------------------
// starsField component with such attr-options as:
// - name (required attribute)
// - label
// - required
// -----------------------------------------------------------------------------

class StarsFieldController {
    static initClass() {
        StarsFieldController.getTemplate = () => {
            return `
                <div i-starsField="[[$ctrl.getValidModifier()]] [[::$ctrl.isRequired?'required':'']]">
                    <span
                        i-starsField-label
                        ng-if="::$ctrl.label"
                        ng-bind="::$ctrl.label"
                    ></span>

                    <button
                        ng-repeat="number in [1, 2, 3, 4, 5]"
                        i-starsField-star
                        ng-click="$ctrl.setValue(number)"
                        ng-bind="$ctrl.getStarText(number)"
                    ></button>
                </div>
            `;
        };

        StarsFieldController.$inject = [
            '$attrs',
            'appStore',
            'appActions'
        ];
    }

    constructor($attrs, appStore, appActions) {
        if (typeof $attrs.name === 'undefined') {
            throw new Error('starsField requires name attribute to work!');
        }

        this._appActions = appActions;

        this.label = $attrs.label;
        this.name = $attrs.name;
        this.value = null;
        this.isRequired = typeof $attrs.required !== 'undefined';
        this._isValid = null;

        appStore.registerStateObserver(this._onStateChange.bind(this));
    }

    _onStateChange(state) {
        this._isValid = state.fields[this.name].isValid;
    }

    setValue(number) {
        this.value = number;
        this._appActions.setField(this.name, this.value);
    }

    getStarText(number) {
        if (number > this.value) {
            return '☆';
        } else {
            return '★';
        }
    }

    getValidModifier() {
        if (this._isValid === true) {
            return 'valid';
        } else if (this._isValid === false) {
            return 'error';
        } else {
            return '';
        }
    }
}

StarsFieldController.initClass();

angular.module('fieldsModule').component('starsField', {
    controller: StarsFieldController,
    template: StarsFieldController.getTemplate
});
