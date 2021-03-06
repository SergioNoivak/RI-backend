"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Router_1 = require("../../server/Router");
var fs = __importStar(require("fs"));
var LeitorDeArquivo_1 = require("../../controllers/LeitorDeArquivo");
var TratadorTF_IDF_1 = require("../../controllers/TratadorTF-IDF");
var TratadorSimilaridade_1 = require("../../controllers/TratadorSimilaridade");
var FileRouter = /** @class */ (function (_super) {
    __extends(FileRouter, _super);
    function FileRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileRouter.prototype.applyRoutes = function (aplication) {
        aplication.get("/linguagens-suportadas", function (req, res) {
            var files = fs.readdirSync("./C:/Users/sergi/Documents/IF GOIANO/recuperação da informação/trabalho final/code/src/const/keywords/keywords");
            res.status(200);
            res.send({ data: files });
        });
        aplication.get("/documentos-corpus", function (req, res) {
            var files = fs.readdirSync("C:/Users/Sergio Souza Novak/Documents/trabRec/artigos/transformados");
            files = files.filter(function (file) { return file.endsWith("txt"); });
            res.status(200);
            res.send({ data: files });
        });
        aplication.get("/id-processar-tokens", function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var files, leitor, i;
                return __generator(this, function (_a) {
                    files = fs.readdirSync("C:/Users/sergi/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos");
                    files = files.filter(function (file) { return file.endsWith("pdf"); });
                    leitor = new LeitorDeArquivo_1.LeitorDeArquivo();
                    for (i = 0; i < files.length; i++) {
                        console.log("fazendo ", files[i]);
                    }
                    res.status(200);
                    res.send({ data: files });
                    return [2 /*return*/];
                });
            });
        });
        aplication.post("/get-tf", function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var file;
                return __generator(this, function (_a) {
                    console.log(req.body["data"]);
                    file = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/tfs/A jornada do empreendedor - O heroi da nossa Era.txt.json");
                    res.status(200);
                    res.send({ data: file });
                    return [2 /*return*/];
                });
            });
        });
        aplication.post("/id-processar-tokens", function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log(req.body["documento"]);
                    res.status(200);
                    res.send({ data: "" });
                    return [2 /*return*/];
                });
            });
        });
        aplication.post("/fazer-consulta", function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var tokens, result, pesoQuery, categoria, nomesDeArquivos, jsonCategorias, arquivosEPesos, i, similaridade;
                return __generator(this, function (_a) {
                    console.log(req.body["data"]);
                    tokens = TratadorTF_IDF_1.TratadorTF_IDF.tratarQuery(req.body["data"]["queryString"]);
                    result = TratadorTF_IDF_1.TratadorTF_IDF.calcularIDFQuery(tokens);
                    pesoQuery = TratadorTF_IDF_1.TratadorTF_IDF.calcularPesoQuery(result);
                    categoria = req.body["data"]["categoria"];
                    if (categoria == "todos") {
                        nomesDeArquivos = fs.readdirSync("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/transformados");
                    }
                    else {
                        jsonCategorias = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/categorias/categoriaPorLivro.json");
                        if (jsonCategorias[categoria] != undefined) {
                            nomesDeArquivos = jsonCategorias[categoria];
                        }
                    }
                    arquivosEPesos = [];
                    for (i = 0; i < nomesDeArquivos.length; i++) {
                        similaridade = TratadorSimilaridade_1.TratadorSimilaridade.calcularSimilaridade("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/w/" +
                            nomesDeArquivos[i] +
                            ".json", pesoQuery);
                        arquivosEPesos.push({
                            arquivo: nomesDeArquivos[i],
                            similaridade: similaridade
                        });
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
                    return [2 /*return*/];
                });
            });
        });
        aplication.get("/ajustar-categorias", function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var livrosLabels, obj, key;
                return __generator(this, function (_a) {
                    livrosLabels = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/categorias/livroPorCategoria");
                    obj = {};
                    for (key in livrosLabels) {
                        console.log(livrosLabels[key]);
                        if (livrosLabels[key] != undefined) {
                            if (obj[livrosLabels[key]] == undefined)
                                obj[livrosLabels[key]] = [key];
                            else
                                obj[livrosLabels[key]].push(key);
                        }
                    }
                    console.log(obj);
                    fs.writeFileSync("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/categorias/categoriaPorLivro.json", JSON.stringify(obj));
                    res.status(200);
                    res.send({ data: obj });
                    return [2 /*return*/];
                });
            });
        });
        aplication.get("/estatisticas-categorias", function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var json;
                return __generator(this, function (_a) {
                    json = require("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/categorias/categoriaPorLivro.json");
                    res.status(200);
                    res.send({ data: json });
                    return [2 /*return*/];
                });
            });
        });
    };
    return FileRouter;
}(Router_1.Router));
exports.filesRouter = new FileRouter();
