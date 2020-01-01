const initialState = {
  fetching: false,
  error: null,
  logs: {}
};

const actions = {
  'READ_LOGS': [
    s     => ({ ...s, fetching: true }),
    (s,d) => ({ ...s, fetching: false, error: d }),
    (s,d) => {
      const logs = Object.entries(d).reduce((obj, [folder, files]) => {
        const filesObj = files.reduce((obj2, f) => ({ ...obj2, [f]: ((s.logs || {})[folder] || {})[f] || null }), {});
        return { ...obj, [folder]: filesObj };
      }, {});
      return { ...s, fetching: false, logs, error: null };
    }
  ],
  'READ_LOG': [
    s     => ({ ...s, fetching: true }),
    (s,d) => ({ ...s, fetching: false, error: d }),
    (s,d) => ({ ...s, fetching: false, logs: { ...s.logs, [d.folder]: { ...(s.logs[d.folder] || {}), [d.file]: d.data } }, error: null })
  ]
};

const name = 'logs';
export { initialState, actions, name };