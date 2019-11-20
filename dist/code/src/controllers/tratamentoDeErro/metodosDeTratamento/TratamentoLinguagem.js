"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MetodoDeTratamento_1 = require("../MetodoDeTratamento");
var TratamentoKeyword = /** @class */ (function (_super) {
    __extends(TratamentoKeyword, _super);
    function TratamentoKeyword(linguagem) {
        var _this = _super.call(this) || this;
        _this.validador = {};
        try {
            _this.validador = require('C:/Users/sergi/Documents/IF GOIANO/recuperação da informação/trabalho final/code/src/const/keywords/keywords/' + linguagem + '.json');
        }
        catch (e) {
            _this.validador = {};
        }
        return _this;
    }
    TratamentoKeyword.prototype.aplicar = function (token) {
        try {
            var retorno = this.validador[token] ? "" : token;
            return retorno;
        }
        catch (e) {
            return token;
        }
    };
    return TratamentoKeyword;
}(MetodoDeTratamento_1.TratamentoDeErro));
exports.TratamentoKeyword = TratamentoKeyword;
