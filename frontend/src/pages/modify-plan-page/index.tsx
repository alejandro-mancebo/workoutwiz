import { useState } from "react";
import {
  FunctionalModalExercise,
  TExercise,
} from "../../components/modal-exercise/functional-modal-exercise";
import { FunctionButton } from "../../components/buttons";
import "./app.css";
import { Card, CardData } from "../../components/input-element/card";
import IMAGES from "../../assets/images";

const exerciseData = {
  // _id: "",
  exercise_name: "Exercise",
  image_url: "",
  difficulty_level: "Difficulty level",
};

const initialCardData: CardData = {
  src: IMAGES.exercise_1.img,
  alt: IMAGES.exercise_1.alt,
  title: "Chest1",
};

export const ModifyPlanPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(exerciseData);
  const [cardData, setCardData] = useState(initialCardData);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (data: TExercise) => {
    console.log("Newsletter data", data);
    console.log("modalData", modalData);
    setModalData(data);
    setCardData({
      src: data.image_url,
      alt: data.exercise_name + " exercising",
      title: data.exercise_name,
    });
    handleCloseModal();
  };

  return (
    <>
      <Card cardData={cardData} onClick={handleOpenModal} />
      {/* <div className="flex gap-1 ">
        <FunctionButton onClick={handleOpenModal}>
          Open Newsletter Form (Modal)
        </FunctionButton>
      </div> */}

      {/* <div className="msg-box">
        {modalData ? (
          <>
            <h2>{modalData.exercise_name}</h2>
            <h3>{modalData.difficulty_level}</h3>
          </>
        ) : (
          "Exercise Name"
        )}
      </div> */}

      <FunctionalModalExercise
        isOpen={isModalOpen}
        onSubmit={handleFormSubmit}
        onClose={handleCloseModal}
      />
    </>
  );
};
