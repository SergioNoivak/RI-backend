import * as fs from 'fs';
export class TratadorTF_IDF{

    static async calcularTF(diretorioArquivo: string ,diretorioDeSalvamento: string,nomeDocumento:string) {
            
            let idf = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json");
            
            return new Promise<any>((resolve,reject)=>
            {
                try {
                    
                    let arquivoFrequencia = require(diretorioArquivo+".json")
                    let maximaFrequencia = +arquivoFrequencia["maximaFrequencia"]["frequencia"]
                    let tf = <any>{}
                    let w = <any>{}
                    let tabelaFrequencia = arquivoFrequencia["tabelaFrequencia"];
                    for(let key in tabelaFrequencia){
                        if(tabelaFrequencia[key]!=undefined){
                            tf[key] = (+tabelaFrequencia[key])/maximaFrequencia;
                            w[key] =  (+tf[key]) * (+idf[key]);

                        }
                    }
                    
                    fs.writeFileSync(diretorioDeSalvamento+".json", JSON.stringify(tf));
                    fs.writeFileSync("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/w/"+nomeDocumento+".json", JSON.stringify(w));

                    resolve()   
                } catch (error) {
                    reject(error)
                }
                })
                
    
    }
    static async calcularIDF(diretorioArquivo: string ,numeroDocumentos:number) {
        return new Promise<any>((resolve,reject)=>
        {
            try {
            let arquivoNi= require(diretorioArquivo);

            for(let key in arquivoNi)
                if(arquivoNi[key]!=undefined)
                    arquivoNi[key] = Math.log10( numeroDocumentos/arquivoNi[key]);
                
            fs.writeFileSync(diretorioArquivo, JSON.stringify(arquivoNi));
            resolve();
        } catch (error) {
            reject(error)
        }
        })
    }



}