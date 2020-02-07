import app from '/app/app.js';
import Home from '/src/controllers/Home.js';
import Quiz from '/src/controllers/Quiz.js';
import config from '/app/config.js';

// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter() {
    // Instancier ici le Vanilla Router dans l'objet "app.mvc.router"
    // ...
    app.mvc.router = new Router({
    	mode: 'hash',
    	root: '/'//pas obligatoire puisque c'est le chemin de root par defaut
    });

    app.mvc.router.add('/', ()  =>{
        let HomeController = new Home();
        HomeController.show();
    })

    app.mvc.router.add('/quiz', ()  =>{
        let QuizController = new Quiz();
        QuizController.show();
    })

    app.mvc.router.add('/leqcm', ()  =>{
        let LeqcmController = new Leqcm();
        LeqcmController.show();
    })

    app.mvc.router.add('/login', ()  =>{
        let LoginController = new Login();
        LoginController.show();
    })

    app.mvc.router.check().addUriListener();
}


// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du routeur.
    initializeRouter();
    
});