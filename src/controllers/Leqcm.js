import app from '/app/app.js';
import LocalStorage from '/src/models/LocalStorage.js';
let myLocalStorage = new LocalStorage();
let theQcm;
let numberClick = 0;
export default class Leqcm
{
	show(key)
	{
		app.mvc.loadView(`leqcm`).then(() =>{
			this.afficheQcm(key);
		});

		app.dom.class(`leqcm`);
	}

	listener()
	{
		document.getElementById('startQcm').addEventListener('click',() => {

			document.getElementById("startQcm").style.display="none";
			document.getElementById("pitiphrase").style.display="none";
			document.getElementById("suivantQcm").style.display="block";
			this.showTheQcmPart();

		});
		if (document.getElementById('suivantQcm') != null && theQcm["questions"].length != numberClick ) {
			document.getElementById('suivantQcm').addEventListener('click',() => {
				console.log();
				this.showTheQcmPart();
			});
		}
	}

	afficheQcm(key)
	{
		theQcm = this.recupQcm(key);
		console.log(theQcm);
		document.querySelector("#titreTheQcm").textContent= `${key}`;
		document.querySelector("#descTheQcm").textContent= `${theQcm["descQCM"]}`;
		document.getElementById("suivantQcm").style.display="none";
		this.listener(key);
	}

	showTheQcmPart()
    {
    	//let theQcm = this.recupQcm(key);
		//console.log(theQcm["questions"][numberClick]["text"]);
	
    	/*let articleA = document.getElementById("createQuestionQcm");
    	let templateA = document.getElementById("templateQcm");

    	let cloneA = document.importNode(templateA.content, true);
		*/
		if (theQcm["questions"][numberClick]["text"] == undefined){
			numberClick = 0;
    		window.location = "/#/";
    	}
    	document.getElementById("questionTilte").textContent = `${theQcm["questions"][numberClick]["text"]}`;
    	for (let i = 0; i < theQcm["questions"][numberClick]["reponses"].length; i++ ){
    		let articleA = document.getElementById("createQuestionQcm");
    		let templateA = document.getElementById("templateQcm");

    		let cloneA = document.importNode(templateA.content, true);
    		//cloneA.getElementById("questionTilte").textContent = `${theQcm["questions"][0]["text"]}`;
    		cloneA.querySelector(".checkAnswer").textContent = `${theQcm["questions"][numberClick]["reponses"][i]["text"]}`;
    		cloneA.querySelector(".checkAnswer").setAttribute("for",`reponse${[i]}`);
    		cloneA.querySelector(".check").setAttribute("value",`${theQcm["questions"][numberClick]["reponses"][i]["valeur"]}`);
    		cloneA.querySelector(".check").setAttribute("name",`reponse${[i]}`);
    		articleA.appendChild(cloneA);
    	}
    	numberClick += 1;
    }

	recupQcm(key)
	{
		theQcm = myLocalStorage.getObjet(key);
		return theQcm;
	}

}