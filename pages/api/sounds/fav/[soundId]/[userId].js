import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .post(async (req, res, next) => {
    const { soundId, userId } = req.query;
  const decoded = req.userData;

  if (decoded.userId !== userId) {
    const error = HttpError(
      "You are not authorized",
      401, res
    );
    return next(error);
  }

  let hasNoFavs = false;
  let thisNotFavorited = true;

  if (!soundId || !userId) {
    const error = HttpError(
      "Could not find user and/or sound to favorite",
      500, res
    );
    return next(error);
  }

  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    client.release();
    return next(error);
  }

  let foundSound;
  const findSoundQuery = "SELECT * FROM sounds WHERE id = $1";
  const findSoundValues = [soundId];
  try {
    foundSound = await client.query(findSoundQuery, findSoundValues);
    if (!foundSound.rows[0]) {
      const error = HttpError("errrrr", 500, res);
      client.release();
      return next(error);
    }
  } catch {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  let creatorId = foundSound.rows[0].creator_id;
  let username = foundSound.rows[0].username;
  // Find current user favorites and save it to variable
  let userFavs;

  let foundUserFavs;
  const findUserFavs = "SELECT favs FROM users WHERE id = $1";
  const findUserFavsVal = [userId];
  try {
    foundUserFavs = await client.query(findUserFavs, findUserFavsVal);
    if (!foundUserFavs.rows[0].favs || foundUserFavs.rows[0].favs < 1) {
      console.log("HELLO")
      hasNoFavs = true;
      userFavs = [];
    } else {
      userFavs = foundUserFavs.rows[0].favs;
      if (userFavs.indexOf(soundId) !== -1) {
        thisNotFavorited = false;
      }
    }
  } catch {
    const error = HttpError("errrrr", 500, res);
    client.release();
    return next(error);
  }

  if (!thisNotFavorited) {
    let foundFav;
    const findFavQuery =
      "SELECT * FROM favorites WHERE user_id = $1 AND sound_id = $2";
    const findFavValues = [userId, soundId];
    const unfavQuery =
      "DELETE FROM favorites WHERE user_id = $1 AND sound_id = $2";

    const removeUserFavText =
      "UPDATE users SET favs = array_remove(favs ,$1) WHERE id = $2";
    const removeUserFavVals = [soundId, userId];

    const removeSoundFavText =
      "UPDATE sounds SET favs = array_remove(favs, $1) WHERE id = $2";
    const removeSoundFavVals = [userId, soundId];

    
    const deleteAction =
      "DELETE FROM actions WHERE user_id = $1 AND type = $2 AND target_id = $3";
    const deleteActionActionVals = [userId, "favs", soundId];

    const deleteNotification =
      "DELETE FROM notifications WHERE user_id = $1 AND type = $2 AND target_id = $3";
    const deleteNotificationActionVals = [userId, "favs", soundId];

    try {
      foundFav = await client.query(findFavQuery, findFavValues);

      if (foundFav.rows[0] && !thisNotFavorited) {
        await client.query("BEGIN");
        await client.query(unfavQuery, findFavValues);
        await client.query(removeUserFavText, removeUserFavVals);
        await client.query(removeSoundFavText, removeSoundFavVals);
        if (creatorId !== userId.toString()) {
          await client.query(deleteAction, deleteActionActionVals);
          await client.query(deleteNotification, deleteNotificationActionVals);
        } else {}

        await client.query("COMMIT");
        res.status(200).json({ msg: "unfav" });
      }
    } catch (err) {
      const error = HttpError(err, 500, res);
      await client.query("ROLLBACK");
      return next(error);
    } finally {
      client.release();
    }
  } else {
    let response;

    try {
      await client.query("BEGIN");
      const queryFavText =
        "INSERT INTO favorites (user_id, sound_id) VALUES ($1, $2)";
      const insertFavText = [userId, soundId];
      response = await client.query(queryFavText, insertFavText);

      let returned;
      if (hasNoFavs) {
        const queryNoFavText = "UPDATE users SET favs = $1 WHERE id = $2";
        const noFavVals = [`{${soundId}}`, userId];
        returned = await client.query(queryNoFavText, noFavVals);
      } else if (!hasNoFavs && thisNotFavorited) {
        const queryHasFavText =
          "UPDATE users SET favs = array_append(favs ,$1) WHERE id = $2";
        const hasFavVals = [soundId, userId];
        returned = await client.query(queryHasFavText, hasFavVals);
      }

      const date = new Date();

      const querySoundFavText =
        "UPDATE sounds SET favs = array_append(favs, $1) WHERE id = $2";
      const soundFavVals = [userId, soundId];

      if (creatorId !== userId.toString()) {
        let insertNotif =
        "INSERT INTO notifications (user_id, target_id, target_user_id, type, date, username) VALUES ($1, $2, $3, $4, $5, $6)";
        const insertNotifVals = [
          userId,
          soundId,
          creatorId,
          "favs",
          date,
          username,
        ];

        let insertAction =
          "INSERT INTO actions (user_id, target_id, type, date) VALUES ($1, $2, $3, $4)";
        const insertActionVals = [userId, soundId, "favs", date];

        await client.query(insertAction, insertActionVals);
        await client.query(insertNotif, insertNotifVals);
      } else {}

      await client.query(querySoundFavText, soundFavVals);

      await client.query("COMMIT");

      res.status(200).json({ msg: "fav" });
    } catch (err) {
      const error = HttpError(err, 500, res);
        await client.query("ROLLBACK");
      return next(error);
    } finally {
      client.release();
    }


}})
export default handler;


