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

        // set areFieldsValid by checking all fields
        // check unlock step two

        this._appStore.setState(state);

        this._validateField(fieldName);
    }

    _validateField(fieldName) {
        const state = this._appStore.getState();
        const field = state.fields[fieldName];

        if (typeof field === 'undefined') {
            throw new Error(`Unknown field: "${fieldName}"!`);
        }

        if (field.isRequired) {
            if (field.validityType === 'text') {
                field.isValid = this._validator.isNonEmptyString(field.value);
            } else if (field.validityType === 'rating') {
                field.isValid = this._validator.isIntegerInRange(field.value, 1, 5);
            }
        } else {
            field.isValid = true;
        }

        this._appStore.setState(state);
    }

    _validateAllFields() {
        const state = this._appStore.getState();
        for (const fieldName of Object.keys(state.fields)) {
            this._validateField(fieldName);
        }
    }

    setSocial(socialName, isChecked) {
        const state = this._appStore.getState();

        if (typeof state.socials[socialName] === 'undefined') {
            throw new Error(`Unknown social: "${socialName}"!`);
        }

        state.socials[socialName] = isChecked;

        this._appStore.setState(state);
    }

    setReviewError(isErrored) {
        const state = this._appStore.getState();
        state.steps.get('review').isErrorVisible = isErrored;

        this._appStore.setState(state);

        this._validateAllFields();
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
