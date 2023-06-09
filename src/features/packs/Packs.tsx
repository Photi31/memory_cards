import { useAppDispatch, useAppSelector, useDebounce } from "common/hooks";
import React, { ChangeEvent, useEffect, MouseEvent, useState } from "react";
import { packsThunks } from "features/packs/packs.slice";
import s1 from "app/App.module.css";
import s from "features/packs/Packs.module.css";
import { smallBlueButtonSX } from "common/variableForStylization/buttonsStyle";
import { Button, InputBase, Paper, Slider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import filterRemove from "images/filter-remove.svg";
import teacher from "images/teacher.svg";
import pencil from "images/pencil.svg";
import trash from "images/trash.svg";
import { useNavigate } from "react-router-dom";

export const Packs = () => {
  const packs = useAppSelector((state) => state.packs.packs);
  const myID = useAppSelector((state) => state.auth.profile?._id);
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [minMax, setMinMax] = useState<number[]>([
    minCardsCount,
    maxCardsCount,
  ]);
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
  let payload = {};
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(inputValue, 800);

  useEffect(() => {
    dispatch(packsThunks.getPacks(payload));
  }, [debouncedValue]);

  const newPack = {
    name: "🦣 add new Pack",
  };

  const addNewPack = () => {
    dispatch(packsThunks.addPack(newPack));
  };
  const studyPack = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.id);
  };
  const renamePack = (e: MouseEvent<HTMLDivElement>) => {
    const newName = {
      _id: e.currentTarget.id,
      name: " 🦁 new name pack 111!!!",
    };
    dispatch(packsThunks.changePack(newName));
  };
  const deletePack = (e: MouseEvent<HTMLDivElement>) => {
    dispatch(packsThunks.deletePack(e.currentTarget.id));
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const showPack = (e: MouseEvent<HTMLSpanElement>) => {
    // console.log(e.currentTarget.innerHTML);
  };

  const changeRange = (event: any, value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinMax([value[0], value[1]]);
    }
  };
  const changeMinMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.id, +e.currentTarget.value);
    if (e.currentTarget.id === "minValue")
      setMinMax([+e.currentTarget.value, minMax[1]]);
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
        <div className={s.filter}>
          <span className={s.filterTitle}>Search</span>
          <Paper
            sx={{
              width: "413px",
              height: "36px,",
              bgcolor: "#FFFFFF",
              border: "1px solid #D9D9D9",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              boxShadow: "none",
            }}
          >
            <SearchIcon
              sx={{
                width: "17px",
                height: "17px",
                margin: "10px 14px",
                opacity: "0.5",
              }}
            />
            <InputBase
              sx={{ fontWeight: "400", fontSize: "14px", lineHeight: "24px" }}
              placeholder="Provide your text"
              inputProps={{ "aria-label": "search" }}
              onChange={searchHandler}
            />
          </Paper>
        </div>
        <div className={s.filter}>
          <span className={s.filterTitle}>Show packs cards</span>
          <div className={s.showPackTumbler}>
            <span className={s.show} onClick={showPack}>
              My
            </span>
            <span className={s.show + " " + s.active} onClick={showPack}>
              All
            </span>
          </div>
        </div>
        <div className={s.filter}>
          <span className={s.filterTitle}>Number of cards</span>
          <div className={s.rangeBlock}>
            <input
              id="minValue"
              className={s.number}
              value={minMax[0]}
              onChange={changeMinMaxValue}
            ></input>
            <Slider
              sx={{
                // стили для слайдера // пишет студент
                width: "155px",
                height: "5px",
                color: "#366EFF",
                borderRadius: "10px",
                track: { opacity: "0.5", background: "#366EFF" },
              }}
              size="small"
              onChangeCommitted={changeRange}
              min={minCardsCount}
              max={maxCardsCount}
              value={[minMax[0], minMax[1]]}
              // valueLabelDisplay="on"
            />
            <input
              id="maxValue"
              className={s.number}
              value={minMax[1]}
              onChange={changeMinMaxValue}
            ></input>
          </div>
        </div>
        <div className={s.filter}>
          <img
            className={s.filterRemove}
            src={filterRemove}
            alt="filterRemove"
          />
        </div>
      </div>
      {packs && (
        <div className={s.tableBlock}>
          <div className={s.packHeader}>
            <div>Name</div>
            <div>Cards</div>
            <div>Last Updated</div>
            <div>Created by</div>
            <div>Actions</div>
          </div>
          {packs.map((pack) => (
            <div key={pack._id} className={s.packRow}>
              <div>{pack.name}</div>
              <div>{pack.cardsCount}</div>
              <div>{pack.updated}</div>
              <div>{pack.user_name}</div>
              <div className={s.actions}>
                {myID === pack.user_id ? (
                  <>
                    <div id={pack._id} onClick={studyPack}>
                      <img src={teacher} alt="teacher" />
                    </div>
                    <div id={pack._id} onClick={renamePack}>
                      <img src={pencil} alt="pencil" />
                    </div>
                    <div id={pack._id} onClick={deletePack}>
                      <img src={trash} alt="trash" />
                    </div>
                  </>
                ) : (
                  <div id={pack._id} onClick={studyPack}>
                    {" "}
                    <img src={teacher} alt="teacher" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
