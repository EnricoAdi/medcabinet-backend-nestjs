"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toProperCase = (text) => {
    return text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};
exports.default = toProperCase;
//# sourceMappingURL=toProperCase.js.map