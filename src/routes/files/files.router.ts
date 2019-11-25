import { Router } from "../../server/Router";
import * as express from "express";
import { TratamentoKeyword } from "../../controllers/tratamentoDeErro/metodosDeTratamento/TratamentoLinguagem";
import * as fs from "fs";
import { LeitorDeArquivo } from "../../controllers/LeitorDeArquivo";
import { LimpadorDeDados } from "../../controllers/LimpadorDados";
import { TratadorTF_IDF } from "../../controllers/TratadorTF-IDF";
import { TratadorSimilaridade } from '../../controllers/TratadorSimilaridade';

class FileRouter extends Router {
  applyRoutes(aplication: any) {
    aplication.get("/linguagens-suportadas", function(
      req: express.Request,
      res: express.Response
    ) {
      var files = fs.readdirSync(
        "./C:/Users/sergi/Documents/IF GOIANO/recuperação da informação/trabalho final/code/src/const/keywords/keywords"
      );
      res.status(200);
      res.send({ data: files });
    });

    aplication.get("/documentos-corpus", function(
      req: express.Request,
      res: express.Response
    ) {
      var files = fs.readdirSync(
        "C:/Users/Sergio Souza Novak/Documents/trabRec/artigos/transformados"
      );
      files = files.filter(file => file.endsWith("txt"));
      res.status(200);
      res.send({ data: files });
    });

    aplication.get("/id-processar-tokens", async function(
      req: express.Request,
      res: express.Response
    ) {
      var files = fs.readdirSync(
        "C:/Users/sergi/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos"
      );
      files = files.filter(file => file.endsWith("pdf"));
      let leitor = new LeitorDeArquivo();
      for (let i = 0; i < files.length; i++) {
        console.log("fazendo ", files[i]);
      }
      res.status(200);
      res.send({ data: files });
    });

    aplication.post("/get-tf", async function(
      req: express.Request,
      res: express.Response
    ) {
      console.log(req.body["data"]);
      var file = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/tfs/A jornada do empreendedor - O heroi da nossa Era.txt.json");
      res.status(200);
      res.send({ data: file });
    });

    aplication.post("/id-processar-tokens", async function(
      req: express.Request,
      res: express.Response
    ) {
      console.log(req.body["documento"]);

      res.status(200);
      res.send({ data: "" });
    });

    aplication.post("/fazer-consulta", async function(
      req: express.Request,
      res: express.Response
    ) {
      console.log(req.body["data"]);

        if(req.body["data"]["categoria"]=="todos"){

            let tokens = TratadorTF_IDF.tratarQuery(req.body["data"]['queryString']);
            let result = TratadorTF_IDF.calcularIDFQuery(tokens);
            let pesoQuery = TratadorTF_IDF.calcularPesoQuery(result);
            let nomesDeArquivos = fs.readdirSync(
                "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/transformados"
                );
            let arquivosEPesos = []

            for(let i= 0; i<nomesDeArquivos.length;i++){
                let similaridade  = TratadorSimilaridade.calcularSimilaridade("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/w/"+nomesDeArquivos[i]+".json",pesoQuery)
                arquivosEPesos.push({"arquivo":nomesDeArquivos[i],"similaridade":similaridade})
            }


            arquivosEPesos.sort(function (a, b) {
            if (a.similaridade > b.similaridade) {
                return -1;
            }
            if (b.similaridade > a.similaridade) {
                return 1;
            }
            return 0;
        });

        res.status(200);
        res.send({ data: arquivosEPesos });
        return;
        
            }

      res.status(200);
      res.send({ data: "" });
    });

    aplication.get("/ajustar-categorias", async function(
      req: express.Request,
      res: express.Response
    ) {
      let livrosLabels = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/categorias/livroPorCategoria");
      let obj = <any>{};
      for (let key in livrosLabels) {
        console.log(livrosLabels[key]);
        if (livrosLabels[key] != undefined) {
          if (obj[livrosLabels[key]] == undefined)
            obj[livrosLabels[key]] = [key];
          else obj[livrosLabels[key]].push(key);
        }
      }
      console.log(obj);
      fs.writeFileSync(
        "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/categorias/categoriaPorLivro.json",
        JSON.stringify(obj)
      );
      res.status(200);
      res.send({ data: obj });
    });

    aplication.get("/estatisticas-categorias", async function(   
      req: express.Request,
      res: express.Response
    ) {
      let json = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/categorias/categoriaPorLivro.json");
      res.status(200);
      res.send({ data: json });
    });
  }
}

export const filesRouter = new FileRouter();
