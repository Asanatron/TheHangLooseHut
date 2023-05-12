import React from 'react'
import { useNavigate } from "react-router-dom";

export default function historyHook(Component) {
  return function WrappedComponent(props) {
    const myHookValue = useNavigate();
    return <Component {...props} navigate={myHookValue} />;
  }
}
