import { useState, useEffect } from "react";
import { CreateWorkoutDetail } from "./create-workout-detail";
import { PlanDetailList, TDetailList } from "./workout-detail-list";

export const WorkoutPlanDetail = () => {
  const storageTasks: string | null = localStorage.getItem(
    "workout-detail-list",
  );

  let languages: TDetailList[] | [];

  if (storageTasks) {
    languages = JSON.parse(storageTasks);
  } else {
    languages = [];
  }

  const [detailList, setDetailList] = useState<TDetailList[]>(languages);

  useEffect(() => {
    if (detailList.length > 0) {
      console.log("workout detail list", detailList);
      localStorage.setItem("workout-detail-list", JSON.stringify(detailList));
    } else {
      localStorage.clear();
    }
  }, [detailList]);

  const handleAddDetail = (data: Omit<TDetailList, "id">) => {
    const id = crypto.randomUUID();
    const newData: TDetailList = {
      id: id,
      exercise: data.exercise,
      sets: data.sets,
      repetitions: data.repetitions,
      weight: data.weight,
      weekDuration: data.weekDuration,
      timesWeek: data.timesWeek,
    };
    setDetailList([...detailList, newData]);
  };

  const handleChangeDetail = (index: number) => {
    console.log("handleChangeDetail:", index);
  };

  const handleDeleteDetail = (index: number) => {
    console.log("handleDeleteDetail", index);
    if (index > -1) {
      detailList.splice(index, 1);
    }
    setDetailList([...detailList]);
    console.log(detailList);
  };

  return (
    <div>
      <CreateWorkoutDetail handleOnSubmit={handleAddDetail} />
      <PlanDetailList
        detailList={detailList}
        onChange={handleChangeDetail}
        onDelete={handleDeleteDetail}
      />
    </div>
  );
};
