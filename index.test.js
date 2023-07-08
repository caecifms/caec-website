const request = require("supertest");
const { sequelize } = require("./database");
const app = require("./server");

// TODO: make all tests
describe("Should test Auth/users Endpoints.", () => {
  it("Should sign-up user.", async () => {
    const response = await request(app)
      .post("/auth/sign-up")
      .send({
        name: "teste",
        surname: "teste",
        password: "teste",
        email: "teste@email.com",
        ra: "000000"
      })
  });

  it("Should sign-in user.", async () => {
    const response = await request(app)
    .post("/auth/sign-in")
    .send({
      email: "teste@email.com",
      password: "teste"
    })
  })

  it("Should logout user.", async () => {
    const response = await request(app)
    .get("/auth/sign-out");
  })

  it("Should sign-in user again.", async () => {
    const response = await request(app)
    .post("/auth/sign-in")
    .send({
      email: "teste@email.com",
      password: "teste"
    })
  })

  it("Should delete user account.", async () => {
    const response = await request(app)
    .delete("/users/delete");
  })
  
});

afterAll(async () => {
  try
  {
    await sequelize.close();
  }
  catch(error)
  {
    console.log(error);
  }
});