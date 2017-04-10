describe('stepsContentCtrl', () => {
    let stepsContentCtrl = null;
    let appActions = null;

    beforeEach(() => {
        module('testAppModule');
        module('stepsModule');
        inject(($injector, $controller) => {
            stepsContentCtrl = $controller('stepsContentCtrl');
            appActions = $injector.get('appActions');
        });
    });

    it('should get currentStepId from state', () => {
        appActions.setCurrentStepId('summary');
        expect(stepsContentCtrl.currentStepId).toBe('summary');
    });
});
