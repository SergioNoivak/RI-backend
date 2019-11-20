import { Router } from '../../server/Router';
import * as express from 'express';

import { TratamentoKeyword } from '../../controllers/tratamentoDeErro/metodosDeTratamento/TratamentoLinguagem';
import * as fs from 'fs';
import { LimpadorDeDados } from '../../controllers/LimpadorDados';
import { LeitorDeArquivo } from '../../controllers/LeitorDeArquivo';
import { TratadorTF_IDF } from '../../controllers/TratadorTF-IDF';


class TesteRouter extends Router {

    applyRoutes(aplication: any) {
        aplication.get('/', function (req: express.Request, res: express.Response) {
            console.log(req.body);
            res.status(200);
            res.send({ "hello": "mundo" })
        });

        aplication.post('/avaliar-documento', async (req: express.Request, res: express.Response) => {

            console.log(req.body['documentos'])
            let leitor = new LeitorDeArquivo();
            let documentos = req.body['documentos'];
            for (let i = 0; i < /*documentos.length*/ 2; i++) {
            // let i = 0;
            let filename = documentos[i]
            await leitor.tatarTXT("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/transformados/" + filename, [], "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/metadata/" + filename)
        }
        await TratadorTF_IDF.calcularIDF("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json",2)
        for (let i = 0; i < /*documentos.length*/ 2; i++) {
                    
            let filename = documentos[i]
            await TratadorTF_IDF.calcularTF("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/metadata/"  + filename,"C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/tfs/"+filename,filename);

        }   


        });
        // aplication.post('/gerar-stopwords-das-linguagens', async (req: express.Request, res: express.Response) => {
        //     console.log(req.body);
        //     let leitor = new LeitorDeArquivo();
        //     await leitor.gerarStopWordsLinguagensDeProgramacao("C:/Users/sergi/Documents/IF GOIANO/recuperação da informação/trabalho final/code/src/const/keywords/key.txt");
        //     res.status(200);
        //     res.send({ "hello": "world" })
        // });



        aplication.post('/radicalizar', async (req: express.Request, res: express.Response) => {
            res.status(200);    
                console.log(LimpadorDeDados.radicalizar("necrofilia"));

            res.send({ "hello": "world" })
        });




    }
}
export const testeRouter = new TesteRouter()
