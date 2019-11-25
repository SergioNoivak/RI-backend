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
var LimpadorDados_1 = require("./LimpadorDados");
var fs = __importStar(require("fs"));
var LeitorDeArquivo = /** @class */ (function () {
    function LeitorDeArquivo() {
    }
    LeitorDeArquivo.prototype.tatarTXT = function (diretorioArquivo, tratamentos, diretorioDeSalvamento, passo) {
        return __awaiter(this, void 0, void 0, function () {
            var umavez, maximaFrequencia;
            return __generator(this, function (_a) {
                umavez = true;
                maximaFrequencia = { elemento: "", frequencia: -1 };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var tabelaFrequencia = {};
                        var LineByLineReader = require("line-by-line"), lr = new LineByLineReader(diretorioArquivo);
                        lr.on("line", function (line) {
                            var string = "";
                            var tokens = line.split(" ");
                            tokens.forEach(function (token) {
                                if (token != " " && token != "" && token.replace(/ /g, "") != "") {
                                    var newToken = LimpadorDados_1.LimpadorDeDados.tratar(token, tratamentos).replace(/ /g, "");
                                    if (newToken != "") {
                                        if (tabelaFrequencia[newToken] == undefined)
                                            tabelaFrequencia[newToken] = 1;
                                        else
                                            tabelaFrequencia[newToken]++;
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
                        lr.on("end", function () {
                            if (umavez) {
                                fs.appendFileSync(diretorioDeSalvamento + ".json", JSON.stringify({
                                    tabelaFrequencia: tabelaFrequencia,
                                    maximaFrequencia: maximaFrequencia
                                }));
                                var tabelaGeral = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json");
                                var jaContabilizado = false;
                                for (var key in tabelaFrequencia) {
                                    if (tabelaFrequencia[key] != undefined) {
                                        if (tabelaGeral[key] == undefined) {
                                            tabelaGeral[key] = 1;
                                            jaContabilizado = true;
                                        }
                                        else {
                                            if (!jaContabilizado)
                                                tabelaGeral[key] = +tabelaGeral[key] + 1;
                                        }
                                    }
                                }
                                fs.writeFileSync("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json", JSON.stringify(tabelaGeral));
                                umavez = false;
                            }
                            console.log("fazendo " + passo + "/129 da primeira etapa");
                            resolve();
                        });
                    })];
            });
        });
    };
    return LeitorDeArquivo;
}());
exports.LeitorDeArquivo = LeitorDeArquivo;
