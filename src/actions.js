import api from './utilities/api';

export const changePassword = password => {
  return dispatch => {
    dispatch({ type: 'CHANGE_PASSWORD', payload: password });
  }
};

export const readLogs = () => {
  return dispatch => {
    dispatch({ type: 'READ_LOGS' });
    api.get('/logs')
      .then(data => dispatch({ type: 'READ_LOGS_FULFILLED', payload: data }))
      .catch(err => dispatch({ type: 'READ_LOGS_REJECTED', payload: err }));
  }
}

export const readLog = (folder, file) => {
  return dispatch => {
    dispatch({ type: 'READ_LOG', payload: { folder, file } });
    api.get(`/logs/${folder}/${file}`)
      .then(({ data }) => dispatch({ type: 'READ_LOG_FULFILLED', payload: { file, folder, data } }))
      .catch(err => dispatch({ type: 'READ_LOG_REJECTED', payload: err }));
  }
}
