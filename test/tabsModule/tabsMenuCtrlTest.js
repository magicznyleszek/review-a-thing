describe('stepsMenuCtrl', () => {
    let stepsMenuCtrl = null;
    let state = null;

    beforeEach(() => {
        module('testAppModule');
        module('stepsModule');
        inject(($injector, $controller) => {
            stepsMenuCtrl = $controller('stepsMenuCtrl');
            state = $injector.get('state');
        });
    });

    it('should get initial tabs state', () => {
        expect(stepsMenuCtrl.options.length > 0).toBeTruthy();
    });

    it('should make only one tab visible with showTab', () => {
        const currentState = state.get();

        stepsMenuCtrl.showTab(currentState.tabs[0].id);
        expect(stepsMenuCtrl.options[0].isVisible).toBeTruthy();
        expect(stepsMenuCtrl.options[1].isVisible).toBeFalsy();

        stepsMenuCtrl.showTab(currentState.tabs[1].id);
        expect(stepsMenuCtrl.options[0].isVisible).toBeFalsy();
        expect(stepsMenuCtrl.options[1].isVisible).toBeTruthy();
    });
});
