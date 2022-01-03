const { exit } = require('process');
const newman = require('C:/Users/lediez/AppData/Roaming/npm/node_modules/newman');
var code = "";
var results = [];


newman.run({
    collection: require('./pruebaCredito.postman_collection.json'),
    environment: './Sears.postman_environment.json',
    reporters: 'html',
    reporter: {
        html: {
            export: './newmanResults/resultsCreditoSears.html',
        }
    }
}, function (err, res) {
	if (err) { throw err; }
    console.log('collection Api Credito sears run complete!');
})
.on('request', function (err, args) {
    code = args.response.code;
    results = JSON.parse(args.response.stream.toString());
})
.on('done', function (err, args) {
    if(code == '200'){
        if(results[0].name == "LUIS E"){
            console.log("RESPUESTA EXITOSA");
        }
        else{
            console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; EL NOMBRE NO COINCIDE: " + results[0].name);
            process.abort();
        }
    }else{
        console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; CODIGO: " + code);
        process.abort();
    }
});