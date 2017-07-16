import axios from 'axios';
import { fetchProjects } from './projectActions';
import {
  FORM_SUBMISSION_PENDING,
  FORM_SUBMISSION_FULFILLED,
  FORM_SUBMISSION_REJECTED
} from '../constants';

export const createProject = (form) => {
  return dispatch => {
    dispatch({ type: FORM_SUBMISSION_PENDING });
    axios.post('/api/project', form)
      .then(response => {
        if (response.status !== 201) { throw response; }
        dispatch({ type: FORM_SUBMISSION_FULFILLED });
        dispatch({ type: 'PROJECT_CREATED' });
      })
      .catch(err => {
        dispatch({ type: FORM_SUBMISSION_REJECTED });
      });
  };
};
