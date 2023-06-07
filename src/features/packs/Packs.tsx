import { useAppDispatch } from "common/hooks";
import { useEffect } from "react";
import { packsThunks } from "features/packs/packs.slice";

export const Packs = () => {
  const dispatch = useAppDispatch();
  const payload = {};

  useEffect(() => {
    dispatch(packsThunks.getPacks(payload));
  }, [dispatch, payload]);

  return (
    <div>
      <h1>Packs</h1>
    </div>
  );
};
