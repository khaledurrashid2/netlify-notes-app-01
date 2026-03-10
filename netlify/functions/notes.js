import { neon } from '@netlify/neon';

export default async (req) => {

  const sql = neon();

  // ensure table exists
  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY,
      text TEXT
    )
  `;

  // GET notes
  if(req.method === "GET"){

    const rows = await sql`
      SELECT * FROM notes
      ORDER BY id DESC
    `;

    return new Response(JSON.stringify(rows),{
      headers:{
        "Content-Type":"application/json"
      }
    });

  }

  // ADD note
  if(req.method === "POST"){

    const {text} = await req.json();

    await sql`
      INSERT INTO notes(text)
      VALUES(${text})
    `;

    return new Response("ok");

  }

  // DELETE note
  if(req.method === "DELETE"){

    const {id} = await req.json();

    await sql`
      DELETE FROM notes
      WHERE id=${id}
    `;

    return new Response("deleted");

  }

  return new Response("Invalid request",{status:400});
};
