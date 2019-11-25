"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var LimpadorDados_1 = require("./LimpadorDados");
var TratadorTF_IDF = /** @class */ (function () {
    function TratadorTF_IDF() {
    }
    TratadorTF_IDF.calcularTF = function (diretorioArquivo, diretorioDeSalvamento, nomeDocumento, passo) {
        return __awaiter(this, void 0, void 0, function () {
            var idf;
            return __generator(this, function (_a) {
                idf = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json");
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            var arquivoFrequencia = require(diretorioArquivo + ".json");
                            var maximaFrequencia = +arquivoFrequencia["maximaFrequencia"]["frequencia"];
                            var tf = {};
                            var w = {};
                            var tabelaFrequencia = arquivoFrequencia["tabelaFrequencia"];
                            for (var key in tabelaFrequencia) {
                                if (tabelaFrequencia[key] != undefined) {
                                    tf[key] = (+tabelaFrequencia[key]) / maximaFrequencia;
                                    w[key] = (+tf[key]) * (+idf[key]);
                                }
                            }
                            fs.writeFileSync(diretorioDeSalvamento + ".json", JSON.stringify(tf));
                            fs.writeFileSync("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/w/" + nomeDocumento + ".json", JSON.stringify(w));
                            console.log("fazendo " + passo + "/129 da segunda etapa");
                            resolve();
                        }
                        catch (error) {
                            reject(error);
                        }
                    })];
            });
        });
    };
    TratadorTF_IDF.calcularIDF = function (diretorioArquivo, numeroDocumentos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            var arquivoNi = require(diretorioArquivo);
                            for (var key in arquivoNi)
                                if (arquivoNi[key] != undefined)
                                    arquivoNi[key] = Math.log10(numeroDocumentos / arquivoNi[key]);
                            fs.writeFileSync(diretorioArquivo, JSON.stringify(arquivoNi));
                            resolve();
                        }
                        catch (error) {
                            reject(error);
                        }
                    })];
            });
        });
    };
    TratadorTF_IDF.tratarQuery = function (query) {
        var tokens = LimpadorDados_1.LimpadorDeDados.tokenizar(query);
        return tokens.map(function (token) { return LimpadorDados_1.LimpadorDeDados.tratar(token, []); });
    };
    TratadorTF_IDF.calcularIDFQuery = function (tokens) {
        var idf_q = {};
        var tabelaFrequencia = {};
        var maximaFreq = { "token": undefined, "frequencia": -1 };
        var idf_geral = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json");
        tokens.forEach(function (token) {
            if (token != '') {
                if (tabelaFrequencia[token] == undefined) {
                    tabelaFrequencia[token] = 1;
                    if (tabelaFrequencia[token] > maximaFreq["frequencia"]) {
                        maximaFreq["frequencia"] = tabelaFrequencia[token];
                        maximaFreq["token"] = token;
                    }
                }
                else {
                    tabelaFrequencia[token] = tabelaFrequencia[token] + 1;
                    if (tabelaFrequencia[token] > maximaFreq["frequencia"]) {
                        maximaFreq["frequencia"] = tabelaFrequencia[token];
                        maximaFreq["token"] = token;
                    }
                }
                if (idf_geral[token] == undefined)
                    idf_q[token] = 0;
                else
                    idf_q[token] = idf_geral[token];
            }
        });
        return { "idf_q": idf_q, "tabelaFrequencia": tabelaFrequencia, "maximaFreq": maximaFreq };
    };
    TratadorTF_IDF.calcularPesoQuery = function (result) {
        var idf_q = result["idf_q"];
        var tabelaFrequenciaQuery = result["tabelaFrequencia"];
        var maximaFrequenciaQuery = result["maximaFreq"];
        var maximaFrequencia = maximaFrequenciaQuery["frequencia"];
        var wq = {};
        for (var key in idf_q) {
            if (idf_q[key] != undefined) {
                wq[key] = idf_q[key] * (0.5 + (0.5 * tabelaFrequenciaQuery[key]) / maximaFrequencia);
            }
        }
        return wq;
    };
    TratadorTF_IDF.fazerSimilaridade = function (w, d) {
    };
    return TratadorTF_IDF;
}());
exports.TratadorTF_IDF = TratadorTF_IDF;
