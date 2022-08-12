import nc from "next-connect";
import db from '../../../../../../../../../server/util/queries'
import HttpError from "../../../../../../../../../server/models/http-error";

const handler = nc()
  .post(async (req, res, next) => {
    let query = req.body.query;
  let lastQueryVals = req.body.vals;
  let lastOrder = req.body.lastOrder;



  let { category, keyword, author, bpm1, bpm2, order } = req.query;

  let testArray = [keyword, author];

  let blankFilters = false;
  let anyBpm = false;

  if (keyword === 'none' && author === 'none') {
    blankFilters = true;
  }

  if ((bpm1 === 'none' && bpm2 === 'none') || (category === 'fx')) {
    anyBpm = true;
  } else if (bpm1 !== 'none' && bpm2 === 'none') {
    bpm2 = 999;
  } else if (bpm1 === 'none' && bpm2 !== 'none') {
    bpm1 = 0;
  }




  const keywordsArray = [];
  for (let i = 0; i < 2; i++) {
    if (testArray[i] !== "none") {
      keywordsArray.push(testArray[i]);
    }
  }

  let client;

  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  let filterQuery;

  const regEx = /LIMIT 15/gi;
  const regExWhere = /WHERE/gi;
  const regExFilterTest = /document_with_weights{2}/gi;
  const regExGenre = /genre/gi;
  const regExTags = /tags/gi;



  let findSoundQuery = query.replace(regEx, "");

  if (lastOrder !== 'none') {
    findSoundQuery = findSoundQuery.replace(lastOrder, "")
    
  }

  const hasAcondition = regExWhere.test(findSoundQuery);
  const hasAfilter = regExFilterTest.test(findSoundQuery);
  const hasGenreFilter = regExGenre.test(findSoundQuery);
  const hasTagFilter = regExTags.test(findSoundQuery);

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


  const getAndOrWhereTxt = (filter, condition) => {
    if (!filter && !condition) {
      return 'WHERE'
    } else {
      return 'AND'
    }
  }
  const genreTagDecider = (genre, tag) => {
    if (genre || tag) {
      if (genre && tag) {
        return ['$4', '$5', '$6', '$7'];
      } else {
        return ['$3', '$4', '$5', '$6'];
      }
    } else {
      return ['$2', '$3', '$4', '$5'];
    }
    
  }


  const [firstParam, secondParam, thirdParam, fourthParam] = genreTagDecider(hasGenreFilter, hasTagFilter);
  const andOrWhereTxt = getAndOrWhereTxt(hasAfilter, hasAcondition);


  if (blankFilters && anyBpm) {

    if (andOrWhereTxt === 'AND') {
      
      orderByText = getOrderTextwithAnd(order);
      filterQuery = {
        text: findSoundQuery + orderByText + " LIMIT 15",
        values: [...lastQueryVals],
      };
    } else {
      
      orderByText = getOrderTextwithAnd(order);
      filterQuery = {
        text: findSoundQuery + "" + orderByText + " LIMIT 15",
        values: [],
      };
    }

    
  } else if (!blankFilters && anyBpm) {
    orderByText = getOrderTextwithAnd(order);
    if (andOrWhereTxt === 'AND') {
      
      if (keywordsArray.length === 2) {
        filterQuery = {
          text:
            findSoundQuery + andOrWhereTxt +
            " document_with_weights @@ plainto_tsquery('english', "+firstParam+") AND document_with_weights @@ plainto_tsquery('english', "+secondParam+") "+ orderByText + " LIMIT 15",
          values: [...lastQueryVals, keywordsArray[0], keywordsArray[1]],
        };
      } else {
        
        filterQuery = {
          text:
            findSoundQuery + andOrWhereTxt +
            " document_with_weights @@ plainto_tsquery('english', "+firstParam+") "+ orderByText + " LIMIT 15",
          values: [...lastQueryVals, keywordsArray[0]]
        };
      }
      
    } else {
      if (keywordsArray.length === 2) {
        filterQuery = {
          text:
            findSoundQuery + andOrWhereTxt +
            " document_with_weights @@ plainto_tsquery('english', "+firstParam+") AND document_with_weights @@ plainto_tsquery('english', "+secondParam+") "+ orderByText + " LIMIT 15",
          values: [keywordsArray[0], keywordsArray[1]],
        };
      } else {
        filterQuery = {
          text:
            findSoundQuery + andOrWhereTxt +
            " document_with_weights @@ plainto_tsquery('english', "+firstParam+") "+ orderByText + " LIMIT 15",
          values: [keywordsArray[0]]
        };
      }
    }


    
  } else if (!blankFilters && !anyBpm) {
    orderByText = getOrderTextwithAnd(order);
    if (andOrWhereTxt === 'AND') {
      
      if (keywordsArray.length === 2) {
        filterQuery = {
          text:
            findSoundQuery + andOrWhereTxt +
            " document_with_weights @@ plainto_tsquery('english', "+firstParam+") AND document_with_weights @@ plainto_tsquery('english', "+secondParam+") AND bpm >= "+thirdParam+" AND bpm <= "+fourthParam+" "+ orderByText + " LIMIT 15",
          values: [...lastQueryVals, keywordsArray[0], keywordsArray[1], bpm1, bpm2],
        };
      } else {
        
        filterQuery = {
          text:
            findSoundQuery + andOrWhereTxt +
            " document_with_weights @@ plainto_tsquery('english', "+firstParam+") AND bpm >= "+secondParam+" AND bpm <= "+thirdParam+" "+ " LIMIT 15",
          values: [...lastQueryVals, keywordsArray[0], bpm1, bpm2]
        };
      }
      
    } else {
      if (keywordsArray.length === 2) {
        filterQuery = {
          text:
            findSoundQuery + andOrWhereTxt +
            " document_with_weights @@ plainto_tsquery('english', "+firstParam+") AND document_with_weights @@ plainto_tsquery('english', "+secondParam+") AND bpm >= "+thirdParam+" AND bpm <= "+fourthParam+" "+ orderByText + " LIMIT 15",
          values: [keywordsArray[0], keywordsArray[1], bpm1, bpm2],
        };
      } else {
        filterQuery = {
          text:
            findSoundQuery + andOrWhereTxt +
            " document_with_weights @@ plainto_tsquery('english', "+firstParam+") AND bpm >= "+secondParam+" AND bpm <= "+thirdParam+" "+ orderByText + " LIMIT 15",
          values: [keywordsArray[0], bpm1, bpm2]
        };
      }
    }
  } else if (blankFilters && !anyBpm) {
    if (andOrWhereTxt === 'AND') {
      orderByText = getOrderTextwithAnd(order);
      filterQuery = {
        text: findSoundQuery + " AND bpm >= "+firstParam+" AND bpm <= "+secondParam+ " " + orderByText + " LIMIT 15",
        values: [...lastQueryVals, bpm1, bpm2],
      };
    } else {
      orderByText = getOrderTextwithAnd(order);
      filterQuery = {
        text: findSoundQuery +" WHERE bpm >= "+firstParam+" AND bpm <= "+secondParam+ " " + orderByText + " LIMIT 15",
        values: [bpm1, bpm2],
      };
    }
  }

  if (lastQueryVals.length < 1) {
    filterQuery.values.unshift(...lastQueryVals);
  }

  let foundSound;
  try {
    foundSound = await client.query(filterQuery.text, filterQuery.values);
    let lastQuery = {
      text: findSoundQuery,
      vals: lastQueryVals,
      lastOrder: orderByText,
  
      lastQueryForRefresh: {
        text: filterQuery.text,
        vals: filterQuery.values
      }
    };
    
    res.status(200).json({ results: foundSound.rows, lastQuery: lastQuery });
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
  })
export default handler;

