import Button from "components/Button/Button";
import React, { useState, useEffect, useRef } from "react";
import styles from "./ConfirmationModal.module.scss";
import { handleRemoveFromFavorites } from "utils";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { RootState } from "store";
import { setConfirmationModalActive } from "features/confimationModal/confirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const ConfirmationModal: React.FC = () => {
  const refOne = useRef<HTMLDivElement>(null);

  const favoriteCities = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const confirmationModalCity = useSelector(
    (state: RootState) => state.confirmationModalActive.confirmationModalCity
  );
  const confirmationModalActive = useSelector(
    (state: RootState) => state.confirmationModalActive.confirmationModalActive
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Element;
    if (refOne.current && !refOne.current.contains(target)) {
      dispatch(setConfirmationModalActive(false));
    } else {
      dispatch(setConfirmationModalActive(true));
    }
  };

  const notifyRemoveFromFavorites = () =>
    toast("Successfully removed from Favorites!");

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal} ref={refOne}>
        <Button
          className={styles.closeBtn}
          text={<FontAwesomeIcon icon={faX} />}
          onClick={() => {
            dispatch(setConfirmationModalActive(false));
          }}
        />
        <h2>Delete City?</h2>
        <p>{`Are you sure you want to delete ${confirmationModalCity.name}?`}</p>
        <div className={styles.btnsWrapper}>
          <Button
            text={
              <>
                Delete City <FontAwesomeIcon icon={faTrash} />
              </>
            }
            variant="danger"
            onClick={() => {
              handleRemoveFromFavorites(
                dispatch,
                confirmationModalCity,
                favoriteCities
              );
              notifyRemoveFromFavorites();
              dispatch(setConfirmationModalActive(false));
            }}
          />
          <Button
            text="Cancel"
            variant="confirmation"
            onClick={() => {
              dispatch(setConfirmationModalActive(false));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
