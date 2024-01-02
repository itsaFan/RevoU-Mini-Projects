const app = require("../src/app");
const request = require("supertest");
const { expect } = require("chai");

describe("Security Headers Tests", () => {
  it("should have Content-Security-Policy header", (done) => {
    request(app)
      .get("/test-cors")
      .end((err, res) => {
        //   console.log(res.headers);
        expect(res.headers).to.have.property("content-security-policy");
        done();
      });
  });

  it("should have Strict-Transport-Security header", (done) => {
    request(app)
      .get("/test-cors")
      .end((err, res) => {
        expect(res.headers).to.have.property("strict-transport-security");
        done();
      });
  });
  
  it("should have X-Frame-Options header set to SAMEORIGIN", (done) => {
    request(app)
      .get("/test-cors")
      .end((err, res) => {
        expect(res.headers).to.have.property("x-frame-options").that.equals("SAMEORIGIN");
        done();
      });
  });
});
