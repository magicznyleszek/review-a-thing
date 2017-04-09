describe('title', () => {
    // Note: title service is initialized by modules run function
    let reviewStore = null;
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
            reviewStore = $injector.get('reviewStore');
        });
    });

    it('should set title in state from url parameter', () => {
        const state = reviewStore.getState();
        expect(state.productTitle).toBe('Conan the Barbarian');
    });
});
