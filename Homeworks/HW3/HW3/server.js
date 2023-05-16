const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const { error } = require("console");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "world",
});
pool.query("SELECT * FROM city", (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("connection made");
});

// Check if a value exists in a column of a table
function contains(val, col_name, table_name) {
  pool.query(
    `SELECT COUNT(*) AS count FROM ${table_name} WHERE ${col_name} = ?;`, [val], (error, results) => {
      if (error) throw error;
      console.log("Contains");
      console.log(results);
      return results.rowCount > 0;
    }
  );
}

// Find the difference in languages spoken between two country
function diff_lang(country1, country2) {
  pool.query(
    `SELECT cl1.language FROM countrylanguage AS cl1 WHERE cl1.countrycode IN (SELECT Code FROM country WHERE Name = ?) AND cl1.language NOT IN (SELECT cl2.language FROM countrylanguage AS cl2 WHERE cl2.countrycode IN (SELECT Code FROM country  WHERE Name = ?)); `, [country1, country2], (error, results) => {
      if (error) throw error;
      console.log("diff_lang");
      console.log(results);
      return results;
    }
  );
}

/// Join the languages spoken in two country
function diff_lang_join(country1, country2) {
  pool.query(
    `SELECT cl1.language FROM countrylanguage AS cl1 WHERE cl1.countrycode IN (SELECT Code FROM country WHERE Name = ?) AND cl1.language NOT IN (SELECT cl2.language FROM countrylanguage AS cl2 WHERE cl2.countrycode IN (SELECT Code FROM country WHERE Name = ?));`, [country2, country1], (error, results) => {
      if (error) throw error;
      console.log("diff_lang_join");
      console.log(results);
      return results;
    }
  );
}

// Aggregate data for country based on a specific type of aggregation
function aggregate_country(agg_type, country_name) {
  pool.query(
    `SELECT c.Name, MAX(c.LifeExpectancy) AS LifeExpectancy,  c.GovernmentForm AS GovernmentForm,  cl.Language AS Language FROM country AS c JOIN countrylanguage AS cl ON c.Code = cl.CountryCode WHERE c.LifeExpectancy > (SELECT ${agg_type}(LifeExpectancy) FROM country) AND c.LifeExpectancy < (SELECT LifeExpectancy FROM country WHERE Name = ?) AND cl.IsOfficial = 'T'  GROUP BY c.Name, c.GovernmentForm, cl.Language;`, [country_name], (error, results) => {
      if (error) throw error;
      console.log("aggregate_country");
      console.log(results);
      return results;
    }
  );
}

// Find the minimum and maximum number of country in each continent
function find_min_max_continent() {
  pool.query(
    `SELECT c.Continent, c.Name, c.LifeExpectancy FROM country AS c WHERE c.LifeExpectancy = (SELECT MAX(LifeExpectancy) FROM country AS c2 WHERE c2.Continent = c.Continent) OR c.LifeExpectancy = (SELECT MIN(LifeExpectancy) FROM country AS c2 WHERE c2.Continent = c.Continent);`, (error, results) => {
      if (error) throw error;
      console.log("find_min_max_continent");
      console.log(results);
      return results.rows.map((r) => ({
        continent: r.continent,
        name: r.name,
        lifeexpectancy: r.lifeexpectancy,
      }));
    }
  );
}

// Find country where a given percentage of the population speaks a specific language
function find_country_languages(percentage, language) {
  pool.query(
    `SELECT c.Name, cl.Language, cl.Percentage FROM country AS c OIN countrylanguage AS cl ON c.Code = cl.CountryCode WHERE cl.Language = ? AND cl.Percentage > ?;`,
    [language, percentage],
    (error, results) => {
      if (error) throw error;
      console.log("find_country_languages");
      console.log(results);
      return results.rows.map((r) => r.name);
    }
  );
}

// Find the top country by a specific amount
function find_country_count(amount) {
  pool.query(
    `SELECT c.Name, MAX(c.LifeExpectancy) AS LifeExpectancy, c.Continent FROM country AS c WHERE (SELECT COUNT(*) FROM city WHERE CountryCode = c.Code) > ? GROUP BY c.Continent, c.Name HAVING MAX(c.LifeExpectancy) = (SELECT MAX(c1.LifeExpectancy) FROM country AS c1 WHERE c1.Continent = c.Continent AND (SELECT COUNT(*) FROM city WHERE CountryCode = c1.Code) > ?);`,
    [amount, amount],
    (error, results) => {
      if (error) throw error;
      console.log("find_country_count");
      console.log(results);
      return results.rows.map((r) => r.name);
    }
  );
}

app.get("/contains", (req, res) => {
  const { val, col_name, table_name } = req.query;
  contains(val, col_name, table_name, (error, result) => {
    if (error) throw error;
    res.json({ result });
  });
});

app.get("/getDiffLang", (req, res) => {
  res.sendFile(__dirname + "/q2.html");
  const { country1, country2 } = req.query;
  diff_lang(country1, country2, (error, results) => {
    if (error) throw error;
    res.json({ languages });
  });
});

app.get("/getDiffLangJoin", (req, res) => {
  const { country1, country2 } = req.query;
  diff_lang_join(country1, country2, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/aggregatecountry", (req, res) => {
  res.sendFile(__dirname + "/q4.html");
  const { agg_type, country_name } = req.query;
  aggregate_country(agg_type, country_name, (error, results) => {
    if (error) throw error;
    res.json({ results });
  });
});

app.listen("3333", () => {
  console.log("listening on http://localhost:3333");
});
