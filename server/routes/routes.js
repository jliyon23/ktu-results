const express = require('express');
const api = require('../api/api.js');
const utils = require('../utils/utils.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("API RUNNING")
});

router.post('/', async (req, res) => {
  try {
    const program = req.body.program;
    const data = await api.fetchResults(program);
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false });
  }
});

router.post('/individualResult', async (req, res) => {
  try {
    const { registerNumber, dateOfBirth, examDefId, schemeId } = req.body;

    if (!examDefId ||!schemeId) {
      throw new Error('ExamDefId and SchemeId are required.');
    }

    let data, sgpa;
    if (!registerNumber &&!dateOfBirth) {
      data = null;
      sgpa = null;
    } else {
      data = await api.fetchData(registerNumber, dateOfBirth, examDefId, schemeId);
      console.log(data);
      sgpa = utils.calculateSgpa(data.resultDetails);
    }

    res.json({ success: true, data: data, sgpa: sgpa });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;