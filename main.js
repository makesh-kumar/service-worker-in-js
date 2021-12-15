this.addEventListener("install", (event) => {
  console.log("Installing");
  //   event.waitUntil(
  //     caches.open("my-cache").then((cache) => {
  //       console.log(cache);
  //       cache.addAll(["/"]).then(() => {
  //         this.skipWaiting();
  //       });
  //     })
  //   );
});

// to remove the cache that is not needed
this.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNameList) => {
      return Promise.all(
        cacheNameList.map((cacheName) => {
          if (cacheName !== "my-cache") {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


/**
 * while fetching - 
 * if internet is available :-
 * then data will be fetched from server and stored in cache,
 * if internet is not available :-
 * then data will be fetched from cached result
 *  
 */
this.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        caches.open("my-cache").then((cache) => {
          return cache.put(event.request, res.clone());
        });
        return res;
      })
      .catch(() => {
        alert("ERR");
        return caches.match(event.request).then((res) => {
          return res;
        });
      })
  );
});
