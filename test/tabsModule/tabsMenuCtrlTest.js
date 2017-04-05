describe('tabsMenuCtrl', () => {
    let tabsMenuCtrl = null;
    let state = null;

    beforeEach(() => {
        module('testAppModule');
        module('tabsModule');
        inject(($injector, $controller) => {
            tabsMenuCtrl = $controller('tabsMenuCtrl');
            state = $injector.get('state');
        });
    });

    it('should get initial tabs state', () => {
        expect(tabsMenuCtrl.options.length > 0).toBeTruthy();
    });

    it('should make only one tab visible with showTab', () => {
        const currentState = state.get();

        tabsMenuCtrl.showTab(currentState.tabs[0].id);
        expect(tabsMenuCtrl.options[0].isVisible).toBeTruthy();
        expect(tabsMenuCtrl.options[1].isVisible).toBeFalsy();

        tabsMenuCtrl.showTab(currentState.tabs[1].id);
        expect(tabsMenuCtrl.options[0].isVisible).toBeFalsy();
        expect(tabsMenuCtrl.options[1].isVisible).toBeTruthy();
    });
});
