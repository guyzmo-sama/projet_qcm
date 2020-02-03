import app from '/app/app.js';
import LocalStorage from '/src/models/LocalStorage.js';

export default class Quiz
{

	/*constructor(app){
		this.app = app;
	}*/
	show()
	{
		app.mvc.loadView(`quiz`).then(() =>{
			this.listener();
		});

		app.dom.class(`quiz`);
	}
	
	listener() 
	{
        // Ajouter un écouteur d'événement sur le bouton submit du formulaire

        document.getElementById('saveQuiz').addEventListener('click',() => {
        	
        	//let key = new Object();
        	let key = document.getElementById("nameQCM").value;
        	//key["descQCM"] = document.getElementById("descQCM").value;
        	
        	let value = new Object();
        	value["descQCM"] = document.getElementById("descQCM").value;
			//console.log(key);
			//console.log(value);
			this.saveQuiz(key, value);
        });
    }
    saveQuiz(key, value)
    {
    	
		let LocalStorage = new LocalStorage();

    	//LocalStorage.setObjet(key, value);

    	let check = LocalStorage.getObject(key);
    	console.log(check)

    }

    /*search( key, value ) 
    {
    	//console.log(params);

        // params contiendra les différents champs du formulaire
        let theSearch = params.search.charAt(0).toUpperCase() + params.search.substring(1).toLowerCase();

        let ParisEvent = new ParisEvents();
        ParisEvent.getAll(theSearch, params.postal_code, params.sortBy)
        .then( data => {
        	let section = document.getElementById("result");
        	section.innerHTML = "";
        	data.forEach(data => this.template(data,section))});
    }*/
}