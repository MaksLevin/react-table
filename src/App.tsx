import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from 'firebase-config';

import { loginSuccess } from '@core/store/auth/auth.actionCreators';
import { ProtectedRoute } from '@components/protectedRoute';
import { Auth } from '@components/auth';
import { MemoizedTable } from '@components/table';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginSuccess(user));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MemoizedTable />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
