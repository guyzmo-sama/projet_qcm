import app from '/app/app.js';

export default class Home
{

	/*constructor(app){
		this.app = app;
	}*/
	show()
	{
		app.mvc.loadView(`home`);

		app.dom.class(`home`);


		/*fetch('views/home.html')
		.then(response => response.text()).then(response =>{
			document.querySelector('main').innerHTML = response;
		});
		*/
	}
}