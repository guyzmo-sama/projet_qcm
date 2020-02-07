import app from '/app/app.js';
import LocalStorage from '/src/models/LocalStorage.js';
import Leqcm from '/src/controllers/Leqcm.js';
let myLocalStorage = new LocalStorage();
let myLeqcm = new Leqcm();

export default class Home
{

	/*constructor(app){
		this.app = app;
	}*/
	show()
	{
		app.mvc.loadView(`home`).then(() =>{
			this.afficheQCM();
		});

		app.dom.class(`home`);
	}

	/*listener()
	{
		this.afficheQCM();
		if (document.querySelector(".oneQcm") != null) {
			
				let getIds = document.querySelectorAll(".oneQcm");
				let getId;
				for (let i = 0; i < getIds.length; i++) {
					document.querySelector(".oneQcm").addEventListener('click',() => {
					getId = getIds[i].id;
					console.log(getId);
					});
				}
		}
	}*/

	afficheQCM()
	{
		let theQcms = [];
		let keys = this.recupKeys();
		//console.log(keys);
		
		for ( let i=0; i < keys.length; i++){
			let tableA = document.getElementById("afficheQuestion");
			let templateT = document.getElementById("templateAfficher");

			let cloneT = document.importNode(templateT.content, true);

			theQcms = myLocalStorage.getObjet(keys[i]);
			//console.log(keys[i]);
			//console.log(theQcms);

			cloneT.querySelector(".oneQcm").setAttribute("id",`${keys[i]}`);
			cloneT.getElementById(`${keys[i]}`).onclick = function() {
				envoiQcm(keys[i]);
				//alert(keys[i]);
			};
			
			cloneT.querySelector("#qcmTitre").textContent = `titre : ${keys[i]}`;
			cloneT.querySelector("#descQcm").textContent = `description : ${theQcms["descQCM"]}`;

			tableA.appendChild(cloneT);
		}
	}
	recupKeys(){
		let theKeys = myLocalStorage.getObjet('theKeys');
		return theKeys;
	}

}
function envoiQcm(key)
	{
		myLeqcm.show(key);
	}