import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "./http-hook";

export const useSearchSound = async (search) => {
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  const searchSounds = async (e) => {
    e.preventDefault();

    // let searchTxt = formState.inputs.name.value;

    let searchTxt = search;

    let res;
   
    try {
      res = await sendRequest(
        `${process.env.REACT_APP_MY_ENV}/users/searchsounds/${searchTxt}`
      );
    

      dispatch({ type: "SEARCH_BROWSE_HOME", results: res });
      history.push("/browse");
    } catch (err) {}
  };

  return searchSounds;
};
