self.addEventListener('install', (event) => {
    event.waitUntil(addResourcesToCache(['/ff14-tool-huanqiao/', '/ff14-tool-huanqiao/index.html']))
})

const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1')
    await cache.addAll(resources)
}

const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) return responseFromCache;
    return fetch(request)
}

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request))
})
