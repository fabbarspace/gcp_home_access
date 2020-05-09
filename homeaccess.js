/* Setamos a requisição que valida o IP público */
const request = require('request');
const url = `http://ip-api.com/json`;
/* Fazemos a authenticação através de uma conta de serviço */
const Compute = require('@google-cloud/compute');
const projectId = 'flbarros'
const keyFilename = 'homeaccess-firewallrule.json'
const compute = new Compute({projectId, keyFilename});
const firewall = compute.firewall('homeaccess');

/*  Consulta o IP público da máquina */
request(url, function (err, response, body) {
    if(err){
        console.log('error:', err);
    } else {
        /*  Pega as informações de IP */
        let ipInfo = JSON.parse(body);
        const ip = `${ipInfo.query}/32`
        //console.log(ipInfo);

        /*  Seta o IP no METADATA */
        const metadata = {
            sourceRanges: ip
        };
        
        /*  Atualiza a regra de firewall com o novo IP */
        firewall.setMetadata(metadata)
    }
});

/* Consulta a regra de firewall */
firewall.getMetadata().then(function(data) {
    const metadata = data[0];
    //const apiResponse = data[1];
    console.log(metadata);
});
