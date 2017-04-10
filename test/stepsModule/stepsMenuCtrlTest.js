describe('stepsMenuCtrl', () => {
    let stepsMenuCtrl = null;
    let appActions = null;
    let appStore = null;

    beforeEach(() => {
        module('testAppModule');
        module('stepsModule');
        inject(($injector, $controller) => {
            stepsMenuCtrl = $controller('stepsMenuCtrl');
            appActions = $injector.get('appActions');
            appStore = $injector.get('appStore');
        });
    });

    it('should get initial steps state', () => {
        expect(stepsMenuCtrl.options.length > 0).toBeTruthy();
    });

    it('should change step when option callback is triggered', () => {
        appActions.setCurrentStepId('summary');
        stepsMenuCtrl.options[0].show();
        const state = appStore.getState();
        expect(state.currentStepId).toBe('review');
    });
});
