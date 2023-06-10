"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_validator_1 = require("../src/input-validator");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('Input Validator -- BucketName', () => {
    const validator = new input_validator_1.InputValidator();
    (0, globals_1.it)('should say a valid bucket name is valid', () => {
        (0, globals_1.expect)(validator.isValidBucketName('my-bucket')).toBeTruthy();
        (0, globals_1.expect)(validator.isValidBucketName('mybucket')).toBeTruthy();
        (0, globals_1.expect)(validator.isValidBucketName('0123456789012mybucket')).toBeTruthy();
        (0, globals_1.expect)(validator.isValidBucketName('mybucket0123456789012')).toBeTruthy();
        (0, globals_1.expect)(validator.isValidBucketName('mybucket.mybucket0123485638')).toBeTruthy();
    });
    // From https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
    (0, globals_1.it)('should say a bucket name starting with xn-- is invalid', () => {
        (0, globals_1.expect)(validator.isValidBucketName('xn--mybucket')).toBeFalsy();
    });
    (0, globals_1.it)('should say a bucket name ending with -s3alias is invalid', () => {
        (0, globals_1.expect)(validator.isValidBucketName('mybucket-s3alias')).toBeFalsy();
    });
    (0, globals_1.it)('should say a bucket name cannot end or start with a . is invalid', () => {
        (0, globals_1.expect)(validator.isValidBucketName('mybucket.')).toBeFalsy();
        (0, globals_1.expect)(validator.isValidBucketName('.mybucket')).toBeFalsy();
    });
    (0, globals_1.it)('should say a bucket name cannot contain two adjacent periods is invalid', () => {
        (0, globals_1.expect)(validator.isValidBucketName('mybucket..')).toBeFalsy();
        (0, globals_1.expect)(validator.isValidBucketName('..mybucket')).toBeFalsy();
    });
    (0, globals_1.it)('should say a bucket name cannot contain symbols other than . is invalid', () => {
        (0, globals_1.expect)(validator.isValidBucketName('my&bucket')).toBeFalsy();
    });
    (0, globals_1.it)('should say a bucket name cannot end with --ol-s3', () => {
        (0, globals_1.expect)(validator.isValidBucketName('mybucket--ol-s3')).toBeFalsy();
    });
});
(0, globals_1.describe)('InputValidator -- Generic Input', () => {
    const validator = new input_validator_1.InputValidator();
    (0, globals_1.it)('should say generic input is valid if it is a full sentence', () => {
        (0, globals_1.expect)(validator.isValidGenericInput('The quick brown fox jumps over the lazy dog is an English-language pangram — a sentence that contains all the letters of the alphabet.')).toBeTruthy();
    });
    (0, globals_1.it)('should say generic input is valid if it contains !@#$%^&*()', () => {
        (0, globals_1.expect)(validator.isValidGenericInput('!T@he# qui$ck bro%wn fox ^jumps o&ver the* lazy (dog is an English-0language pangram — a sentence that contains all the letters of the alphabet.')).toBeTruthy();
    });
});
