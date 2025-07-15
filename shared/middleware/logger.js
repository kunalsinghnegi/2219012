import axios from "axios";

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrdW5hbG5lZ2kyNTNAZ21haWwuY29tIiwiZXhwIjoxNzUyNTU2NjcxLCJpYXQiOjE3NTI1NTU3NzEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2NTRmNTFjOC1mODk4LTRlNGQtODBkOC05ZDI3NGNkMGIyMmYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrdW5hbCBzaW5naCBuZWdpIiwic3ViIjoiMjU5NTg1NGUtMTY5ZS00ZjczLWI1ODUtYTg3Y2QyOGU4Njk2In0sImVtYWlsIjoia3VuYWxuZWdpMjUzQGdtYWlsLmNvbSIsIm5hbWUiOiJrdW5hbCBzaW5naCBuZWdpIiwicm9sbE5vIjoiMjIxOTAxMiIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6IjI1OTU4NTRlLTE2OWUtNGY3My1iNTg1LWE4N2NkMjhlODY5NiIsImNsaWVudFNlY3JldCI6IlFCZ0pweU1aTnpSZFV5VFAifQ.0-AuybRIRb6mG71Ha4ug3ZwEQHklqsHwA2Dc-OC1KNM";

const stacks = ["backend", "frontend"];
const levels = ["debug", "info", "warn", "error", "fatal"];
const backendPackages = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
];
const frontendPackages = ["api"];

export async function Log(stack, level, pkg, message) {
  try {
    if (!stacks.includes(stack)) throw new Error("Invalid stack");
    if (!levels.includes(level)) throw new Error("Invalid level");

    const validPackages =
      stack === "backend" ? backendPackages : frontendPackages;
    if (!validPackages.includes(pkg)) throw new Error("Invalid package");

    const payload = {
      stack,
      level,
      package: pkg,
      message,
    };

    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      payload,
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      console.error("Failed to send log:", response.data);
    }
  } catch (err) {
    console.error("Logging error:", err.message || err);
  }
}
