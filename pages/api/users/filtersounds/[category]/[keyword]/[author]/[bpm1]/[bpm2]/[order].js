import nc from "next-connect";
import db from '../../../../../../../../../server/util/queries'
import HttpError from "../../../../../../../../../server/models/http-error";

const handler = nc()
  .get(async (req, res, next) => {
    let { category, keyword, author, bpm1, bpm2, order } = req.query;


  let testArray = [keyword, author];



  let blankFilters = false;
  let anyBpm = false;

  if (keyword === 'none' && author === 'none') {
    blankFilters = true;
  }

  if ((bpm1 === 'none' && bpm2 === 'none') || category === 'fx') {
    anyBpm = true;
  } else if (bpm1 !== 'none' && bpm2 === 'none') {
    bpm2 = 999;
  } else if (bpm1 === 'none' && bpm2 !== 'none') {
    bpm1 = 0;
  }
  
  let client;

  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  let filterQuery;

  let orderByText;

  const getOrderTextwithAnd = (orderType) => {
    switch(orderType) {
      case 'title': 
        return 'ORDER BY name ASC'
      case 'downloads': 
        return 'ORDER BY downloads DESC'
      case 'reposts': 
        return 'AND array_length(reposts, 1) != 0 ORDER BY array_length(reposts, 1) DESC'
      case 'likes': 
        return 'AND array_length(favs, 1) != 0 ORDER BY array_length(favs, 1) DESC'
      case 'comments': 
        return 'AND array_length(comments, 1) != 0 ORDER BY array_length(comments, 1) DESC'
    }
  }

  const getOrderTextwithWhere = (orderType) => {
    switch(orderType) {
      case 'title': 
        return 'ORDER BY name ASC'
      case 'downloads': 
        return 'ORDER BY downloads DESC'
      case 'reposts': 
        return 'WHERE array_length(reposts, 1) != 0 ORDER BY array_length(reposts, 1) DESC'
      case 'likes': 
        return 'WHERE array_length(favs, 1) != 0 ORDER BY array_length(favs, 1) DESC'
      case 'comments': 
        return 'WHERE array_length(comments, 1) != 0 ORDER BY array_length(comments, 1) DESC'
    }
  }

  if (!blankFilters && anyBpm) {
    const keywordsArray = [];
    orderByText = getOrderTextwithAnd(order);

    for (let i = 0; i < 2; i++) {
      if (testArray[i] !== "none") {
        keywordsArray.push(testArray[i]);
      }
    }

    if (keywordsArray.length === 2) {
      filterQuery = {
        name: "filter-browse-noprevquery",
        text:
          "SELECT * FROM SOUNDS WHERE document_with_weights @@ plainto_tsquery('english', $1) AND document_with_weights @@ plainto_tsquery('english', $2) AND category = $3 "+orderByText+' LIMIT 15',
        values: [keywordsArray[0], keywordsArray[1], category]
      };
    } else {
      filterQuery = {
        name: "filter-browse-noprevquery",
        text:
          "SELECT * FROM SOUNDS WHERE document_with_weights @@ plainto_tsquery('english', $1) AND category = $2 "+orderByText+' LIMIT 15',
        values: [keywordsArray[0], category]
      };
    }
  
    let foundSound;
  
    try {
      foundSound = await client.query(filterQuery.text, filterQuery.values);
    } catch (err) {
        return next(err);
    } finally {
      client.release();
    }
  
    let lastQuery = {
      text: filterQuery.text,
      vals: filterQuery.values,
      lastOrder: orderByText
    };
  
    res.status(200).json({ results: foundSound.rows, lastQuery: lastQuery });

  
  
  
  } else if (blankFilters && anyBpm) {

    orderByText = getOrderTextwithAnd(order)
    
    filterQuery = {
      name: "filter-browse-noprevquery",
      text:
        "SELECT * FROM SOUNDS WHERE category = $1 "+orderByText+' LIMIT 15',
      values: [category],
    };
    let foundSound;
  
    try {
      foundSound = await client.query(filterQuery.text, filterQuery.values);
    } catch (err) {
        return next(err);
    } finally {
      client.release();
    }
  
    let lastQuery = {
      text: filterQuery.text,
      vals: filterQuery.values,
      lastOrder: orderByText
    };

    
    
    res.status(200).json({ results: foundSound.rows, lastQuery: lastQuery });
  } else if (blankFilters && !anyBpm) {

    orderByText = getOrderTextwithAnd(order)
    
    filterQuery = {
      name: "filter-browse-noprevquery",
      text:
        "SELECT * FROM SOUNDS WHERE bpm >= $1 AND bpm <= $2 AND category = $3 "+orderByText+' LIMIT 15',
      values: [bpm1, bpm2, category]
    };
    let foundSound;
  
    try {
      foundSound = await client.query(filterQuery.text, filterQuery.values);
    } catch (err) {
        const regExBpm = /invalid input syntax for type integer/gi;

      let error;
      if (regExBpm.test(err.message)) {
        error = HttpError('BPM Field must be a number', 500, res)
      } else {
        error = HttpError('Something went wrong, please check your inputs', 500, res)
      }

  
      return next(error);
    } finally {
      client.release();
    }
  
    let lastQuery = {
      text: filterQuery.text,
      vals: filterQuery.values,
      lastOrder: orderByText
    };

    
    res.status(200).json({ results: foundSound.rows, lastQuery: lastQuery });

  } else if (!blankFilters && !anyBpm) {
    const keywordsArray = [];
    orderByText = getOrderTextwithAnd(order);

    for (let i = 0; i < 2; i++) {
      if (testArray[i] !== "none") {
        keywordsArray.push(testArray[i]);
      }
    }

    if (keywordsArray.length === 2) {
      filterQuery = {
        name: "filter-browse-noprevquery",
        text:
          "SELECT * FROM SOUNDS WHERE document_with_weights @@ plainto_tsquery('english', $1) AND document_with_weights @@ plainto_tsquery('english', $2) AND bpm >= $3 AND bpm <= $4 AND category = $5 "+orderByText+' LIMIT 15',
        values: [keywordsArray[0], keywordsArray[1], bpm1, bpm2, category]
      };
    } else {
      filterQuery = {
        name: "filter-browse-noprevquery",
        text:
          "SELECT * FROM SOUNDS WHERE document_with_weights @@ plainto_tsquery('english', $1) AND bpm >= $2 AND bpm <= $3 AND category = $4 "+orderByText+' LIMIT 15',
        values: [keywordsArray[0], bpm1, bpm2, category]
      };
    }
  
    let foundSound;
  
    try {
      foundSound = await client.query(filterQuery.text, filterQuery.values);
    } catch (err) {
        const regExBpm = /invalid input syntax for type integer/gi;

      let error;
      if (regExBpm.test(err.message)) {
        error = HttpError('BPM Field must be a number', 500, res)
      } else {
        error = HttpError('Something went wrong, please check your inputs', 500, res)
      }

      return next(error);
    } finally {
      client.release();
    }
  
    let lastQuery = {
      text: filterQuery.text,
      vals: filterQuery.values,
      lastOrder: orderByText
    };
  
    res.status(200).json({ results: foundSound.rows, lastQuery: lastQuery });

  
  
  
  
  }
  })
export default handler;

