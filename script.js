//Seleziona gli elementi HTML necessari
var centerText = document.getElementById("center-text");
var arrowImage = document.getElementById("arrow-image");
var leftButton = document.getElementById("left-button");
var rightButton = document.getElementById("right-button");

//Array di testi da mostrare nel testo centrale
var testi = ["Buonasera!", "Tutto bene?", "Ho una domanda da farti..."];
var count = 0;

//Imposta l'opacità iniziale della freccia a 0 (nascosta)
arrowImage.style.opacity = "0";

//Funzione per cambiare il testo
function cambiaTesto() {
    if (count === testi.length) {
        //Se tutti i testi sono stati mostrati, ferma l'intervallo e mostra la freccia
        clearInterval(intervallo);
        arrowImage.style.opacity = "1";
        arrowAnimation();
        return;
    }

    //Mostra il testo corrente e incrementa il contatore
    var testoCorrente = testi[count];
    centerText.innerText = testoCorrente;
    count++;
}

//Avvia il ciclo di cambio testo
cambiaTesto();
var intervallo = setInterval(cambiaTesto, 2000);

//Funzione per animare la freccia
function arrowAnimation() {
    var position = 0;
    var direction = 1;
    var animationInterval = setInterval(function() {
        position += direction * 0.5;
        arrowImage.style.transform = "translateX(" + position + "px)";
        if (Math.abs(position) >= 5) {
            direction *= -1;
        }
    }, 50);
}

//Mostra i pulsanti e cambia il testo quando si clicca sulla freccia
arrowImage.addEventListener('click', function() {
    leftButton.style.display = "inline-block";
    rightButton.style.display = "inline-block";
    arrowImage.style.display = "none";

    if (centerText.innerText === "Ho una domanda da farti...") {
        centerText.innerText = "Hai voglia di giocare?";
    }
});

//Variabili per il movimento del pulsante
var buttonContainer = document.getElementById("button-container");
var containerWidth = buttonContainer.offsetWidth;
var containerHeight = buttonContainer.offsetHeight;

var userControlledMovement = false;
var lastMouseX = 0;
var lastMouseY = 0;

//Genera una posizione casuale all'interno del contenitore
function generateRandomPosition() {
    var randomX = Math.random() * (containerWidth - rightButton.offsetWidth);
    var randomY = Math.random() * (containerHeight - rightButton.offsetHeight);
    return { x: randomX, y: randomY };
}

var random = 0;

//Movimento del pulsante "No" in base alla posizione del mouse
document.addEventListener('mousemove', function(event) {
    if (userControlledMovement && random != 10) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;

        var buttonRect = rightButton.getBoundingClientRect();
        var buttonX = buttonRect.left + buttonRect.width / 2;
        var buttonY = buttonRect.top + buttonRect.height / 2;

        var dist = Math.sqrt(Math.pow(mouseX - buttonX, 2) + Math.pow(mouseY - buttonY, 2));

        var speed = 5;
        var dx = (mouseX - buttonX) / dist * speed;
        var dy = (mouseY - buttonY) / dist * speed;

        var newX = buttonX + dx;
        var newY = buttonY + dy;

        newX = Math.max(0, Math.min(containerWidth - buttonRect.width, newX));
        newY = Math.max(0, Math.min(containerHeight - buttonRect.height, newY));

        rightButton.style.left = newX + 'px';
        rightButton.style.top = newY + 'px';

        if (dist < 50 && (mouseX !== lastMouseX || mouseY !== lastMouseY)) {
            var newPosition = generateRandomPosition();
            rightButton.style.left = newPosition.x + 'px';
            rightButton.style.top = newPosition.y + 'px';
        }

        lastMouseX = mouseX;
        lastMouseY = mouseY;
        random++;
    }
});

//Attiva il movimento del pulsante "No" quando il mouse passa sopra
rightButton.addEventListener('mouseenter', function() {
    userControlledMovement = true;
});

//Disattiva il movimento del pulsante "No" quando il mouse esce
rightButton.addEventListener('mouseleave', function() {
    userControlledMovement = false;
});

//Disattiva il movimento del pulsante "No" quando il mouse esce dal documento
document.addEventListener('mouseleave', function() {
    userControlledMovement = false;
});



//Funzione per inviare una notifica a Discord
function sendDiscordNotification(message) {
    var webhookURL = "https://discord.com/api/webhooks/1241679178596880434/OjATuzyDCmdSEj7TlyskrluxIZweCZPMdv4At3k0uRkzLTqg3XtyPBlqddZyvjrE13AY"; //Sostituisci con l'URL del tuo Webhook

    var request = new XMLHttpRequest();
    request.open("POST", webhookURL);

    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        username: "Notifier", //Nome visualizzato del bot
        content: message
    };

    request.send(JSON.stringify(params));
}

//Modifica i listener dei pulsanti per inviare la notifica
leftButton.addEventListener('click', function() {
    buttonContainer.style.display = "none";
    centerText.style.display = "none";
    var image = document.getElementById("felice");
    image.style.display = "block";
    image.style.position = "fixed";
    image.style.top = "50%";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%)";
    sendDiscordNotification("L'utente ha cliccato 'Sì'");
});

rightButton.addEventListener('click', function() {
    buttonContainer.style.display = "none";
    centerText.style.display = "none";
    var image = document.getElementById("triste");
    image.style.display = "block";
    image.style.position = "fixed";
    image.style.top = "50%";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%)";
    sendDiscordNotification("L'utente ha cliccato 'No'");
});

