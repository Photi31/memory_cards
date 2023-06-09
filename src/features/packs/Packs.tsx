import { useAppDispatch, useAppSelector } from "common/hooks";
import React, { useEffect } from "react";
import { packsThunks } from "features/packs/packs.slice";
import s1 from "app/App.module.css";
import s from "features/packs/Packs.module.css";
import { smallBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import { Button } from "@mui/material";

import { MySlider } from "features/packs/components/slider/MySlider";
import { PacksTable } from "features/packs/components/table/PacksTable";
import { MyAllFilter } from "features/packs/components/myAllFilter/MyAllFilter";
import { PacksSearch } from "features/packs/components/search/PacksSearch";
import { RemoveFilter } from "features/packs/components/removeFilter/RemoveFilter";
import { getQueryParamsFiltrated } from "features/packs/utils/getQueryParamsFiltrated";
import { Paginations } from "features/packs/components/paginations/Paginations";
import { useParams } from "react-router-dom";

export const Packs = () => {
  const cardPacksTotalCount = useAppSelector(
    (state) => state.packs.cardPacksTotalCount
  );
  const pageCount = useAppSelector((state) => state.packs.pageCount);
  const page = useAppSelector((state) => state.packs.page);
  const packs = useAppSelector((state) => state.packs.packs);
  const allQueryParams = useAppSelector((state) => state.packs.queryParams);
  const dispatch = useAppDispatch();
  const query = useParams();

  console.log(query);

  useEffect(() => {
    // debugger;
    dispatch(packsThunks.getPacks(getQueryParamsFiltrated(allQueryParams)));
  }, [dispatch, allQueryParams]);

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
        <PacksSearch />
        <MyAllFilter />
        <MySlider />
        <RemoveFilter />
      </div>
      {packs && <PacksTable />}
      <Paginations
        name="pack"
        totalCount={cardPacksTotalCount || 1}
        pageCount={pageCount || 1}
        page={page || 1}
      />
    </div>
  );
};
