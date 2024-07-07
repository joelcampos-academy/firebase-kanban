import { useEffect, useState, useTransition } from "react";
import { Button } from "react-bootstrap";
import { RatingDatabaseService } from "../../services/realtime-database/rating-database.service";
import { getCurrentUser } from "../../utils/auth/get-current-user.util";

import styles from "./rating.module.css";

const AVAILABLE_RATINGS = [1, 2, 3];

const texts: Record<number, string> = {
  1: "Mal",
  2: "Normal",
  3: "Bien",
};

export default function Rating() {
  const [isLoading, setLoading] = useState(true);
  const [currentRating, setCurrentRating] = useState<number | null>(null);

  const [, startTransition] = useTransition();

  useEffect(() => {
    const user = getCurrentUser();
    RatingDatabaseService.getRatingByUserId(user.uid).then((value) => {
      startTransition(() => {
        setCurrentRating(value);
        setLoading(false);
      });
    });
  }, []);

  const setRating = (rating: number) => {
    const user = getCurrentUser();
    RatingDatabaseService.setUserRating(user.uid, rating).then(() => {
      setCurrentRating(rating);
    });
  };

  const removeRating = () => {
    const user = getCurrentUser();
    RatingDatabaseService.deleteUserRating(user.uid).then(() => {
      setCurrentRating(null);
    });
  };

  return (
    <div className={styles.container}>
      {AVAILABLE_RATINGS.map((rating) => (
        <Button
          key={rating}
          disabled={isLoading}
          variant={rating === currentRating ? "primary" : "ghost"}
          onClick={() => setRating(rating)}
        >
          {texts[rating]}
        </Button>
      ))}
      <Button onClick={removeRating} variant="danger">
        Borrar opinión
      </Button>
    </div>
  );
}
