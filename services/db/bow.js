const db = require('../../database/db.js');

const InsertNewBow = async (bow) => {
    try {        
        const data = await db.asyncInsert(bow)
        return data;
    } catch(err){
        return err;
    }
}

module.exports = {
    InsertNewBow,
}