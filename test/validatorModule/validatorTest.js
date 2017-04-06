describe('validator', () => {
    let validator = null;

    beforeEach(() => {
        module('testAppModule');
        module('validatorModule');
        inject(($injector) => {
            validator = $injector.get('validator');
        });
    });

    describe('isNonEmptyString', () => {
        const goodStrings = [
            '1',
            'foo+bar=fum-baz',
            '303 + 808 = 1337',
            'qwerty',
            'Blade Runner'
        ];

        for (const goodString of goodStrings) {
            it(`should be true for good string: "${goodString}"`, () => {
                expect(validator.isNonEmptyString(goodString)).toBeTruthy();
            });
        }

        const badStrings = [
            '',
            ' ',
            '     ',
            1,
            {hello: 'World!'},
            ['trust me, I\'m a string'],
            null
        ];

        for (const badString of badStrings) {
            it(`should be false for bad string: "${badString}"`, () => {
                expect(validator.isNonEmptyString(badString)).toBeFalsy();
            });
        }
    });

    describe('isIntegerInRange', () => {
        const goodCases = [
            [0, -3, 3],
            [133, 89, 34567],
            [2, 1, 3],
            [11, 10, 12],
            [-3, -3, 3],
            [89, 89, 34567],
            [3, 1, 3],
            [12, 10, 12]
        ];

        for (const good of goodCases) {
            it(`should be true for good case: "${good}"`, () => {
                expect(
                    validator.isIntegerInRange(good[0], good[1], good[2])
                ).toBeTruthy();
            });
        }

        const badCases = [
            [-6, -3, 3],
            [88, 89, 34567],
            [0, 1, 3],
            [9, 10, 12],
            [4, -3, 3],
            [34568, 89, 34567],
            [4, 1, 3],
            [13, 10, 12],
            ['one', 0, 1],
            ['0.5', 0, 1],
            [{1: true}, 0, 1],
            [5, 0, 1],
            [5, 10, 1]
        ];

        for (const bad of badCases) {
            it(`should be false for bad case: "${bad}"`, () => {
                expect(
                    validator.isIntegerInRange(bad[0], bad[1], bad[2])
                ).toBeFalsy();
            });
        }
    });
});
