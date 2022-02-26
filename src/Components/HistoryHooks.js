import React from 'react';
import { useNavigate } from 'react-router-dom';

function HistoryHooks(Component) {
  return function WrappedComponent(props) {
    let navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default HistoryHooks;
