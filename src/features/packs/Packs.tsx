import { useAppDispatch, useAppSelector } from "common/hooks";
import React, { useEffect } from "react";
import { packsThunks } from "features/packs/packs.slice";
import s1 from "app/App.module.css";
import s from "features/packs/Packs.module.css";
import { smallBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import { Button } from "@mui/material";

import { MySlider } from "features/packs/components/slider/MySlider";
import { MyTable } from "features/packs/components/table/MyTable";
import { MyAllFilter } from "features/packs/components/myAllFilter/MyAllFilter";
import { MySearch } from "features/packs/components/search/MySearch";
import { RemoveFilter } from "features/packs/components/removeFilter/RemoveFilter";
import { getQueryParamsFiltration } from "features/packs/utils/getQueryParamsFiltration";

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.packs);
  const allQueryParams = useAppSelector((state) => state.packs.queryParams);
  const dispatch = useAppDispatch();
  const queryParams = getQueryParamsFiltration(allQueryParams);

  useEffect(() => {
    dispatch(packsThunks.getPacks(queryParams));
  }, []);

  const newPack = {
    name: "🦣 add new Pack",
  };

  const addNewPack = () => {
    dispatch(packsThunks.addPack(newPack));
  };

  if (!packs) return <h1>Loading...</h1>;
  return (
    <div className={s1.container + " " + s.container}>
      <header className={s.header}>
        <h1 className={s.title}>Packs list</h1>
        <Button variant="contained" sx={smallBlueButtonSX} onClick={addNewPack}>
          Add new pack
        </Button>
      </header>
      <div className={s.filteredBlock}>
        <MySearch />
        <MyAllFilter />
        <MySlider />
        <RemoveFilter />
      </div>
      {packs && <MyTable />}
    </div>
  );
};
