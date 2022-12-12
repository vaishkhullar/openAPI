const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const devData = require("../db/data/development-data");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  if (db.end) {
    db.end();
  }
});

// tests for /api routes

describe("/api/getTopics", () => {
  describe("testing for a 200 status", () => {
    test("/api/getTopics to return an array of objects with keys slug and description", () => {
      return request(app)
        .get("/api/getTopics")
        .expect(200)
        .then(({ body: topics }) => {
          expect(topics).toBeInstanceOf(Array);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });
});
