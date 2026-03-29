// Data keys
const STORAGE_KEYS = {
  users: 'xstream_users',
  liveStreams: 'xstream_liveStreams',
  vodMovies: 'xstream_vodMovies',
  series: 'xstream_series',
  liveCategories: 'xstream_liveCategories',
  vodCategories: 'xstream_vodCategories',
  seriesCategories: 'xstream_seriesCategories',
  connections: 'xstream_connections'
};

// ---------- Initialisation ----------
function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    const defaultUsers = [
      { id: 1, username: 'admin', password: 'admin', role: 'admin', connections: 0, status: 'active', created: new Date().toISOString().slice(0,10) },
      { id: 2, username: 'streamer1', password: '1234', role: 'user', connections: 2, status: 'active', created: new Date().toISOString().slice(0,10) }
    ];
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.liveCategories)) {
    localStorage.setItem(STORAGE_KEYS.liveCategories, JSON.stringify([{ id: 1, name: 'News' }, { id: 2, name: 'Sports' }]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.vodCategories)) {
    localStorage.setItem(STORAGE_KEYS.vodCategories, JSON.stringify([{ id: 4, name: 'Action' }, { id: 5, name: 'Drama' }, { id: 6, name: 'Comedy' }]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.seriesCategories)) {
    localStorage.setItem(STORAGE_KEYS.seriesCategories, JSON.stringify([{ id: 7, name: 'Drama Series' }, { id: 8, name: 'Comedy Series' }]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.liveStreams)) {
    localStorage.setItem(STORAGE_KEYS.liveStreams, JSON.stringify([
      { id: 101, name: 'Sample News Channel', categoryId: 1, sourceUrl: 'http://commondatastorage.googleapis.com/.../news.m3u8' },
      { id: 102, name: 'Sample Sports Channel', categoryId: 2, sourceUrl: 'http://commondatastorage.googleapis.com/.../sports.m3u8' }
    ]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.vodMovies)) {
    localStorage.setItem(STORAGE_KEYS.vodMovies, JSON.stringify([
      { id: 201, title: 'Blast Action', categoryId: 4, sourceUrl: 'https://example.com/action.mp4' },
      { id: 202, title: 'Deep Drama', categoryId: 5, sourceUrl: 'https://example.com/drama.mp4' },
      { id: 203, title: 'Laugh Factory', categoryId: 6, sourceUrl: 'https://example.com/comedy.mp4' }
    ]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.series)) {
    localStorage.setItem(STORAGE_KEYS.series, JSON.stringify([
      { id: 301, title: 'The Crowned', categoryId: 7, sourceUrl: 'https://example.com/series/drama.m3u' },
      { id: 302, title: 'Standup Nights', categoryId: 8, sourceUrl: 'https://example.com/series/comedy.m3u' }
    ]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.connections)) {
    localStorage.setItem(STORAGE_KEYS.connections, JSON.stringify([
      { id: 1001, username: 'streamer1', ip: '192.168.1.45', device: 'Android TV', loginTime: new Date().toLocaleString() },
      { id: 1002, username: 'admin', ip: '10.0.0.12', device: 'Chrome (Mac)', loginTime: new Date().toLocaleString() },
      { id: 1003, username: 'streamer1', ip: '192.168.1.88', device: 'iPhone', loginTime: new Date().toLocaleString() }
    ]));
  }
}

// ---------- Getters / Setters ----------
function getUsers() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]'); }
function saveUsers(users) { localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users)); }

function getLiveStreams() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.liveStreams) || '[]'); }
function saveLiveStreams(streams) { localStorage.setItem(STORAGE_KEYS.liveStreams, JSON.stringify(streams)); }

function getVodMovies() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.vodMovies) || '[]'); }
function saveVodMovies(movies) { localStorage.setItem(STORAGE_KEYS.vodMovies, JSON.stringify(movies)); }

function getSeries() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.series) || '[]'); }
function saveSeries(series) { localStorage.setItem(STORAGE_KEYS.series, JSON.stringify(series)); }

function getLiveCategories() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.liveCategories) || '[]'); }
function saveLiveCategories(cats) { localStorage.setItem(STORAGE_KEYS.liveCategories, JSON.stringify(cats)); }

function getVodCategories() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.vodCategories) || '[]'); }
function saveVodCategories(cats) { localStorage.setItem(STORAGE_KEYS.vodCategories, JSON.stringify(cats)); }

function getSeriesCategories() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.seriesCategories) || '[]'); }
function saveSeriesCategories(cats) { localStorage.setItem(STORAGE_KEYS.seriesCategories, JSON.stringify(cats)); }

function getConnections() { return JSON.parse(localStorage.getItem(STORAGE_KEYS.connections) || '[]'); }
function saveConnections(conns) { localStorage.setItem(STORAGE_KEYS.connections, JSON.stringify(conns)); }

// ---------- Helper: escape HTML ----------
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ---------- Generic delete ----------
function deleteEntity(key, id, rerenderFn) {
  let items = JSON.parse(localStorage.getItem(key) || '[]');
  items = items.filter(i => i.id !== id);
  localStorage.setItem(key, JSON.stringify(items));
  if (rerenderFn) rerenderFn();
}

// Initialise data when script loads
initData();