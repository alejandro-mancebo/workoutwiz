import { useState, useEffect, useRef } from "react";
import { ModalExercise } from "./modal-exercise";
import { FunctionButton } from "../buttons";
import exercises from "./workoutwiz_db.exercise_libraries.json";

export type TExercise = {
  //  _id: string;
  exercise_name: string;
  image_url: string;
  difficulty_level: string;
  // equipment_id: ;
};

type Props = {
  onSubmit: (data: TExercise) => void;
  isOpen: boolean;
  onClose: () => void;
};

const initialNewsletterModalData = {
  // _id: "",
  exercise_name: "",
  image_url: "",
  difficulty_level: "",
};

export const FunctionalModalExercise = ({
  onSubmit,
  isOpen,
  onClose,
}: Props) => {
  const focusInputRef = useRef(null);
  const [formState, setFormState] = useState(initialNewsletterModalData);
  const [selectedRow, setSelectedRow] = useState<TExercise>(
    initialNewsletterModalData,
  );

  // useEffect(() => {
  //   if (isOpen && focusInputRef.current) {
  //     setTimeout(() => {
  //       focusInputRef.current.focus();
  //     }, 0);
  //   }
  // }, [isOpen]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormState((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onSubmit(formState);
  //   setFormState(initialNewsletterModalData);
  //   console.log(exercise._id.$oid);
  // };

  const handleSubmit = () => {
    onSubmit(selectedRow);
    setFormState(initialNewsletterModalData);
    // setFormState(selectedRow);
    console.log("selectedRow", selectedRow);
    // console.log(exercise._id.$oid);
  };

  const handleClick = (data: TExercise) => {
    const newData = {
      // _id: data._id.$oid
      exercise_name: data.exercise_name,
      image_url: data.image_url,
      difficulty_level: data.difficulty_level,
    };
    setSelectedRow(newData);
    console.log(newData);
  };

  return (
    <ModalExercise hasCloseBtn={true} isOpen={isOpen} onClose={onClose}>
      <div className="mt-4 w-[58rem] rounded-lg bg-ww-silverfrost  ">
        <div className=" rounded-t-lg bg-ww-red p-2">
          <p>Week one</p>
        </div>

        {exercises.length > 0 ? (
          <div className="h-[15rem] overflow-y-auto ">
            <table>
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Level</th>
                  <th>Equipment</th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((row, indexRow) => {
                  return (
                    <tr
                      key={indexRow}
                      onClick={() => handleClick(row)}
                      className={`${
                        row.exercise_name == selectedRow.exercise_name
                          ? "bg-ww-red-800"
                          : null
                      } hover:bg-ww-red-800`}
                    >
                      <td>{row.exercise_name} </td>
                      <td>{row.difficulty_level} </td>
                      {/* <td>{row._id.$oid} </td> */}

                      <td>{row._id.$oid}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h4 className="info">There are not workout details.</h4>
          </div>
        )}
      </div>
      <div className="mt-5">
        <FunctionButton onClick={handleSubmit}>Submit</FunctionButton>
      </div>
    </ModalExercise>
  );
};
