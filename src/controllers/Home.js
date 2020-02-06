import app from '/app/app.js';
import LocalStorage from '/src/models/LocalStorage.js';
let myLocalStorage = new LocalStorage();

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

	afficheQCM(){
		window.addEventListener("DOMContentLoaded", (event) => {
			let keys = this.recupKeys();
			console.log(keys);
			keys.forEach(key => {
				console.log(key);

				let tableA = document.getElementById("afficheQuestion");
				let templateA = document.getElementById("templateAfficher");

				let cloneA = document.importNode(templateA.content, true);

				cloneA.querySelector("#qcmTitre").textContent= `Réponse n°`;
				cloneA.querySelector("#question").textContent = `Réponse n°`;

				articleA.appendChild(cloneA);
			});
		});

	}

	recupKeys(){
		let theKeys = Object.values(myLocalStorage.getObjet('theKeys'));
		return theKeys;
	}
}