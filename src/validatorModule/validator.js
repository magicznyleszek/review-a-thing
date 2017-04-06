// -----------------------------------------------------------------------------
// validator checks if given input matches the rules.
// -----------------------------------------------------------------------------

class ValidatorService {
    isNonEmptyString(string) {
        if (typeof string === 'string') {
            return string.trim().length > 0;
        } else {
            return false;
        }
    }

    isIntegerInRange(number, min, max) {
        if (Number.isInteger(number)) {
            return number >= min && number <= max;
        } else {
            return false;
        }
    }
}

angular.module('validatorModule').service('validator', ValidatorService);
