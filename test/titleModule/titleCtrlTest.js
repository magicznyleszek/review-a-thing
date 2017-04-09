describe('titleCtrl', () => {
    let appActions = null;
    let titleCtrl = null;

    beforeEach(() => {
        module('testAppModule');
        module('titleModule');
        inject(($injector, $controller) => {
            titleCtrl = $controller('titleCtrl');
            appActions = $injector.get('appActions');
        });
    });

    it('should use title from state', () => {
        appActions.setProductTitle('Silent Running');
        expect(titleCtrl.text).toBe('Silent Running');
    });
});
