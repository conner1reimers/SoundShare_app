import nc from "next-connect";
import db from '../../../../server/util/queries'


const handler = nc()
  .get(async (req, res, next) => {
    
    let bpm = req.query.bpm;

    let searchTxt;
    let searchVals;
  
    if (!bpm || bpm == 0) {
      searchTxt = "SELECT * FROM SOUNDS LIMIT 15",
      searchVals =  []
    } else {
      searchTxt = "SELECT * FROM SOUNDS WHERE bpm = $1 LIMIT 15",
      searchVals =  [bpm]
    }
  
    let foundSound;
  
    try {
      foundSound = await db.query(searchTxt, searchVals);
    } catch (err) {
      return next(err);
    }
  
    let lastQuery = {
      text: searchTxt,
      vals: searchVals,
    };
  
    res.status(200).json({ results: foundSound.rows, lastQuery: lastQuery });

  })
export default handler;


