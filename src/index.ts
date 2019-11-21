

import { Server } from './server/Server';
import { filesRouter } from './routes/files/files.router';
import { TratamentoKeyword } from './controllers/tratamentoDeErro/metodosDeTratamento/TratamentoLinguagem';
import * as fs from 'fs';
import { testeRouter } from './routes/teste/teste';
import * as express from 'express';
import { LeitorDeArquivo } from './controllers/LeitorDeArquivo';
import { TratadorTF_IDF } from './controllers/TratadorTF-IDF';



let server:Server = new Server()
server.bootstrap([
        testeRouter,
        filesRouter,



]).then(()=> {

}).catch(() => {


});

