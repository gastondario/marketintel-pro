// MarketIntel PRO — Service Worker
// Enables offline support, caching, and push notifications

const CACHE_NAME = 'marketintel-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// ── Install: cache core assets ────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: serve from cache, fallback to network ─────────
self.addEventListener('fetch', event => {
  // Don't cache Anthropic API calls — always go live
  if (event.request.url.includes('anthropic.com')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => caches.match('/index.html'));
    })
  );
});

// ── Push Notifications ────────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '📊 MarketIntel PRO';
  const options = {
    body: data.body || 'Nueva señal de mercado detectada.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: data.tag || 'market-alert',
    renotify: true,
    requireInteraction: data.urgent || false,
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: '📈 Ver señal' },
      { action: 'dismiss', title: 'Ignorar' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// ── Notification click ────────────────────────────────────
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) { list[0].focus(); return; }
      return clients.openWindow(event.notification.data.url || '/');
    })
  );
});
