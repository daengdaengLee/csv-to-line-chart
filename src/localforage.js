import localforage from 'localforage';

localforage.config({ name: 'csv-to-line-chart' });

if (process.env.NODE_ENV === 'development') {
  window.localforage = localforage;
}

export default localforage;
