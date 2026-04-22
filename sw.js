const CACHE_NAME = 'matrezan-v1';

// Estes são os ficheiros vitais que serão guardados na memória do telemóvel
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './dados_matrezan.js'
    // Se quiser garantir que o ícone carrega offline, adicione a linha abaixo:
    // './icone-192.png'
];

// 1. Instalação: Guarda os ficheiros base
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Ficheiros guardados no cache offline.');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. Interceta as chamadas: Tenta procurar na memória do telemóvel primeiro!
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Se encontrar no cache (offline), devolve. Se não, tenta ir à internet.
            return response || fetch(event.request);
        })
    );
});