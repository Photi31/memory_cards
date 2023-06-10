import s from "features/packs/Packs.module.css";
import { Slider } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, useDebounce } from "common/hooks";
import { packsAction } from "features/packs/packs.slice";

export const MySlider = () => {
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount);
  const [minMax, setMinMax] = useState<number[]>([
    minCardsCount,
    maxCardsCount,
  ]);
  const debouncedValue = useDebounce<number[]>(minMax, 800);
  const dispatch = useAppDispatch();

  const changeRange = (event: any, value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinMax([value[0], value[1]]);
    }
  };
  const changeMinMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "minValue")
      setMinMax([+e.currentTarget.value, minMax[1]]);
    else if (e.currentTarget.id === "maxValue")
      setMinMax([minMax[0], +e.currentTarget.value]);
  };

  useEffect(() => {
    console.log(minMax);
    dispatch(
      packsAction.setMinMax({
        min: minMax[0],
        max: minMax[1],
      })
    );
  }, [debouncedValue]);

  return (
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
  );
};
