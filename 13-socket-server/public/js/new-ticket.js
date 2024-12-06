



const currentTicketLbl = document.querySelector('span');
const createButtonBtn = document.querySelector('button');

async function getLastTicket() {

    const lasTicket = await fetch('/api/ticket/last').then( resp => resp.json() );
    // console.log(lasTicket);
    currentTicketLbl.innerHTML = lasTicket;
}

async function createTiocket () {
    const newTicket = await fetch('/api/ticket', {
        method: 'POST'
    }).then( resp => resp.json() );

    currentTicketLbl.innerHTML = newTicket.number;
}

createButtonBtn.addEventListener('click', createTiocket);


getLastTicket();


