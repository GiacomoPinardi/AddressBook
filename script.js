var aData = []; // array che contiene gli oggetti Persona creati dall'utente
var findedPersona = []; // array che contiene gli index delle persone trovate attraverso la ricerca
var currentShowing = -1; // valore che indica l'index della persona che si sta mostrando

// costruttore dell'oggetto Persona
function Persona (n, c, t, m) {
	this.nome = n;
	this.cognome = c;
	this.cellulare = t;
	this.mail = m;
}

// riceve 4 luogi (id) dai quali ottiene i valori e crea poi un oggetto Persona che posiziona alla fine di 'aData[]'
function leggiInfo (luogo1, luogo2, luogo3, luogo4) {
	var i = [];
	i[0] = document.getElementById(luogo1).value;
	i[1] = document.getElementById(luogo2).value;
	i[2] = document.getElementById(luogo3).value;
	i[3] = document.getElementById(luogo4).value;
	// crea una nuova persona
	var p = new Persona(i[0], i[1], i[2], i[3]);
	// posizione 'p' in fondo ad 'aData'
	aData[aData.length] = p;
	// avvisa l'utente del salvataggio delle informazioni
	alert("Data saved succesfully!");
}

// permette di scrivere i dati della persona indicata dall'index
function scriviInfo (idx) {
	// se idx non e' un numero l'utente viene allertato
	if (isNaN(idx)) {
		alert("Please, insert a number!");
	}	
	// anche se l'index e' troppo piccolo o troppo grande l'utente viene allertato
	else if (idx >= aData.length || idx < 0) {
		var msg;
		if (aData.length == 0 || idx < 0) {
			msg = "Item not aviable!";
		}
		else {			
			msg = "Item not aviable! Maximium aviable item: ".concat(aData.length - 1);			
		}
		alert(msg);		
	}
	// se invece non ci sono problemi viene mostrata la perosna richiesta
	else {		
		showPersona(idx);
	}
}

// secodno tipo di ricerca, che permette di cercare per nome, cognome, cellulare o email
// 'e' indica l'id dell'elemento che contiene i dati da cercare
// 'action' indica invece l'azione da compiere: 0 se si tratta di fare una nuova ricerca,
// 1 se si richeiede l'elemento successivo e 2 se si chiede il precedente
function cerca (e, action) {		
	if (action === 0) {
		// 'searched' prende il valore dell'elemento da cercare
		var searched = document.getElementById(e).value;
		// inizializzo anche un boolean che mi indica se e' stato trovato qualcosa
		var finded = false;
		if (document.getElementById("radio1").checked) {
			// si scorre il vettore di Persone alla ricerca dell'elemento da cercare		
			for (var i = 0; i < aData.length; i++) {
				// se l'elemento viene trovato si aggiunge l'index della persona trovata a 'findedPersona'
				if (aData[i].nome.toUpperCase() === searched.toUpperCase()) {
					findedPersona[findedPersona.length] = i;
					currentShowing = 0;
					finded = true;
				}
			}
		}
		else if (document.getElementById("radio2").checked) {
			for (var i = 0; i < aData.length; i++) {
				if (aData[i].cognome.toUpperCase() === searched.toUpperCase()) {
					findedPersona[findedPersona.length] = i;
					currentShowing = 0;
					finded = true;
				}
			}
		}
		else if (document.getElementById("radio3").checked) {
			for (var i = 0; i < aData.length; i++) {
				if (aData[i].cellulare.toUpperCase() === searched.toUpperCase()) {
					findedPersona[findedPersona.length] = i;
					currentShowing = 0;
					finded = true;
				}
			}			
		}
		else if (document.getElementById("radio4").checked) {
			for (var i = 0; i < aData.length; i++) {
				if (aData[i].mail.toUpperCase() === searched.toUpperCase()) {
					findedPersona[findedPersona.length] = i;
					currentShowing = 0;
					finded = true;
				}
			}
		}
		else {
			alert("Please select the type!");
		}
		
		// se e' stato trovato almento un dato allora si mostra la prima Persona trovata
		if (finded) {
			showPersona(findedPersona[currentShowing]);
		}
		else {
			showPersona(-1);
			alert("Search wasn't successfully! No item finded");
		}		
	}
	// azione che determina l'incremento di 'currentShowing', quindi verra' mostrato il successivo elemento trovato
	else if (action === 1) {
		if (currentShowing < findedPersona.length-1) {
			currentShowing ++;
			showPersona(currentShowing);
		}		
	}
	// azione che determina la decrementazione di 'currentShowing', quindi verra' mostrato il precedente elemento trovato
	else {
		if (currentShowing > 0) {
			currentShowing --;
			showPersona(currentShowing);
		}
	}	
}

// funzione che permette di mostrare la persona richiesta dall'indice (idx) negli appositi id
// se idx === -1 allora i campi verranno resettati
function showPersona (idx) {
	if (idx === -1) {
		document.getElementById("pNome").innerHTML = "";
		document.getElementById("pCognome").innerHTML = "";
		document.getElementById("pCell").innerHTML = "";
		document.getElementById("pMail").innerHTML = "";
	}
	else {
		document.getElementById("pNome").innerHTML = aData[idx].nome;
		document.getElementById("pCognome").innerHTML = aData[idx].cognome;
		document.getElementById("pCell").innerHTML = aData[idx].cellulare;
		document.getElementById("pMail").innerHTML = aData[idx].mail;
	}
}