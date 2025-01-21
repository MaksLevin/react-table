import { takeLatest, call, put } from 'redux-saga/effects';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from 'firebase-config';

import { loginFailure, loginSuccess, logoutFailure, logoutSuccess, registerFailure, registerSuccess } from './auth.actionCreators';
import { LOGIN_REQUEST, LOGOUT_REQUEST, REGISTER_REQUEST } from './auth.action';


function* loginSaga(action: any): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;
    const userCredential = yield call(signInWithEmailAndPassword, auth, email, password);
    yield put(loginSuccess(userCredential.user));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* registerSaga(action: any): Generator<any, void, any> {
  try {
    const { email, password } = action.payload;
    const userCredential = yield call(createUserWithEmailAndPassword, auth, email, password);
    yield put(registerSuccess(userCredential.user));
  } catch (error: any) {
    yield put(registerFailure(error.message));
  }
}

function* logoutSaga(): Generator<any, void, any> {
  try {
    yield call(signOut, auth);
    yield put(logoutSuccess());
  } catch (error: any) {
    yield put(logoutFailure(error.message));
  }
}

export function* authWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
}
