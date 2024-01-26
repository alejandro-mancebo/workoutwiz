import React from "react";
import { TWorkoutPlanDetails } from "./create-workout-detail";

export type TDetailList = {
  id: string;
  // exercise: string;
  // sets: string;
  // repetitions: string;
  // weight: string;
} & TWorkoutPlanDetails;

type DetailListProps = {
  detailList: TDetailList[];
  onChange: (e: any) => void;
  onDelete: (e: any) => void;
};

export const PlanDetailList = ({
  detailList,
  onChange,
  onDelete,
}: DetailListProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const index = detailList.findIndex(
      (value) => value.id === e.currentTarget.id,
    );
    onDelete(index);
  };

  return (
    <div className="mt-10 h-[15rem] w-[47rem] overflow-hidden rounded-xl bg-ww-silverfrost">
      <div className=" bg-ww-red p-2">Week one</div>
      {detailList.length > 0 ? (
        <table className=" w-full table-fixed border-e-2 border-s-2">
          {/* <thead>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Action</th>
            </tr>
          </thead> */}
          <tbody>
            {detailList.map((row, indexRow) => {
              return (
                <tr key={indexRow}>
                  <td className="w-64">{row.exercise}</td>
                  <td>{row.weekDuration} weeks</td>
                  <td>{row.timesWeek} times</td>
                  <td>{row.sets} sets</td>
                  <td>{row.repetitions} reps</td>
                  <td>
                    {row.weight} {"lbs"}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      id={row.id}
                      onClick={(e) => handleClick(e)}
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>
          <h4 className="info">There are not workout details.</h4>
        </div>
      )}
    </div>
  );
};
