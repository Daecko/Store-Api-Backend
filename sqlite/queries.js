
export const COLLECTIONS = `
    SELECT c.id AS col_id, c.title, i.id AS item_id, i.name, i.price, i.imageurl
    FROM collections c
    JOIN items i ON i.collection_id = c.id
    ORDER BY c.id, c.title, i.name;
`;

export const IS_MAIL_REGISTERED = `
    SELECT EXISTS (SELECT 1 FROM users WHERE email = $1) AS exist;
`;

export const USER_BY_EMAIL = `
    SELECT id, email, password
    FROM users
    WHERE email = $1;
`;

export const USER_BY_ID = `
    SELECT id, displayName, email
    FROM users
    WHERE id = $1;
`;

export const ADD_USER = `
    INSERT INTO users (displayName, email, password)
    VALUES ($1, $2, $3)
    RETURNING id;
`;

export const LAST_ID = "SELECT lastval() as id";

/* export const COLLECTIONS = `
    SELECT c.id as col_id, c.title, i.id as item_id, i.name, i.price, i.imageUrl
    FROM collections c, items i
    WHERE i.collection_id = c.id
    ORDER BY c.id, c.title, i.name;
    `;

export const IS_MAIL_REGISTERED = `
      SELECT COUNT(id)>0 as exist
      FROM users
      WHERE email = ?;
    `;

export const USER_BY_EMAIL = `
      SELECT id, email, password
      FROM users
      WHERE email = ?;
    `;

export const USER_BY_ID = `
      SELECT id, displayName, email
      FROM users
      WHERE id = ?;
    `;

export const ADD_USER = `INSERT INTO users (id, displayName, email, password) 
      VALUES (null, ?, ?, ?);
    `;

export const LAST_ID = "SELECT last_insert_rowid() as id";
 */