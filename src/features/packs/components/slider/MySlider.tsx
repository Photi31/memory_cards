import s from "features/packs/Packs.module.css";
import { Slider } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useAppSelector } from "common/hooks";

export const MySlider = () => {
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount);
  const [minMax, setMinMax] = useState<number[]>([
    minCardsCount,
    maxCardsCount,
  ]);

  const changeRange = (event: any, value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinMax([value[0], value[1]]);
    }
  };
  const changeMinMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    //TODO debounce
    console.log(e.currentTarget.id, +e.currentTarget.value);
    if (e.currentTarget.id === "minValue")
      setMinMax([+e.currentTarget.value, minMax[1]]);
  };

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
