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

describe("/api/articles", () => {
  test("happy path test - seeing if the end point returns a status 200", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: articles }) => {
        expect(articles).toBeSorted({ descending: true });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("api/articles/:article_id", () => {
  test("happy path of entering a valid article_id and returning a 200 status response", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: article }) => {
        expect.objectContaining({
          author: expect.any(String),
          title: expect.any(String),
          article_id: expect.any(Number),
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });
  test("receiving a request for an article_id that doesn't exist", () => {
    return request(app)
      .get("/api/articles/321")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("not found");
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test.only("if given an article id (e.g. article_id=1) it returns the comments for that article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: comments }) => {
        console.log(comments);
      });
  });
});
