import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useHttpClient } from "./http-hook";

export const useSearchSound = async (search) => {
  const history = useRouter();
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  const searchSounds = async (e) => {
    e.preventDefault();

    // let searchTxt = formState.inputs.name.value;

    let searchTxt = search;

    let res;
   
    try {
      res = await sendRequest(
        `/users/searchsounds/${searchTxt}`
      );
    

      dispatch({ type: "SEARCH_BROWSE_HOME", results: res });
      history.push("/browse");
    } catch (err) {}
  };

  return searchSounds;
};
