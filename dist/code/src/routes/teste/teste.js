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
Object.defineProperty(exports, "__esModule", { value: true });
var Router_1 = require("../../server/Router");
var LimpadorDados_1 = require("../../controllers/LimpadorDados");
var LeitorDeArquivo_1 = require("../../controllers/LeitorDeArquivo");
var TratadorTF_IDF_1 = require("../../controllers/TratadorTF-IDF");
var TesteRouter = /** @class */ (function (_super) {
    __extends(TesteRouter, _super);
    function TesteRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TesteRouter.prototype.applyRoutes = function (aplication) {
        var _this = this;
        aplication.get('/', function (req, res) {
            console.log(req.body);
            res.status(200);
            res.send({ "hello": "mundo" });
        });
        aplication.post('/avaliar-documento', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var leitor, documentos, i, filename, i, filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.body['documentos']);
                        leitor = new LeitorDeArquivo_1.LeitorDeArquivo();
                        documentos = req.body['documentos'];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < documentos.length)) return [3 /*break*/, 4];
                        filename = documentos[i];
                        return [4 /*yield*/, leitor.tatarTXT("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/transformados/" + filename, [], "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/metadata/" + filename, i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, TratadorTF_IDF_1.TratadorTF_IDF.calcularIDF("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/ifd/tabelaGeral.json", documentos.length)];
                    case 5:
                        _a.sent();
                        i = 0;
                        _a.label = 6;
                    case 6:
                        if (!(i < documentos.length)) return [3 /*break*/, 9];
                        filename = documentos[i];
                        return [4 /*yield*/, TratadorTF_IDF_1.TratadorTF_IDF.calcularTF("C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/metadata/" + filename, "C:/Users/Sergio Souza Novak/Documents/IF GOIANO/recuperação da informação/trabalho final/artigos/tfs/" + filename, filename, i)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
        // aplication.post('/gerar-stopwords-das-linguagens', async (req: express.Request, res: express.Response) => {
        //     console.log(req.body);
        //     let leitor = new LeitorDeArquivo();
        //     await leitor.gerarStopWordsLinguagensDeProgramacao("C:/Users/sergi/Documents/IF GOIANO/recuperação da informação/trabalho final/code/src/const/keywords/key.txt");
        //     res.status(200);
        //     res.send({ "hello": "world" })
        // });
        aplication.post('/radicalizar', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.status(200);
                console.log(LimpadorDados_1.LimpadorDeDados.radicalizar("necrofilia"));
                res.send({ "hello": "world" });
                return [2 /*return*/];
            });
        }); });
    };
    return TesteRouter;
}(Router_1.Router));
exports.testeRouter = new TesteRouter();
