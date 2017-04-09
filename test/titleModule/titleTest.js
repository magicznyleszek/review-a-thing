describe('title', () => {
    // Note: title service is initialized by modules run function
    let appStore = null;
    const urlParamsMock = {
        getParam(paramName) {
            if (paramName === 'product') {
                return 'Conan the Barbarian';
            } else {
                return null;
            }
        }
    };

    beforeEach(() => {
        module('testAppModule');
        module('titleModule');
        module(($provide) => {
            $provide.value('urlParams', urlParamsMock);
        });
        inject(($injector) => {
            appStore = $injector.get('appStore');
        });
    });

    it('should set title in state from url parameter', () => {
        const state = appStore.getState();
        expect(state.productTitle).toBe('Conan the Barbarian');
    });
});
