export default function appScr(express, bodyParser, fs, crypto, http) {
    const app = express();
    const hu = {'Content-Type':'text/html; charset=utf-8'}
    const CORS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE',
      };
    let headers = {
        'Content-Type':'text/plain',
        ...CORS
    }
    return app
        .use(bodyParser.urlencoded({extended:true}))       
        .all('/login/', (req, res) => {
            res.set(headers)
            res.send('lenekke');
        })
        .all('/code/', (req, res) => {
            res.set(headers)
            fs.readFile(import.meta.url.substring(7),(err, data) => {
                if (err) throw err;
                res.end(data);
              });           
        })
        .all('/sha1/:input/', (req, res) => {
            res.set(headers)
            let shasum = crypto.createHash('sha1')
            res.send(shasum.update(req.params.input).digest('hex'))
        })
        .get('/req/', (req, res) =>{
            res.set(headers);
            let data = '';
            http.get(req.query.addr, async function(response) {
                await response.on('data',function (chunk){
                    data+=chunk;
                }).on('end',()=>{})
                res.send(data)
            })
        })
        .post('/req/', (req, res) =>{
            res.set(headers);
            let data = '';
            http.get(req.body.addr, async function(response) {
                await response.on('data',function (chunk){
                    data+=chunk;
                }).on('end',()=>{})
                res.send(data)
            })
        })
        .use(({res:r})=>r.status(404).set(hu).send('lenekke'))
}
