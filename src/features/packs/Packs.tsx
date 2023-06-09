import { useAppDispatch, useAppSelector } from "common/hooks";
import React, { useEffect } from "react";
import { packsThunks } from "features/packs/packs.slice";
import s1 from "app/App.module.css";
import s from "features/packs/Packs.module.css";
import { smallBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import { Button } from "@mui/material";
import filterRemove from "images/filter-remove.svg";

import { useNavigate } from "react-router-dom";
import { MySlider } from "features/packs/components/slider/MySlider";
import { MyTable } from "features/packs/components/table/MyTable";
import { MyAllFilter } from "features/packs/components/myAllFilter/MyAllFilter";
import { MySearch } from "features/packs/components/search/MySearch";

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.packs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let queryParamsForGet = {
    packName: "", // не обязательно
    min: 0, // не обязательно
    max: 0, // не обязательно
    sortPacks: "", // не обязательно TODO
    page: 0, // не обязательно
    pageCount: 0, // не обязательно
    user_id: "", // чьи колоды не обязательно, или придут все
    block: false,
  };
  let payload = { pageCount: 10 };

  useEffect(() => {
    dispatch(packsThunks.getPacks(payload));
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
        <div className={s.filter}>
          <img
            className={s.filterRemove}
            src={filterRemove}
            alt="filterRemove"
          />
        </div>
      </div>
      {packs && <MyTable />}
    </div>
  );
};
