"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TratadorSimilaridade = /** @class */ (function () {
    function TratadorSimilaridade() {
    }
    TratadorSimilaridade.calcularSimilaridade = function (diretorioArquivo, pesoQuery) {
        var somaProduto = 0;
        var somaQuadradoDaQuery = 0;
        var somaQuadradoDoDocumento = 0;
        var wdocumento = require(diretorioArquivo);
        for (var key in pesoQuery) {
            if (pesoQuery[key] != undefined) {
                if (wdocumento[key] != undefined) {
                    somaProduto += +wdocumento[key] * +pesoQuery[key];
                    somaQuadradoDaQuery += +pesoQuery[key] * +pesoQuery[key];
                    somaQuadradoDoDocumento += wdocumento[key] * wdocumento[key];
                }
            }
        }
        var conta = somaProduto / (Math.sqrt(somaQuadradoDaQuery) + Math.sqrt(somaQuadradoDoDocumento));
        return isNaN(conta) ? 0 : conta;
    };
    return TratadorSimilaridade;
}());
exports.TratadorSimilaridade = TratadorSimilaridade;
