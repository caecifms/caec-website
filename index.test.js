const request = require("supertest");
const { sequelize } = require("./database");
const users = require("./src/models/users");
const app = require("./server");

let cookie = ''

describe("Should test Auth/users Endpoints.", () => {
  it("Should sign-up user.", (done) => {
    request(app)
      .post("/auth/sign-up")
      .send({
        name: "name",
        surname: "surname",
        password: "password",
        email: "test@test.com",
        ra: "000000"
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  })

  it("Should sign-in user.", (done) => {
    request(app)
      .post("/auth/sign-in")
      .send({
        email: "test@test.com",
        password: "password"
      })
      .then(response => {
        cookie = response.headers['set-cookie'];
        expect(response.statusCode).toBe(200);
        done();
      })
  });

  it("Should update user data.", (done) => {
    request(app)
      .put("/users/update")
      .set('Content-Type', 'application/json')
      .set('Cookie', cookie)
      .send({
        change: {
          name: "new_name"
        }
      })
      .then(response => {
        expect(response.statusCode).toBe(202);
        done();
      })
  });

  it("Should logout user.", (done) => {
    request(app)
      .get("/auth/sign-out")
      .set('Cookie', cookie)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      })
  });

  it("Should sign-in user again.", (done) => {
    request(app)
      .post("/auth/sign-in")
      .send({
        email: "test@test.com",
        password: "password"
      })
      .then(response => {
        cookie = response.headers['set-cookie'];
        expect(response.statusCode).toBe(200);
        done();
      })
  });

  it("Should delete user account.", (done) => {
    request(app)
      .delete("/users/delete")
      .set('Cookie', cookie)
      .then(response => {
        expect(response.statusCode).toBe(202);
        done();
      })
  });

});

afterAll(async () => {
  try {
    await sequelize.close();
  }
  catch (error) {
    console.log(error);
  }
});