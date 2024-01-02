const app = require("../src/app");
const request = require("supertest");
const { expect } = require("chai");
const config = require("../src/config/config");

const mainUrl = config.mainUrl;
const altUrl = config.altUrl;
const randomUrl = "http://random.com";

describe("CORS Origin Whitelist Test", () => {
  it("should allow mainUrl to use the endpoint ", (done) => {
    request(app)
      .get("/test-cors")
      .set("Origin", mainUrl)
      .end((err, res) => {
        //   console.log(res.headers);
        expect(res.header["access-control-allow-origin"]).to.equal(mainUrl);
        done();
      });
  });

  it("should allow altUrl to use the endpoint ", (done) => {
    request(app)
      .get("/test-cors")
      .set("Origin", altUrl)
      .end((err, res) => {
        //   console.log(res.headers);
        expect(res.header["access-control-allow-origin"]).to.equal(altUrl);
        done();
      });
  });
  it("should not allow randomUrl to use the endpoint ", (done) => {
    request(app)
      .get("/test-cors")
      .set("Origin", randomUrl)
      .end((err, res) => {
        //   console.log(res.headers);
        expect(res.header["access-control-allow-origin"]).to.be.undefined;
        done();
      });
  });
});

describe("CORS Preflight Method Tests", () => {
  it("should allow DELETE method from mainUrl", (done) => {
    request(app)
      .options("/test-cors")
      .set("Origin", mainUrl)
      .end((err, res) => {
        // console.log(res.headers);
        expect(res.header["access-control-allow-origin"]).to.equal(mainUrl);
        expect(res.header["access-control-allow-methods"]).to.include("DELETE");
        done();
      });
  });

  it("should not allow DELETE method from altUrl", (done) => {
    request(app)
      .options("/test-cors")
      .set("Origin", altUrl)
      .end((err, res) => {
        // console.log(res.headers);
        expect(res.header["access-control-allow-origin"]).to.equal(altUrl);
        expect(res.header["access-control-allow-methods"]).to.not.include("DELETE");
        done();
      });
  });

  it("should not allow DELETE method from randomUrl", (done) => {
    request(app)
      .options("/test-cors")
      .set("Origin", randomUrl)
      .end((err, res) => {
        expect(res.header["access-control-allow-origin"]).to.be.undefined;
        expect(res.header["access-control-allow-methods"]).to.be.undefined;
        done();
      });
  });
});
