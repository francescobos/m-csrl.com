/* Funzioni validazione */
function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(inputText.match(mailformat)) { return true }
    else { return false }
}   

function ValidateFields(azienda, nome, telefono) {
    if (nome=="" || telefono=="" || azienda=="") { return false; } 
    else { return true }
}

bottoneInvio=document.querySelector('#bottoneInvio');
aziendaCampo=document.querySelector('#azienda');
nomeCampo=document.querySelector('#nome');
telefonoCampo=document.querySelector('#telefono');
emailCampo=document.querySelector('#email');
messaggioCampo=document.querySelector('#messaggio');
langCampo=document.querySelector('#lang');
areaMessaggiGreen=document.querySelector('#areaMessaggiGreen');
areaMessaggiRed=document.querySelector('#areaMessaggiRed');

bottoneInvio.addEventListener('click', (e) => {
    e.preventDefault();
    azienda=aziendaCampo.value;
    nome=nomeCampo.value;
    telefono=telefonoCampo.value;
    email=emailCampo.value;
    messaggio=messaggioCampo.value;
    lang=langCampo.value;
    areaMessaggiRed.classList.remove('d-none');
    areaMessaggiRed.classList.add('d-none');

    formValidato=false;

    if (ValidateEmail(email) && ValidateFields(azienda, nome, telefono)) {formValidato=true}
    else {
        areaMessaggiRed.classList.remove('d-none');
        areaMessaggiRed.innerText="E' necessario compilare correttamente i campi";
    }

    if (formValidato) {
        bottoneInvio.value="Invio in corso...";
        fetch(`/${lang}/invio-messaggio`,{
            method: 'POST',
            headers:{
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
            },
            body:JSON.stringify({azienda, nome, telefono, email, messaggio})
            })
            .then(res => res.json()).then(data => { 
                console.log(bottoneInvio)
                bottoneInvio.innerText="Invio in corso";
                bottoneInvio.disabled=true;
                aziendaCampo.disabled=true;
                nomeCampo.disabled=true;
                telefonoCampo.disabled=true;
                emailCampo.disabled=true;
                messaggioCampo.disabled=true;
                if (data.success) { 
                    bottoneInvio.innerText="Inviato!";
                    areaMessaggiGreen.classList.remove('d-none');
                    areaMessaggiGreen.innerText=data.messaggio;
                } 
                else {
                    bottoneInvio.innerText="Errore :(";
                    areaMessaggiRed.classList.remove('d-none');
                    areaMessaggiRed.innerText=data.messaggio;
                }
        }) 
    }
});