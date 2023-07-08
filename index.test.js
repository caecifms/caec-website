const request = require("supertest");
const database = require("./database");
const app = require("./server");

describe("Write Tests", () => {
  it("Should make tests", async () => {
    expect(2 + 2).toEqual(4);
  });
});
