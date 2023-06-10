import { ArgGetPacksType } from "features/packs/packs.api";

export const getQueryParamsFiltration = (queryParams: ArgGetPacksType) => {
  const res: Array<ResType> = [];
  Object.entries(queryParams).map(([key, value]) => {
    if (!!value) res.push([key, value]);
  });
  return Object.fromEntries(res);
};

type ResType = [string, string | number | boolean];
