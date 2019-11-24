import * as fs from 'fs';
import { LimpadorDeDados } from './LimpadorDados';
export class TratadorTF_IDF {

    static async calcularTF(diretorioArquivo: string, diretorioDeSalvamento: string, nomeDocumento: string, passo: number) {

        let idf = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json");

        return new Promise<any>((resolve, reject) => {
            try {

                let arquivoFrequencia = require(diretorioArquivo + ".json")
                let maximaFrequencia = +arquivoFrequencia["maximaFrequencia"]["frequencia"]
                let tf = <any>{}
                let w = <any>{}
                let tabelaFrequencia = arquivoFrequencia["tabelaFrequencia"];
                for (let key in tabelaFrequencia) {
                    if (tabelaFrequencia[key] != undefined) {
                        tf[key] = (+tabelaFrequencia[key]) / maximaFrequencia;
                        w[key] = (+tf[key]) * (+idf[key]);

                    }
                }

                fs.writeFileSync(diretorioDeSalvamento + ".json", JSON.stringify(tf));
                fs.writeFileSync("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/w/" + nomeDocumento + ".json", JSON.stringify(w));
                console.log("fazendo " + passo + "/129 da segunda etapa");

                resolve()
            } catch (error) {
                reject(error)
            }
        })


    }
    static async calcularIDF(diretorioArquivo: string, numeroDocumentos: number) {
        return new Promise<any>((resolve, reject) => {
            try {
                let arquivoNi = require(diretorioArquivo);

                for (let key in arquivoNi)
                    if (arquivoNi[key] != undefined)
                        arquivoNi[key] = Math.log10(numeroDocumentos / arquivoNi[key]);

                fs.writeFileSync(diretorioArquivo, JSON.stringify(arquivoNi));
                resolve();
            } catch (error) {
                reject(error)
            }
        })
    }



    static  tratarQuery(query: string) {

        let tokens = LimpadorDeDados.tokenizar(query);
        return tokens.map((token) => LimpadorDeDados.tratar(token, []))

    }

    static  calcularIDFQuery(tokens: string[]) {

        let idf_q = <any>{}
        let tabelaFrequencia = <any>{}
        let maximaFreq = <any>{"token":undefined, "frequencia":-1}
        let idf_geral = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json");
        tokens.forEach(token => {
            if (token != '') {
                if(tabelaFrequencia[token]==undefined){
                    tabelaFrequencia[token]=1;
                    if(tabelaFrequencia[token]>maximaFreq["frequencia"]){
                        maximaFreq["frequencia"] =tabelaFrequencia[token];
                        maximaFreq["token"] = token;
                    }

                }

                else {
                    tabelaFrequencia[token]=tabelaFrequencia[token]+1;
                    if(tabelaFrequencia[token]>maximaFreq["frequencia"]){
                        maximaFreq["frequencia"] =tabelaFrequencia[token];
                        maximaFreq["token"] = token;
                    }
                }

                if (idf_geral[token] == undefined)
                    idf_q[token] = 0;
                else
                    idf_q[token] = idf_geral[token]
            }
        })
        return {"idf_q":idf_q,"tabelaFrequencia":tabelaFrequencia,"maximaFreq":maximaFreq}


    }
    static calcularPesoQuery(result:any){
        let idf_q = result["idf_q"];
        console.log(result)
        let tabelaFrequenciaQuery =  result["tabelaFrequencia"];
        let maximaFrequenciaQuery = result["maximaFreq"];
        let maximaFrequencia:number = maximaFrequenciaQuery["frequencia"];
        console.log(maximaFrequencia)
        let wq = <any>{}
        for(let key in idf_q){
            if(idf_q[key]!=undefined){
                wq[key] = idf_q[key] *(0.5 + (0.5*tabelaFrequenciaQuery[key])/maximaFrequencia)
            }
        }    
       return wq
    }
    
    static fazerSimilaridade(w:any,d:any){

        


    }

}