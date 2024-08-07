const checkUrl = (req, res, next) => {

    const linguaFallback='it';
    if (req.originalUrl === '/') {
        // se non è definita nell'url nessuna lingua (siamo quindi in root) 
        // vai a cercare il browser e se il browser non è in una delle lingue supportate
        // scegli la lingua di fallback
        // orginalUrl,  riporta l'url completo PRIMA del match route in proxera.js
        // url, in questo caso, riportebbe solo ciò che è DOPO /{lingua}
        const lingue = req.acceptsLanguages('it', 'en');
        if (lingue) { global.lang = lingue; } 
        else { global.lang = linguaFallback; }
    } else {
        // se invece nell'url è definita la lingua estrapola e usala
        var match = req.originalUrl.match(/^\/([A-Z]{2})([\/\?].*)?$/i);
        if (match) {
            global.lang=match[1];
        }
    }
    /* Redirect http => https */
    if (req.get('X-Forwarded-Proto') === 'http' && process.env.NODE_ENV === "production") {
        if (!req.headers.host.startsWith('www.') && process.env.NODE_ENV === "production") {
            res.redirect(301, `https://www.${req.headers.host}${req.originalUrl}`);
        } else {
            res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
        }
      }
    /* Redirect non www to www  */
    if (!req.headers.host.startsWith('www.') && process.env.NODE_ENV === "production") {
        res.redirect(301, `https://www.${req.headers.host}${req.originalUrl}`);
    }
    next();
};

module.exports = { checkUrl };