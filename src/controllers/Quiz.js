import app from '/app/app.js';
import LocalStorage from '/src/models/LocalStorage.js';

export default class Quiz
{

	show()
	{
		app.mvc.loadView(`quiz`).then(() =>{
			this.listener();
		});

		app.dom.class(`quiz`);
	}
	
	listener() 
	{
		let numberOfClick = 0;

        document.getElementById('saveQuiz').addEventListener('click',() => {

        	let where = "questionPart";
        	let key = document.getElementById("nameQCM").value;
        	let valueObjet = new Object();

        	valueObjet["descQCM"] = document.getElementById("descQCM").value;

			this.saveQuiz(where, key, valueObjet);
        });
        
        if (document.getElementById('addAnswer') != null) {
        	document.getElementById('addAnswer').addEventListener('click',() => {
        		if (numberOfClick < 0) {
					numberOfClick = 0;
				}
				numberOfClick += 1;
        		this.showTheAnswerPart(numberOfClick);
        		//console.log(numberOfClick)
        	});
        }

        if (document.getElementById('removeAnswer') != null) {
        	document.getElementById('removeAnswer').addEventListener('click',() => {
        		if (numberOfClick < 0) {
					numberOfClick = 0;
				}
        		this.removeTheAnswerPart(numberOfClick);
        		numberOfClick -= 1;
        		//console.log(numberOfClick)
        	});
        }

        if (document.getElementById('validateQuestion') != null) {
        	document.getElementById('validateQuestion').addEventListener('click',() => {
        		let where = "nextQuestion";

        		let qcmName = document.getElementById("qcmName");
        		let key = qcmName.innerText || qcmName.textContent;

        		let valueObjet = [];
        		

        		//valueObjet[`reponse`] = [];
        		valueObjet[`question`] = document.getElementById("question").value;
        		let answers = document.getElementsByClassName("answer");
        		//answers.forEach( function(theAnswer)
        		for ( let i=0; i < answers.length; i++){
        			let oneReponse = [];
        			let trueOrFalse = document.querySelector(".check").value;
        			if (trueOrFalse === "true"){
        				oneReponse["valeur"] ="vrai";
        			}
        			else{
        				oneReponse["valeur"] ="faux";
        			}
        			//console.log(answers[i].value);
        			oneReponse[`réponse${i+1}`] = answers[i].value;
        			//console.log(oneReponse);
        			//valueObjet[`reponse`].push(oneReponse);
    				//console.log(valueObjet);
					//this.saveQuiz(where, key, valueObjet);	
        		}
        		console.log(valueObjet);
        		this.saveQuiz(where, key, valueObjet);
        		
        	});
        }
        if (document.getElementById('validateQuiz') != null) {
        	document.getElementById('validateQuiz').addEventListener('click',() => {
        		let where = "ValidQCM";
        		
				this.saveQuiz(where, key, valueObjet);
        	});
        }
    }

    saveQuiz(where, key, valueObjet)
    {

    	let myLocalStorage = new LocalStorage();

    	if (where === "questionPart") {

    		myLocalStorage.setObjet(key, valueObjet);
    		this.showTheQuestionPart(key);
    	}

    	else if (where === "nextQuestion") {

			let qcm = new Array;
			//qcm.push(myLocalStorage.getObjet(key));
			//console.log(qcm);
			qcm.push(valueObjet);
			console.log(qcm);
    		myLocalStorage.setObjet(key, valueObjet);
    		//this.showTheQuestionPart(key);
    	}

    	else if (where === "ValidQCM") {
    		window.location = "/#/";
    	}

    	else {
    		alert("STOP !!!!");
    	}
    }

    showTheQuestionPart(key)
    {
    	let myLocalStorage = new LocalStorage();
    	let descQcm = Object.values(myLocalStorage.getObjet(key));
    	//console.log(descQcm[0]);

    	let hidenCreateQuiz = document.querySelector(".createOneQuiz");
		hidenCreateQuiz.style.display="none";
		let titreH1 = document.getElementById("titreH1Q");
		titreH1.innerHTML ="Créer vos questions";

    	let sectionQ = document.getElementById("createQuestion");
        sectionQ.innerHTML = "";

    	let templateQ = document.getElementById("templateQuestion");
    	let cloneQ = document.importNode(templateQ.content, true);

    	cloneQ.getElementById("qcmName").textContent = `${key}`;
    	sectionQ.appendChild(cloneQ);
    	this.listener();
    }

    showTheAnswerPart(nbrClick)
    {
    	//console.log(nbrClick);
    	let articleA = document.getElementById("createAnswer");
    	let templateA = document.getElementById("templateAnswers");

    	let cloneA = document.importNode(templateA.content, true);

		cloneA.querySelector(".formAnswer").setAttribute("id",`delId${nbrClick}`);
    	cloneA.querySelector(".answerTilte").textContent = `Réponse n°${nbrClick}`;
    	cloneA.querySelector(".answerTexte").textContent = `Entrer la Réponse n°${nbrClick}`;
    	cloneA.querySelector(".answerTexte").setAttribute("for",`Réponse${nbrClick}`);
    	cloneA.querySelector(".answer").setAttribute("name",`Reponse${nbrClick}`);
    	cloneA.querySelector(".answer").setAttribute("id",`Reponse${nbrClick}`);
    	cloneA.querySelector(".check").setAttribute("name",`Reponse${nbrClick}`);
    	cloneA.querySelector(".check").setAttribute("id",`true${nbrClick}`);


    	articleA.appendChild(cloneA);
    }

    removeTheAnswerPart(nbrClick)
    {
    	let removeAnswer = document.getElementById(`delId${nbrClick}`);
        removeAnswer.parentNode.removeChild(removeAnswer);
    }

    creatOtherQuestion()
    {

    }

}