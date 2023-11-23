"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUnallowedFields = exports.validateEntity = void 0;
const class_validator_1 = require("class-validator");
const validateEntity = (entity, data) => __awaiter(void 0, void 0, void 0, function* () {
    Object.assign(entity, data);
    const errors = yield (0, class_validator_1.validate)(entity);
    if (errors.length > 0) {
        return errors.map(err => {
            const message = err.constraints
                ? Object.values(err.constraints).join(', ').replace(/_/g, ' ')
                : 'Validation error';
            return {
                field: err.property,
                message
            };
        });
    }
    return [];
});
exports.validateEntity = validateEntity;
const hasUnallowedFields = (body, allowedFields) => {
    return Object.keys(body).some(key => !allowedFields.includes(key));
};
exports.hasUnallowedFields = hasUnallowedFields;
