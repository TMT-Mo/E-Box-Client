import { useDispatch } from "./use-dispatch";
// import { rootReducer } from './../store/index';
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { helpers } from "@/util/helpers";
import { checkAuthentication, logoutSlice, setUserInfo } from "@/slices/user";
import jwtDecode from "jwt-decode";
import { IUser } from "@/models/user";

interface UseAuth {
  logout: () => void;
  authenticate: () => void;
}

export const useAuth = (): UseAuth => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getToken, clearToken } = helpers;

  // const auth = useSelector(state => state)

  const logout = useCallback((): void => {
    clearToken();
    // rootReducer(auth.auth, {type: 'Reset'})
    // store.dispatch({ type: 'Reset' });
    dispatch(logoutSlice());
    navigate("/login", { replace: true });
  }, [clearToken, dispatch, navigate]);

  const authenticate = useCallback(() => {
    dispatch(checkAuthentication({ value: true }));
    const token = getToken();
    if (!token) {
      navigate('/');
      return;
    }
    const user = jwtDecode(token) as IUser;
    dispatch(setUserInfo({ user }));
    navigate("/home", { replace: true });
  }, [dispatch, getToken, navigate]);

  return {
    logout,
    authenticate,
  };
};
