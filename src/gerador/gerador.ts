import { LeitorDeArquivo } from "../controllers/LeitorDeArquivo";
import * as fs from "fs";
import { TratadorTF_IDF } from "../controllers/TratadorTF-IDF";

export class Gerador {
  static async calcularVetorDeDocumentos() {
    let req = <any>{
      body: {
        documentos: fs.readdirSync(
          "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/transformados"
        )
      }
    };

    console.log(req.body["documentos"]);
    let leitor = new LeitorDeArquivo();
    let documentos = req.body["documentos"];
    for (let i = 0; i < documentos.length; i++) {
      // let i = 0;
      let filename = documentos[i];
      await leitor.tatarTXT(
        "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/transformados/" +
          filename,
        [],
        "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/metadata/" +
          filename,
        i
      );
    }
    await TratadorTF_IDF.calcularIDF(
      "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json",
      documentos.length
    );
    for (let i = 0; i < documentos.length; i++) {
      let filename = documentos[i];
      await TratadorTF_IDF.calcularTF(
        "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/metadata/" +
          filename,
        "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/tfs/" +
          filename,
        filename,
        i
      );
    }
  }
}
