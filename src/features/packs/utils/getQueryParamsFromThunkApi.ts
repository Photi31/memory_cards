import { ThunkApiType } from "common/utils/thunk-try-catch";
import { getQueryParamsFiltrated } from "features/packs/utils/getQueryParamsFiltrated";

export const getQueryParamsFromThunkApi = (thunkApi: ThunkApiType) => {
  const queryParams = thunkApi.getState().packs.queryParams;
  console.log(queryParams);
  return getQueryParamsFiltrated(queryParams);
};
