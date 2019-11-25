import { LimpadorDeDados } from "./LimpadorDados";
import * as fs from "fs";

export class LeitorDeArquivo {
  async tatarTXT(
    diretorioArquivo: string,
    tratamentos: any[],
    diretorioDeSalvamento: string,
    passo: number
  ) {
    let umavez = true;
    let maximaFrequencia = { elemento: "", frequencia: -1 };
    return new Promise((resolve, reject) => {
      let tabelaFrequencia = <any>{};
      var LineByLineReader = require("line-by-line"),
        lr = new LineByLineReader(diretorioArquivo);

      lr.on("line", function(line: string) {
        let string: string = "";
        let tokens = line.split(" ");
        tokens.forEach(token => {
          if (token != " " && token != "" && token.replace(/ /g, "") != "") {
            let newToken = LimpadorDeDados.tratar(token, tratamentos).replace(
              / /g,
              ""
            );
            if (newToken != "") {
              if (tabelaFrequencia[newToken] == undefined)
                tabelaFrequencia[newToken] = 1;
              else tabelaFrequencia[newToken]++;

              if (tabelaFrequencia[newToken] > maximaFrequencia["frequencia"]) {
                maximaFrequencia["elemento"] = newToken;
                maximaFrequencia["frequencia"] = tabelaFrequencia[newToken];
              }
            }

            string += " " + newToken;
          }
        });
        if (string.replace(/ /g, "") != "")
          fs.appendFileSync(diretorioDeSalvamento + ".txt", string + "/n");
        // console.log(tabelaFrequencia)
      });

      lr.on("end", function() {
        if (umavez) {
          fs.appendFileSync(
            diretorioDeSalvamento + ".json",
            JSON.stringify({
              tabelaFrequencia: tabelaFrequencia,
              maximaFrequencia: maximaFrequencia
            })
          );
          let tabelaGeral = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json");
          let jaContabilizado = false;
          for (let key in tabelaFrequencia) {
            if (tabelaFrequencia[key] != undefined) {
              if (tabelaGeral[key] == undefined) {
                tabelaGeral[key] = 1;
                jaContabilizado = true;
              } else {
                if (!jaContabilizado) tabelaGeral[key] = +tabelaGeral[key] + 1;
              }
            }
          }
          fs.writeFileSync(
            "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json",
            JSON.stringify(tabelaGeral)
          );
          umavez = false;
        }
        console.log("fazendo " + passo + "/129 da primeira etapa");
        resolve();
      });
    });
  }
  constructor() {}
}
