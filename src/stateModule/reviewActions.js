// -----------------------------------------------------------------------------
// reviewActions is a service that has all methods for updating reviewStore
// state partials.
// -----------------------------------------------------------------------------

class ReviewActionsService {
    static initClass() {
        ReviewActionsService.$inject = ['reviewStore', 'validator'];
    }

    constructor(reviewStore, validator) {
        this._reviewStore = reviewStore;
        this._validator = validator;
    }

    setProductTitle(title) {
        const state = this._reviewStore.getState();

        state.productTitle = title;

        this._reviewStore.setState(state);
    }

    setField(fieldName, value) {
        const state = this._reviewStore.getState();

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

        this._reviewStore.setState(state);
    }

    setSocial(socialName, isChecked) {
        const state = this._reviewStore.getState();

        if (typeof state.socials[socialName] === 'undefined') {
            throw new Error(`Unknown social: "${socialName}"!`);
        }

        state.socials[socialName] = isChecked;

        this._reviewStore.setState(state);
    }

    setFormError(isErrored) {
        const state = this._reviewStore.getState();
        state.steps.get('form').isErrorVisible = isErrored;

        this._reviewStore.setState(state);
    }

    setCurrentStepId(stepId) {
        const state = this._reviewStore.getState();

        if (typeof state.steps.get(stepId) === 'undefined') {
            throw new Error(`Unknown step: "${stepId}"!`);
        }

        state.currentStepId = stepId;

        this._reviewStore.setState(state);
    }
}

ReviewActionsService.initClass();

angular.module('stateModule').service('reviewActions', ReviewActionsService);
