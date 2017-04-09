// -----------------------------------------------------------------------------
// appActions is a service that has all methods for updating appStore
// state partials.
// -----------------------------------------------------------------------------

class appActionsService {
    static initClass() {
        appActionsService.$inject = ['appStore', 'validator'];
    }

    constructor(appStore, validator) {
        this._appStore = appStore;
        this._validator = validator;
    }

    setProductTitle(title) {
        const state = this._appStore.getState();

        state.productTitle = title;

        this._appStore.setState(state);
    }

    setField(fieldName, value) {
        const state = this._appStore.getState();

        if (typeof state.fields[fieldName] === 'undefined') {
            throw new Error(`Unknown field: "${fieldName}"!`);
        }

        state.fields[fieldName].value = value

        if (state.fields[fieldName].isRequired) {
            if (state.fields[fieldName].validityType === 'text') {
                state.fields[fieldName].isValid = this._validator.isNonEmptyString(value);
            } else if (state.fields[fieldName].validityType === 'rating') {
                state.fields[fieldName].isValid = this._validator.isIntegerInRange(value, 1, 5);
            }
        }
        // set areFieldsValid by checking all fields
        // check unlock step two

        this._appStore.setState(state);
    }

    setSocial(socialName, isChecked) {
        const state = this._appStore.getState();

        if (typeof state.socials[socialName] === 'undefined') {
            throw new Error(`Unknown social: "${socialName}"!`);
        }

        state.socials[socialName] = isChecked;

        this._appStore.setState(state);
    }

    setFormError(isErrored) {
        const state = this._appStore.getState();
        state.steps.get('form').isErrorVisible = isErrored;

        this._appStore.setState(state);
    }

    setCurrentStepId(stepId) {
        const state = this._appStore.getState();

        if (typeof state.steps.get(stepId) === 'undefined') {
            throw new Error(`Unknown step: "${stepId}"!`);
        }

        state.currentStepId = stepId;

        this._appStore.setState(state);
    }
}

appActionsService.initClass();

angular.module('stateModule').service('appActions', appActionsService);
