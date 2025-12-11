const fs = require("fs");
const path = require("path");

// Netlify Function: persist feedback to a JSON file for local/dev use only.
// IMPORTANT: On serverless platforms the filesystem is ephemeral. For production,
// replace storage with a durable backend (Airtable, DynamoDB, Supabase, etc.).

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }

  const required = ["name", "caseType", "rating", "feedback", "location"];
  for (const k of required) {
    if (!payload[k]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: `Missing field: ${k}` }),
      };
    }
  }

  if (payload.displayName !== 'yes') {
    payload.name = 'Anonymous';
  }

  const outDir = path.join(__dirname, "..", "..", "data");
  const outFile = path.join(outDir, "feedback.json");
  try {
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    let list = [];
    if (fs.existsSync(outFile)) {
      const raw = fs.readFileSync(outFile, "utf8");
      list = raw ? JSON.parse(raw) : [];
    }
    payload.timestamp = Date.now();
    list.push(payload);
    fs.writeFileSync(outFile, JSON.stringify(list, null, 2), "utf8");
  } catch (err) {
    console.error("write error", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server error" }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: true, saved: true }),
  };
};
