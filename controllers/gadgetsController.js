const Gadget = require("../models/gadgets");
const { v4: uuidv4 } = require("uuid");

const randomCodename = () => {
  const chars = uuidv4().replace(/[^A-Za-z]/g, "");
  return "The " + chars.substring(0, 10);
};

const successProbability = () => Math.floor(Math.random() * 100) + 1;

exports.getGadgets = async (req, res) => {
  try {
    const status  = req.query?.status ?? null;

    let gadgets = await Gadget.findAll();
    if (status) gadgets = gadgets.filter(gad => gad.status == status);
    const updatedGadgets = gadgets.map((gadget) => ({
      ...gadget.dataValues,
      successProbability: `${successProbability()}%`,
    }));
    res.json(updatedGadgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addGadget = async (req, res) => {
  try {
    const gadget = await Gadget.create({
      id: uuidv4(),
      name: randomCodename(),
    });
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGadget = async (req, res) => {
  console.log("Here")
  const { id } = req.params;
  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    await gadget.update(req.body);
    res.json(gadget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGadget = async (req, res) => {
  const { id } = req.params;
  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) return res.status(404).json({ error: "Gadget not found" });

    await gadget.update({
      status: "Decommissioned",
      decommissionedAt: new Date(),
    });
    res.json({ message: "Gadget decommissioned" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.selfDestruct = async (req, res) => {
  const { id } = req.params;
  const confirmationCode = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  res.json({
    message: `Self-destruct sequence initiated for gadget ${id}`,
    confirmationCode,
  });
};
