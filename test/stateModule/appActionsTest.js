describe('appActions', () => {
    let appActions = null;
    let appStore = null;

    beforeEach(() => {
        module('testAppModule');
        module('stateModule');
        inject(($injector) => {
            appActions = $injector.get('appActions');
            appStore = $injector.get('appStore');
        });
    });

    describe('setProductTitle', () => {
        it('should update field value in state', () => {
            appActions.setProductTitle('Good Pills');
            const state = appStore.getState();
            expect(state.productTitle).toBe('Good Pills');
        });
    });

    describe('setField', () => {
        it('should update field value in state', () => {
            appActions.setField('facebook', true);
            const state = appStore.getState();
            expect(state.fields.facebook.value).toBe(true);
        });

        it('should throw for unknown field', () => {
            expect(() => {appActions.setField('unicorns', 42);}).toThrow();
        });

        it('should update areAllRequiredFieldsValid value in state', () => {
            appActions.setField('facebook', true);
            const state = appStore.getState();
            expect(state.areAllRequiredFieldsValid).toBeFalsy();
        });

        it(`
            should result in error being visible
            and further steps locked
            if got back from other step to review
            and some field is being changed to invalid
        `, () => {
            // be a good boy and fill up review properly
            appActions.setCurrentStepId('review');
            appActions.setField('yourName', 'Leszek');
            appActions.setField('reviewText', 'This is cool, really.');
            appActions.setField('stars', 4);
            appActions.tryGoNextStep();
            let state = appStore.getState();
            expect(state.steps.get('review').isErrorVisible).toBeFalsy();
            expect(state.steps.get('socials').isUnlocked).toBeTruthy();
            expect(state.currentStepId).toBe('socials');

            // go back to review step and break one required field
            appActions.setCurrentStepId('review');
            appActions.setField('yourName', '');
            state = appStore.getState();
            expect(state.steps.get('review').isErrorVisible).toBeTruthy();
            expect(state.steps.get('socials').isUnlocked).toBeFalsy();
        });
    });

    describe('setCurrentStepId', () => {
        it('should set currentStepId in state', () => {
            appActions.setCurrentStepId('final');
            const state = appStore.getState();
            expect(state.currentStepId).toBe('final');
        });

        it('should throw for unknown step', () => {
            expect(() => {appActions.setCurrentStepId('nirvana');}).toThrow();
        });
    });

    describe('tryGoNextStep', () => {
        it('should result in error being visible if on review and any field is not valid', () => {
            appActions.setCurrentStepId('review');
            appActions.tryGoNextStep();
            const state = appStore.getState();
            expect(state.steps.get('review').isErrorVisible).toBeTruthy();
            expect(state.currentStepId).toBe('review');
        });

        it('should result in next step if on review and all required fields are valid', () => {
            appActions.setCurrentStepId('review');
            appActions.setField('yourName', 'Leszek');
            appActions.setField('reviewText', 'This is cool, really.');
            appActions.setField('stars', 4);
            appActions.tryGoNextStep();
            const state = appStore.getState();
            expect(state.steps.get('review').isErrorVisible).toBeFalsy();
            expect(state.currentStepId).toBe('socials');
        });

        it('should go to summary from socials', () => {
            appActions.setCurrentStepId('socials');
            appActions.tryGoNextStep();
            const state = appStore.getState();
            expect(state.currentStepId).toBe('summary');
        });

        it('should go to final from summary', () => {
            appActions.setCurrentStepId('summary');
            appActions.tryGoNextStep();
            const state = appStore.getState();
            expect(state.currentStepId).toBe('final');
        });

        it('should lock all steps when going to final', () => {
            appActions.setCurrentStepId('summary');
            appActions.tryGoNextStep();
            const state = appStore.getState();
            expect(state.currentStepId).toBe('final');
            state.steps.forEach((step) => {
                expect(step.isUnlocked).toBeFalsy();
            });
        });
    });
});
