import app from '/app/app.js';
import LocalStorage from '/src/models/LocalStorage.js';

export default class Home
{

	/*constructor(app){
		this.app = app;
	}*/
	show()
	{
		app.mvc.loadView(`home`);

		app.dom.class(`home`);

		this.afficheQCM();
		/*fetch('views/home.html')
		.then(response => response.text()).then(response =>{
			document.querySelector('main').innerHTML = response;
		});
		*/
	}

	listener()
	{
		/*document.getElementById('afficheQCM').addEventListener('click',() => {

        	let where = "questionPart";
        	let key = document.getElementById("nameQCM").value;
        	let valueObjet = new Object();

        	valueObjet["descQCM"] = document.getElementById("descQCM").value;

			this.saveQuiz(where, key, valueObjet);
        });*/
	}

	afficheQCM(){
		let myLocalStorage = new LocalStorage();
		let storage = Object.values(myLocalStorage.getObjet('QCM'));
    	console.log(storage);		
	}
}