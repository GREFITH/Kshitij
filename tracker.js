(function () {
  var INGEST_URL = 'https://sgaaeuqsmuydftxbftpw.supabase.co/functions/v1/ingest';

  var sid = localStorage.getItem('_wv_sid');
  if (!sid) {
    sid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
      return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
    localStorage.setItem('_wv_sid', sid);
  }

  var startTime = Date.now();

  function send(dwellMs) {
    var payload = JSON.stringify({
      session_id: sid,
      path: window.location.pathname + window.location.search,
      title: document.title || null,
      referrer: document.referrer || null,
      dwell_ms: dwellMs || null,
      user_agent: navigator.userAgent || null,
    });
    try {
      fetch(INGEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      });
    } catch (e) {}
  }

  send(null);

  window.addEventListener('pagehide', function () {
    send(Date.now() - startTime);
  });
})();
