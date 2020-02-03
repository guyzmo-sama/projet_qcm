
self.addEventListener('install', async (event) => {
   //console.log('Install')
   event.waitUntil(
       caches.open('paris_events_1.0.0')
       // Response-Type = basic
       .then((cache) => {
           return cache.addAll([
               // la route principale
               '/',
               // le point d'entrée html
               '/index.html',
               // le JS de l'application
               '/app/app.js',
               '/app/config.js',
               '/app/main.js',
               // Les controllers
               'src/controllers/About.js',
               'src/controllers/Home.js',
               'src/controllers/Login.js',
               'src/controllers/Search.js',
               // Le model
               'src/models/',
               // Le css
               '/static/css/main.css',
               // Les images
               '/static/images/subtle-grey.png',
               // Les vues
               'src/views/about.html',
               'src/views/index.html',
               'src/views/login.html',
               'src/views/search.html',
               // le router vanilla
               '/node_modules/vanilla-router/dist/vanilla-router.js'
           ])
           // Response-Type = cors
           .then(() => {
               // On doit maintenant mettre en cache les fichers externes
                [
                   "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css",
                   "https://cdnjs.cloudflare.com/ajax/libs/flat-ui/2.3.0/css/flat-ui.min.css",
                   "https://fonts.googleapis.com/css?family=Poiret+One"
               ].forEach((lib) => fetch(lib).then(res => cache.put(lib, res)))
           })
           // Response-Type = opaque
           .then(() => {
               [
                   'https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js',
                   'https://www.gstatic.com/firebasejs/5.8.2/firebase-auth.js'
               ].forEach((libUrl) => {
                   const lib = new Request(libUrl, { mode: 'no-cors' });
                   fetch(lib).then(res => cache.put(lib, res))
               })
           })
           .then(() => {
               /* Utilisez cette méthode avec Clients.claim () pour vous assurer que les mises à jour de l'agent de service sous-jacent prennent effet immédiatement pour le client actuel et tous les autres clients actifs. */
               self.skipWaiting()
           })
           .catch(console.log)
       })
   );
});



// Le cache dynamique (cache de navigation)
self.addEventListener('activate', (event) => {
   event.waitUntil(
       caches.delete('events-cache-dynamic').then(() => self.clients.claim())
   )
})


self.addEventListener('fetch', (event)  => {
   // tout ce qui devra etre stocké en cache
   //console.log(event.request)
   caches.match(event.request)
       .then(response => {
           let data = (response || fetch(event.request))
           return data})
           .then(responseFetch => {
               caches.open('events-cache-dynamic')
                   .then(cache => cache.put(event.request, responseFetch))
                       return responseFetch.clone()
           })
   //})
})

