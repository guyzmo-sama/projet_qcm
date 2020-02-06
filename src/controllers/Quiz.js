import app from '/app/app.js';
import LocalStorage from '/src/models/LocalStorage.js';
let myLocalStorage = new LocalStorage();
let theKeys = [];
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
		let valueObjet = {};

        document.getElementById('saveQuiz').addEventListener('click',() => {

        	let where = "questionPart";
        	let key = document.getElementById("nameQCM").value;

        	valueObjet.descQCM = document.getElementById("descQCM").value;

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
        		let qcmName = document.getElementById("qcmName");
        		let key = qcmName.innerText || qcmName.textContent;
        		valueObjet = myLocalStorage.getObjet(key)||{};
        		let where = "nextQuestion";

        		
        		let question = document.getElementById("question").value;

				//console.log(question);
				if(typeof valueObjet.questions == "undefined") valueObjet.questions = [];
        		valueObjet.questions.push({text: question, reponses : []});
        		
        		let answers = document.getElementsByClassName("answer");
        		
        		for ( let i=0; i < answers.length; i++){
        			
        			let trueOrFalse = document.querySelector(`#check${i+1}`).checked;

        			valueObjet.questions[valueObjet.questions.length-1].reponses.push({text :answers[i].value, valeur : trueOrFalse});	
        		}
        		console.log(valueObjet);
        		this.saveQuiz(where, key, valueObjet);	
        	});
        }
        if (document.getElementById('validateQuiz') != null) {
        	document.getElementById('validateQuiz').addEventListener('click',() => {
        		let qcmName = document.getElementById("qcmName");
        		let key = qcmName.innerText || qcmName.textContent;
        		valueObjet = myLocalStorage.getObjet(key)||{};
        		let where = "ValidQCM";

        		
        		let question = document.getElementById("question").value;

				//console.log(question);
				if(typeof valueObjet.questions == "undefined") valueObjet.questions = [];
        		valueObjet.questions.push({text : question, reponses : []});
        		
        		let answers = document.getElementsByClassName("answer");
        		
        		for ( let i=0; i < answers.length; i++){
        			
        			let trueOrFalse = document.querySelector(`#check${i+1}`).checked;

        			valueObjet.questions[valueObjet.questions.length-1].reponses.push({text :answers[i].value, valeur : trueOrFalse});	
        		}
        		this.saveKeys(key);
        		this.saveQuiz(where, key, valueObjet);
        	});
        }
    }

    saveQuiz(where, key, valueObjet)
    {

    	if (where === "questionPart") {

    		myLocalStorage.setObjet(key, valueObjet);
    		this.showTheQuestionPart(key);
    	}

    	else if (where === "nextQuestion" || where === "ValidQCM") {

			
			//let qcm = valueObjet;// {...myLocalStorage.getObjet(key)||{}, ...valueObjet};
			//console.log(qcm);
    		myLocalStorage.setObjet(key, valueObjet);
    		if (where === "nextQuestion") {
    			this.showTheQuestionPart(key);
    		}
    		else if (where === "ValidQCM") {
    			window.location = "/#/";
    		}
    	}
    	else {
    		alert("STOP !!!!");
    	}
    }

    showTheQuestionPart(key)
    {
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
    	cloneA.querySelector(".check").setAttribute("id",`check${nbrClick}`);

    	articleA.appendChild(cloneA);
    }

    removeTheAnswerPart(nbrClick)
    {
    	let removeAnswer = document.getElementById(`delId${nbrClick}`);
        removeAnswer.parentNode.removeChild(removeAnswer);
    }

    saveKeys(key)
    {
    	theKeys.push(key);
    	console.log(theKeys);
    	myLocalStorage.setObjet("theKeys", theKeys);
    }

}