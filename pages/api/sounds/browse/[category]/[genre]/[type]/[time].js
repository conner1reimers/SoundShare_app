import nc from "next-connect";
import db from '../../../../../../../server/util/queries'
import HttpError from "../../../../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
    let genre = req.query.genre.toLowerCase().split(" ").join("");
    let time = req.query.time.toLowerCase();
    let type = req.query.type.toLowerCase().split(" ").join("");
    let category = req.query.category;
  
  
    if (genre === "hip-hop") {
      genre = "hip";
    }
  
    let timeVals;
    let client;
    let findSoundQuery;
    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
  
      return next(error);
    }
  
    let foundSound;
    try {
      if (genre !== "null" && type !== "null") {
        if (time === "alltime") {
          if (genre === "all") {
            findSoundQuery = "select * from sounds WHERE $1 like any(tags) AND category = $2";
            timeVals = [type, category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE $1 like any(tags) AND genre = $2 AND category = $3";
            timeVals = [type, genre, category];
          }
        } else if (time === "thisweek") {
          if (genre === "all") {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '7 day' AND $1 like any(tags) AND category = $2";
            timeVals = [type, category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '7 day' AND $1 like any(tags) AND genre = $2 AND category = $3";
            timeVals = [type, genre, category];
          }
        } else if (time === "today") {
          if (genre === "all") {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '1 day' AND $1 like any(tags) AND category = $2";
            timeVals = [type, category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '1 day' AND $1 like any(tags) AND genre = $2 AND category = $3";
            timeVals = [type, genre, category];
          }
        } else if (time === "thisyear") {
          if (genre === "all") {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '365 day' AND $1 like any(tags) AND category = $2";
            timeVals = [type, category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '365 day' AND $1 like any(tags) AND genre = $2 AND category = $3";
            timeVals = [type, genre, category];
          }
        } else if (time === "thismonth") {
          if (genre === "all") {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '31 day' AND $1 like any(tags) AND category = $2";
            timeVals = [type, category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '31 day' AND $1 like any(tags) AND genre = $2 AND category = $3";
            timeVals = [type, genre, category];
          }
        }
      } else if (genre !== "null" && type === "null") {
        if (time === "alltime") {
          if (genre === "all") {
            findSoundQuery = "select * from sounds WHERE category = $1";
            timeVals = [category];
          } else {
            findSoundQuery = "select * from sounds WHERE genre = $1 AND category = $2";
            timeVals = [genre, category];
          }
        } else if (time === "thisweek") {
          if (genre === "all") {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '7 day' AND category = $1";
            timeVals = [category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '7 day' AND genre = $1 AND category = $2";
            timeVals = [genre, category];
          }
        } else if (time === "today") {
          if (genre === "all") {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '1 day' AND category = $1";
            timeVals = [category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '1 day' AND genre = $1 AND category = $2";
            timeVals = [genre, category];
          }
        } else if (time === "thisyear") {
          if (genre === "all") {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '365 day' AND category = $1";
            timeVals = [category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '365 day' AND genre = $1 AND category = $2";
            timeVals = [genre, category];
          }
        } else if (time === "thismonth") {
          if (genre === "all") {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '31 day' AND category = $1";
            timeVals = [category];
          } else {
            findSoundQuery =
              "select * from sounds WHERE date_time > current_date - interval '31 day' AND genre = $1 AND category = $2";
            timeVals = [genre, category];
          }
        }
      } else if (genre === "null" && type !== "null") {
        if (time === "alltime") {
          findSoundQuery = "select * from sounds WHERE $1 like any(tags) AND category = $2";
          timeVals = [type, category];
        } else if (time === "thisweek") {
          findSoundQuery =
            "select * from sounds WHERE date_time > current_date - interval '7 day' AND $1 like any(tags) AND category = $2";
          timeVals = [type, category];
        } else if (time === "today") {
          findSoundQuery =
            "select * from sounds WHERE date_time > current_date - interval '1 day' AND $1 like any(tags) AND category = $2";
          timeVals = [type, category];
        } else if (time === "thisyear") {
          findSoundQuery =
            "select * from sounds WHERE date_time > current_date - interval '365 day' AND $1 like any(tags) AND category = $2";
          timeVals = [type, category];
        } else if (time === "thismonth") {
          findSoundQuery =
            "select * from sounds WHERE date_time > current_date - interval '31 day' AND $1 like any(tags) AND category = $2";
          timeVals = [type, category];
        }
      } else {
        if (time === "alltime") {
          findSoundQuery = "select * from sounds WHERE category = $1";
          timeVals = [category];
        } else if (time === "thisweek") {
          findSoundQuery =
            "select * from sounds WHERE date_time > current_date - interval '7 day' AND category = $1";
          timeVals = [category];
        } else if (time === "today") {
          findSoundQuery =
            "select * from sounds WHERE date_time > current_date - interval '1 day' AND category = $1";
          timeVals = [category];
        } else if (time === "thisyear") {
          findSoundQuery =
            "select * from sounds WHERE date_time > current_date - interval '365 day' AND category = $1";
          timeVals = [category];
        } else if (time === "thismonth") {
          findSoundQuery =
            "select * from sounds WHERE date_time > current_date - interval '31 day' AND category = $1";
          timeVals = [category];
        }
      }
  
  
      findSoundQuery += " LIMIT 15";
      foundSound = await client.query(findSoundQuery, timeVals);
  
 
    } catch (err) {
      return next(err);
    } finally {
      client.release();
    }
  
    let lastQuery = {
      text: findSoundQuery,
      vals: timeVals,
      lastQueryForRefresh: {
        text: findSoundQuery,
        vals: timeVals
      }
    };
    res.status(200).json({ results: foundSound.rows, lastQuery: lastQuery });
  
})
export default handler;

  