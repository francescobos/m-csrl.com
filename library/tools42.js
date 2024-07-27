const db = require('better-sqlite3')('./data/datiDb.db');
const { indexOf } = require('lodash');
const { URL } = require('url');

function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //  DEBUG -- Se mi serve simulare un problema di validazione della mail lato server. Passa JS client ma qui si blocca //
    //var mailformat = "CIU";
    if(inputText.match(mailformat)) {
        return true;
    }
    else {
        return false;
    }
  } 
  
  
  function ValidateFields(nome, telefono, messaggio, condizioni) {
    if (nome=="" || telefono=="" ) {
        return false;
    } else if (!condizioni) {
        return false;
    } else {
        return true;
    }
  }

  function ValidateNomeTelefono(nome, telefono, condizioni) {
    if (nome=="" || telefono=="" ) {
        return false;
    } else if (!condizioni) {
        return false;
    } else {
        return true;
    }
  }

  function getDateTime(data) {

    //var date = new Date(1641491248985);
    // con il timestamp elabora quello, senza elabora il momento corrente
    
    var date = new Date();
    if (data != undefined) date = new Date(data)
  
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
  
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
  
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
  
    var year = date.getFullYear();
  
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
  
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
  
    return day + "/" + month + "/" + year + " alle " + hour + ":" + min;
  
  }

function trimLastSlash (pathname) {
    // serve a normalizzare gli url sia che abbiamo parametri che non li abbiano
    if (pathname.charAt(pathname.length - 1) == '/') {
        return pathname.substr(0, pathname.length - 1);
      } else {
          return pathname
      }
  }

function avoid404(indirizzo, dataStorage="db" ) {
    
    const myURL = new URL(indirizzo)
    // questo permette di vedere i vari elementi del'oggetto
    //console.log(myURL)

    if (dataStorage === "db") {
        const row = db.prepare(`SELECT * FROM "301redirect" WHERE sorgente = ?`).get(trimLastSlash(myURL.pathname));

        if (row != undefined) { 
            if (myURL.search != '') {
                return row.destinazione + '/' + myURL.search;
            }
            return row.destinazione;
        }
    } else if (dataStorage==="json") {
        const redirects = require('../data/Redirect301/Recirect301.json');
        
        for (i=0; i<redirects.length; i++){

            if (redirects[i].sorgente == myURL.pathname){
                if (myURL.search != '') {
                    return redirects[i].destinazione + '/' + myURL.search;
                } else {
                    return redirects[i].destinazione;
                }
            }
        } 
    }

}

const generateMeta = (meta) => {
    
    output=`
    <link rel="canonical" href="${meta.canonical}" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:type" content="${meta.type}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${meta.image}" />
    <meta property="og:locale" content="${meta.locale}" />
    <meta property="og:site_name" content="${meta.sitename}" />     

    <meta name="keywords" content="${meta.keywords}" />
    <meta name="description" content="${meta.description}">
    <title>${meta.title}</title>
    `;
    return (output);
}


  module.exports = { 
    ValidateEmail,
    ValidateFields,
    getDateTime,
    ValidateNomeTelefono,
    avoid404, 
    generateMeta
}