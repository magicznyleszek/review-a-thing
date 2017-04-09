describe('reviewFormErrorCtrl', () => {
    let reviewFormErrorCtrl = null;
    let appActions = null;

    beforeEach(() => {
        module('testAppModule');
        module('reviewFormModule');
        inject(($injector, $controller) => {
            reviewFormErrorCtrl = $controller('reviewFormErrorCtrl');
            appActions = $injector.get('appActions');
        });
    });

    it('should be visible if state property is true', () => {
        appActions.setFormError(true);
        expect(reviewFormErrorCtrl.isVisible).toBeTruthy();
    });

    it('should be hidden if state property is false', () => {
        appActions.setFormError(false);
        expect(reviewFormErrorCtrl.isVisible).toBeFalsy();
    });
});
