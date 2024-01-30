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
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const index = detailList.findIndex(
      (value) => value.id === e.currentTarget.id,
    );
    onDelete(index);
  };

  const handleEdit = (index: any) => {
    // const index = detailList.findIndex(
    //   (value) => value.id === event.currentTarget.id,
    // );
    onChange(index);
  };

  return (
    <div className="mt-10 h-[15rem] w-[47rem] table-fixed overflow-hidden  rounded-xl bg-ww-silverfrost">
      <div className=" bg-ww-red p-2">Week one</div>
      {detailList.length > 0 ? (
        <div className="h-[15rem] overflow-y-auto">
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Duration</th>
                <th>Times</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {detailList.map((row, indexRow) => {
                return (
                  <tr key={indexRow}>
                    <td>{row.exercise}</td>
                    <td>{row.sets}</td>
                    <td>{row.repetitions} </td>
                    <td>
                      {row.weight}
                      <span> ({"lbs"})</span>
                    </td>
                    <td>
                      {row.weekDuration} <span> ({"weeks"})</span>
                    </td>
                    <td>{row.timesWeek} </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        // id={row.id}
                        onClick={() => handleEdit(row.id)}
                        type="button"
                      >
                        E
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        id={row.id}
                        onClick={(event) => handleDelete(event)}
                        type="button"
                      >
                        D
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-16 text-center align-middle">
          <h4 className="font-monserrat text-xl text-ww-nightshade-500">
            There are not workout details.
          </h4>
        </div>
      )}
    </div>
  );
};
