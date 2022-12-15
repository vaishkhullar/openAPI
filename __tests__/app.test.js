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
      .then(({ body: { articles } }) => {
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
  test("receieving a 404 if the route is not valid", () => {
    return request(app)
      .get("/api/article/22")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Route not found");
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("if given an article id (e.g. article_id=1) it returns the comments for that article", () => {
    const dateRegex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/;
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body: { comments } }) => {
        comments.forEach((comment) => {
          expect.objectContaining({
            comment_id: expect.any(Number),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.stringMatching(dateRegex),
            body: expect.any(String),
          });
        });
      });
  });
  test("if given an article id that doesn't exist response with a 404 error", () => {
    return (
      request(app)
        .get("/api/articles/4000/comments")
        // please can we check this is the right error code? :)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("not found");
        })
    );
  });

  test("if given an article id which is a string it should respond with a 404", () => {
    return request(app)
      .get("/api/articles/apples/comments")
      .expect(400)
      .then(({ body: { msg } }) => expect(msg).toBe("bad request"));
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("when given an object with an username and body it checks if the article exists and then adds the comment to the comments table", () => {
    const newComment = {
      username: "butter_bridge",
      body: "best comment ever.",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body: { comment } }) =>
        expect.objectContaining({
          author: expect(newComment.username),
          body: expect(newComment.body),
          votes: expect(0),
          article_id: expect(1),
        })
      );
  });

  test("when given a article_id that doesn't exist return a 'not-found' message", () => {
    const newComment = {
      username: "butter_bridge",
      body: "best comment ever.",
    };
    return request(app)
      .post("/api/articles/299/comments")
      .send(newComment)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("not found");
      });
  });

  test("should return a sql error if the username doesn't exist in the users table ", () => {
    const newComment = {
      username: "vaish",
      body: "best comment ever.",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("bad request");
      });
  });
});
