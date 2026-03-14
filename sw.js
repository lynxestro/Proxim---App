// Clear everything on install
self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))));
  self.clients.claim();
});
// Never cache - always network
self.addEventListener('fetch',e=>{
  e.respondWith(fetch(e.request).catch(()=>new Response('Offline')));
});
