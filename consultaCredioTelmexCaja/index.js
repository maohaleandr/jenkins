const { exit } = require('process');
const newman = require('C:/Users/ksolis/AppData/Roaming/npm/node_modules/newman');
var code = "";
var results = [];

newman.run({
    collection: require('./creditoTelmex.postman_collection.json'),
    environment: './claroshop.postman_environment.json',
    reporters: 'html',
    reporter: {
        html: {
            export: './newmanResults/resultsCreditoTelmex.html',
        }
    }
},function(err, res){
    if (err) { throw err;}
    console.log('collection Api Credito Telmex Caja run complete!');
})
.on('request', function (err, args) {
    code = args.response.code;
    results = JSON.parse(args.response.stream.toString());
})
.on('done', function (err, args) {
    if(code == '200'){
        if(results.status == true){
            console.log("RESPUESTA EXITOSA");
        }
        else{
            console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; status: " + results.status);
            process.abort();
        }
    }else{
        console.log("---LA RESPUESTA DEL REQUEST NO ES LA ESPERADA; CODIGO: " + code);
        process.abort();
    }
});
