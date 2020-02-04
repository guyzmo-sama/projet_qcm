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
		let numberQuestion = 0;

        document.getElementById('saveQuiz').addEventListener('click',() => {

        	let where = "questionPart";
        	let key = document.getElementById("nameQCM").value;
        	let value = new Object();

        	value["descQCM"] = document.getElementById("descQCM").value;

			this.saveQuiz(where, key, value);
        });
        
        if (document.getElementById('addAnswer') != null) {
        	document.getElementById('addAnswer').addEventListener('click',() => {
        		if (numberOfClick < 0) {
					numberOfClick = 0;
				}
				numberOfClick += 1;
        		this.showTheAnswerPart(numberOfClick);
        		console.log(numberOfClick)
        	});
        }

        if (document.getElementById('removeAnswer') != null) {
        	document.getElementById('removeAnswer').addEventListener('click',() => {
        		if (numberOfClick < 0) {
					numberOfClick = 0;
				}
        		this.removeTheAnswerPart(numberOfClick);
        		numberOfClick -= 1;
        		console.log(numberOfClick)
        	});
        }

        if (document.getElementById('validateQuestion') != null) {
        	document.getElementById('validateQuestion').addEventListener('click',() => {
        		let where = "nextQuestion";

        		let qcmName = document.getElementById("qcmName");
        		let key = qcmName.innerText || qcmName.textContent;

        		//let value = new Object();
        		//let qcmDesc = document.getElementById("qcmDesck");
        		//value["descQCM"] = qcmDesc.innerText || qcmDesc.textContent;
        		value[`questionQCM${numberQuestion}QCM`] = document.getElementById("question").value;
        		value[`Reponse${nbrClick}QCM`] = document.getElementById(`Reponse${nbrClick}`).value;
        		for each (document.getElementById(`Reponse${nbrClick}`).value) {
        			if (document.getElementById("true${nbrClick}").checked) {
        				value["valeur"] = "correcte";
        			}
        			else if (document.querySelector(".checkF").checked) {
        				value["valeur"] = "fausse";
        			}
        		}

				this.saveQuiz(where, key, value);
        	});
        }
        if (document.getElementById('validateQuiz') != null) {
        	document.getElementById('validateQuiz').addEventListener('click',() => {
        		let where = "ValidQCM";
        		
				this.saveQuiz(where, key, value);
        	});
        }
    }

    saveQuiz(where, key, value)
    {

    	
    	if (where === "questionPart") {
    		let myLocalStorage = new LocalStorage();

    		myLocalStorage.setObjet(key, value);
    		this.showTheQuestionPart(key);
    	}
    	else if (where === "nextQuestion") {
    		let question = getObjet(key);
        	question.push(value)
        	setObjet(question, JSON.stringify(questions)); 
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
		titreH1.innerHTML ="Créer vos quéstions";

    	let sectionQ = document.getElementById("createQuestion");
        sectionQ.innerHTML = "";

    	let templateQ = document.getElementById("templateQuestion");
    	let cloneQ = document.importNode(templateQ.content, true);

    	cloneQ.getElementById("qcmName").textContent = `Pour le QCM : ${key}`;
    	cloneQ.getElementById("qcmDesc").textContent = `Description : ${descQcm[0]}`;
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
    	cloneA.querySelector(".checkT").setAttribute("name",`Reponse${nbrClick}`);
    	cloneA.querySelector(".checkT").setAttribute("id",`true${nbrClick}`);
    	cloneA.querySelector(".checkF").setAttribute("name",`Reponse${nbrClick}`);
    	cloneA.querySelector(".checkF").setAttribute("id",`false${nbrClick}`);
    	cloneA.querySelector(".true").setAttribute("for",`Reponse${nbrClick}`);
    	cloneA.querySelector(".false").setAttribute("for",`Reponse${nbrClick}`);

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