/* 
class => classes are a template of creating Objects
constructor => used to initialize object properties
class method=> class method are created with the same syntax as object method. 
*/

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({
      ...keyword,
    });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // removing fields from the query string
    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach((el) => {
      delete queryCopy[el];
    });

    // advaced filter for price,rating etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // find product from query
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resPerpage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerpage * (currentPage - 1);
    this.query = this.query.limit(resPerpage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
