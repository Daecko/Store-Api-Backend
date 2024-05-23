/* import sqlite3 from "sqlite3"; */
import pg from 'pg';
/* import config from "../config/default.json" with { type:"json" };
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from "path"; */
import { ADD_USER, COLLECTIONS, IS_MAIL_REGISTERED, LAST_ID, USER_BY_EMAIL, USER_BY_ID } from "./queries.js";

const { Pool } = pg
/* const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = config.DB.path; */

const pool = new Pool({
  /* PostgreSQL connection configuration */
  connectionString: "postgres://default:kbm3hI4JzeLU@ep-round-hat-a4g03w1q-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
});

export const getCollections = () => {
  const data = [];
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        reject(err);
        return;
      }
      client.query(COLLECTIONS, (err, result) => {
        done(); // Release the client back to the pool
        if (err) {
          reject(err);
          return;
        }
        result.rows.forEach((row) => {
          const { col_id, title, routeName, item_id, name, price, imageUrl } = row;
          data.push({
            col_id,
            title,
            routeName,
            item_id,
            name,
            price,
            imageUrl,
          });
        });
        resolve(data);
      });
    });
  });
};

export const isEmailRegistered = (email) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        reject(err);
        return;
      }
      client.query(IS_MAIL_REGISTERED, [email], (err, result) => {
        done(); // Release the client back to the pool
        if (err) {
          reject(err);
          return;
        }
        const exist = result.rows[0].exist;
        resolve(!!exist);
      });
    });
  });
};

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        reject(err);
        return;
      }
      client.query(USER_BY_EMAIL, [email], (err, result) => {
        done(); // Release the client back to the pool
        if (err) {
          reject(err);
          return;
        }
        resolve(result.rows[0]); // Assuming there's only one user with the given email
      });
    });
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        reject(err);
        return;
      }
      client.query(USER_BY_ID, [id], (err, result) => {
        done(); // Release the client back to the pool
        if (err) {
          reject(err);
          return;
        }
        resolve(result.rows[0]); // Assuming there's only one user with the given id
      });
    });
  });
};

export const insertUser = (displayName, email, password) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        reject(err);
        return;
      }
      client.query(
        ADD_USER,
        [displayName, email, password],
        (err) => {
          if (err) {
            done(); // Release the client back to the pool
            reject(err);
            return;
          }
          client.query(LAST_ID, [], (err, result) => {
            done(); // Release the client back to the pool
            if (err) {
              reject(err);
              return;
            }
            resolve(result.rows[0].id); // Get the ID of the newly inserted user
          });
        }
      );
    });
  });
};
