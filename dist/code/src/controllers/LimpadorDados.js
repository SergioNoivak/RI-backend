"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sulfixos = __importStar(require("../../../artigos/base radical/sulfixo"));
var LimpadorDeDados = /** @class */ (function () {
    function LimpadorDeDados() {
    }
    LimpadorDeDados.removerHifem = function (valor, flag) {
        valor = valor.replace(/[0-9]/g, '');
        valor = valor.replace(/[`•“”~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
        valor = valor.replace(/[©°]/gi, ' ');
        if (valor == '') {
            return { "texto": "", flag: flag };
        }
        else {
            if (flag) {
                return { "texto": "" + valor.replace(/[`-]/gi, ''), flag: false };
            }
            else {
                return { "texto": " " + valor.replace(/[`-]/gi, ''), flag: flag };
            }
        }
    };
    LimpadorDeDados.tokenizar = function (linha) {
        return linha.split(" ");
    };
    LimpadorDeDados.tratar = function (token, tratamentos) {
        for (var i = 0; i < tratamentos.length; i++) {
            token = tratamentos[i].aplicar(token);
        }
        return this.radicalizar(this.delimitarMinimoCaracteres(this.removerAcentos(this.extrairPontuacao(token))));
    };
    LimpadorDeDados.removerAcentos = function (token) {
        return token.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };
    LimpadorDeDados.extrairPontuacao = function (token) {
        return token.replace(/\d+/g, '')
            .replace(/[`º•“”~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            .replace(/[©°]/gi, '')
            .replace(/[`-]/gi, '')
            .toLowerCase();
    };
    LimpadorDeDados.delimitarMinimoCaracteres = function (token) {
        return token.length > 3 ? token : "";
    };
    LimpadorDeDados.radicalizar = function (token) {
        for (var indiceSulfixo in sulfixos.sulfixos) {
            if (token.endsWith(sulfixos.sulfixos[indiceSulfixo])) {
                return token.substr(0, token.length - sulfixos.sulfixos[indiceSulfixo].length);
            }
        }
        return token;
    };
    return LimpadorDeDados;
}());
exports.LimpadorDeDados = LimpadorDeDados;
