export class TratadorSimilaridade {
  static calcularSimilaridade(diretorioArquivo: string, pesoQuery: any) {
    let somaProduto = 0;
    let somaQuadradoDaQuery = 0;
    let somaQuadradoDoDocumento = 0;
    let wdocumento = require(diretorioArquivo);
    for (let key in pesoQuery) {
      if (pesoQuery[key] != undefined) {
        if (wdocumento[key] != undefined) {
          somaProduto += +wdocumento[key] * +pesoQuery[key];
          somaQuadradoDaQuery += +pesoQuery[key] * +pesoQuery[key];
          somaQuadradoDoDocumento += wdocumento[key] * wdocumento[key];
        }
      }
    }
    let conta = somaProduto/(Math.sqrt(somaQuadradoDaQuery)+Math.sqrt(somaQuadradoDoDocumento));
    return isNaN(conta)?0:conta;
  }
}
