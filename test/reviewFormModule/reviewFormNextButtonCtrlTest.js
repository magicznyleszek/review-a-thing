describe('reviewFormNextButtonCtrl', () => {
    let reviewFormNextButtonCtrl = null;
    let appStore = null;
    let appActions = null;

    beforeEach(() => {
        module('testAppModule');
        module('reviewFormModule');
        inject(($injector, $controller) => {
            reviewFormNextButtonCtrl = $controller('reviewFormNextButtonCtrl');
            appStore = $injector.get('appStore');
            appActions = $injector.get('appActions');
        });
    });

    describe('tryGoNext', () => {
        it('should result in review error being visible if required fields are not valid', () => {
            reviewFormNextButtonCtrl.tryGoNext();
            const state = appStore.getState();
            expect(state.steps.get('review').isErrorVisible).toBeTruthy();
        });

        it('should result in next step if required fields are valid', () => {
            appActions.setField('yourName', 'Leszek');
            appActions.setField('reviewText', 'This is cool, really.');
            appActions.setField('stars', 4);
            reviewFormNextButtonCtrl.tryGoNext();
            const state = appStore.getState();
            expect(state.steps.get('review').isErrorVisible).toBeFalsy();
            expect(state.currentStepId).toBe('socials');
        });
    });
});
