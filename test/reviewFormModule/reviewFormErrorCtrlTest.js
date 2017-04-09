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
        appActions.setReviewError(true);
        expect(reviewFormErrorCtrl.isVisible).toBeTruthy();
    });

    it('should be hidden if state property is false', () => {
        appActions.setReviewError(false);
        expect(reviewFormErrorCtrl.isVisible).toBeFalsy();
    });
});
