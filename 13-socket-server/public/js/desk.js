
// Referencias html
const lblPending = document.querySelector('#lbl-pending');
const deskHeader = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');
const currentTicketLabel = document.querySelector('small');

const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');

// 
const searchParamas = new URLSearchParams( window.location.search );
if (!searchParamas.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Escritorio es requerido')
  }
  
  const deskNumber = searchParamas.get('escritorio');
  let workingTicket = null;
  deskHeader.innerHTML = deskNumber;


  function checkTicketCount(currentCount = 0) {
    if ( currentCount === 0) {
      noMoreAlert.classList.remove('d-none');
    } else {
      noMoreAlert.classList.add('d-none');
    }

    lblPending.innerHTML = currentCount;
  } 

async function loadInitialCount() {
    const pendingTickets = await fetch('/api/ticket/pending').then( resp => resp.json() );
    // console.log( pending );
    checkTicketCount(pendingTickets.length);
}


async function getTicket() {

  await finishedTicket();
  
  const { status, ticket, message } = await fetch(`/api/ticket/draw/${ deskNumber }`)
    .then( resp => resp.json() );

    if(status === 'error') {
      currentTicketLabel.innerHTML = message
    }

    workingTicket = ticket;
    currentTicketLabel.innerText = ticket.number;
}

async function finishedTicket () {
  if (!workingTicket) return;

  const { status, message } = await fetch(`/api/ticket/done/${ workingTicket.id }`, {
    method: 'PUT'
  }).then( resp => resp.json() );

  // console.log(status, message);
  if(status === 'ok') {
    workingTicket = null;
    currentTicketLabel.innerHTML = 'Nadie';
  }
} 


function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
      // console.log(event.data);
      const { type, payload } = JSON.parse( event.data );

      if (type !== 'on-ticket-count-changed') return;
      checkTicketCount(payload);
    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
  }
  
  // Listeners 
  btnDraw.addEventListener('click', getTicket );
  btnDone.addEventListener('click', finishedTicket );
  
  
  // Initialization 
  loadInitialCount();
  connectToWebSockets();