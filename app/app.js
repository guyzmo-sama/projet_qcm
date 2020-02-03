let app = {
    // ----------------------------------------------------------------------------------------------------------------
    // MANIPULATION DU DOM DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    dom: {
        render : (html) => {
            document.querySelector('main').innerHTML = html;

            //document.querySelector('main').className = ;
        },
        class : (className) => {
            document.querySelector('main').className = className;
        }
    },


    // ----------------------------------------------------------------------------------------------------------------
    // ARCHITECTURE MVC DE L'APPLICATION
    // ----------------------------------------------------------------------------------------------------------------
    mvc: {
        router: null,
        loadView : (view) => {
            return fetch(`src/views/${view}.html`).then(response => response.text()).then(response =>{
            app.dom.render(response)
            });
        }
    }
};


// L'application est exportée afin d'être accessible par d'autres modules.
export default app;