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

    // -------------------------------------------------------------------------
    // managing fields
    // -------------------------------------------------------------------------

    setField(fieldName, value) {
        const state = this._appStore.getState();

        if (typeof state.fields[fieldName] === 'undefined') {
            throw new Error(`Unknown field: "${fieldName}"!`);
        }

        state.fields[fieldName].value = value;

        this._appStore.setState(state);

        // post setting state

        this._validateField(fieldName);

        this._checkAllRequiredFieldsValidity();

        this._checkReviewValidityWithFurtherStepsUnlocked();
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

    _checkAllRequiredFieldsValidity() {
        const state = this._appStore.getState();

        state.areAllRequiredFieldsValid = true;
        for (const fieldName of Object.keys(state.fields)) {
            if (
                state.fields[fieldName].isRequired &&
                state.fields[fieldName].isValid !== true
            ) {
                state.areAllRequiredFieldsValid = false;
                break;
            }
        }

        this._appStore.setState(state);
    }

    _checkReviewValidityWithFurtherStepsUnlocked() {
        const state = this._appStore.getState();

        if (
            state.steps.get('socials').isUnlocked &&
            state.areAllRequiredFieldsValid !== true
        ) {
            this._setReviewError(true);
            this._lockAllSteps();
            this.setCurrentStepId('review');
        }
    }

    _setReviewError(isErrored) {
        const state = this._appStore.getState();
        state.steps.get('review').isErrorVisible = isErrored;

        this._appStore.setState(state);

        this._validateAllFields();
    }

    // -------------------------------------------------------------------------
    // managing steps
    // -------------------------------------------------------------------------

    setCurrentStepId(stepId) {
        const state = this._appStore.getState();

        if (typeof state.steps.get(stepId) === 'undefined') {
            throw new Error(`Unknown step: "${stepId}"!`);
        }

        state.currentStepId = stepId;
        state.steps.get(stepId).isUnlocked = true;

        this._appStore.setState(state);
    }

    _lockAllSteps() {
        const state = this._appStore.getState();
        state.steps.forEach((step) => {
            step.isUnlocked = false;
        });
        this._appStore.setState(state);
    }

    tryGoNextStep() {
        const state = this._appStore.getState();

        switch (state.currentStepId) {
            case 'review': {
                if (state.areAllRequiredFieldsValid) {
                    this._setReviewError(false);
                    this.setCurrentStepId('socials');
                } else {
                    this._setReviewError(true);
                    this._lockAllSteps();
                    this.setCurrentStepId('review');
                }
                break;
            }
            case 'socials': {
                this.setCurrentStepId('summary');
                break;
            }
            case 'summary': {
                this.setCurrentStepId('final');
                this._lockAllSteps();
                break;
            }
            default: {
                this.setCurrentStepId('review');
            }
        }
    }
}

appActionsService.initClass();

angular.module('stateModule').service('appActions', appActionsService);
