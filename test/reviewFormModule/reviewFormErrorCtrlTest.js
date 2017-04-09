describe('reviewFormErrorCtrl', () => {
    let reviewFormErrorCtrl = null;
    let reviewActions = null;

    beforeEach(() => {
        module('testAppModule');
        module('reviewFormModule');
        inject(($injector, $controller) => {
            reviewFormErrorCtrl = $controller('reviewFormErrorCtrl');
            reviewActions = $injector.get('reviewActions');
        });
    });

    it('should be visible if state property is true', () => {
        reviewActions.setFormError(true);
        expect(reviewFormErrorCtrl.isVisible).toBeTruthy();
    });

    it('should be hidden if state property is false', () => {
        reviewActions.setFormError(false);
        expect(reviewFormErrorCtrl.isVisible).toBeFalsy();
    });
});
