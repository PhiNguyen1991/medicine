const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const medicine = require("../controllers/medicine");
const swapi = require("../schemas/medicine");

// Medicine Schema mocks
const medicineMock = require("../mocks/swapi/medicine.json");

describe("Medicine", function() {
  afterEach(function() {
    // swapi.films.restore();
  });
  it("should return all the star wars films when called", async function() {
    sinon.stub(swapi, "find").returns(medicineMock);
    const response = await medicine.medicineList();
    expect(response).to.deep.equal(medicineMock);
  });
  it("should return a specify medicine", async function() {
    const id = "5f68263af4faf3228ff17dd2";
    sinon
      .stub(swapi, "findOne")
      .withArgs({ _id: id })
      .returns(medicineMock[0]);

    const response = await medicine.medicineGet(id);
    expect(response).to.deep.equal(medicineMock[0]);
  });
  it("should create a medicine", async function() {
    const data = {
      name: "test",
      price: "1",
    };
    sinon.stub(swapi, "create").returns(data);
    const createdData = await medicine.medicineCreate(data);

    expect(data).to.deep.equal(({ name, price } = createdData));
  });
  it("should update medince correctly", async function() {
    const data = {
      name: "test",
      price: "1",
    };
    sinon.stub(swapi, "find").returns(medicineMock);
    const response = await medicine.medicineUpdate();
    expect(response).to.deep.equal(medicineMock);
  });
});
