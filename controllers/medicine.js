const medicinSchema = require("../schemas/medicine");

/**
 * controller for get all medicines
 * @return {Promise}
 */
const medicineList = async () => {
  const swapiResponse = await medicinSchema.find({});
  return swapiResponse;
};

/**
 * controller for get a medicine
 * @return {Promise}
 */
const medicineGet = async (medId) => {
  const swapiResponse = await medicinSchema.findOne({ _id: medId });
  return swapiResponse;
};

/**
 * controller for create a medicine
 * @return {Promise}
 */
const medicineCreate = async ({ name, price }) => {
  const swapiResponse = await medicinSchema.create({
    name,
    price,
  });
  return swapiResponse;
};

/**
 * controller for update a medicine
 * @return {Promise}
 */
const medicineUpdate = async ({ id, name, price }) => {
  if (id) {
    const medicine = await medicineGet(id);
    if (medicine) {
      medicine.name = name || medicine.name;
      medicine.price = price || medicine.price;
      medicine.save();
      return medicine;
    }
  }
  throw new Error("Can not find medicine ID", id);
};

module.exports = {
  medicineList,
  medicineGet,
  medicineCreate,
  medicineUpdate,
};
