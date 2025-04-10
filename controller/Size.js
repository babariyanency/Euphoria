const { Size } = require("../model/Size");

exports.fatchSize = async (req, res) => {
    try {
      const size = await Size.find({}).exec();
      res.status(200).json(size);
    } catch (err) {
      res.status(400).json(err);
    }
  };

exports.createSize = async(req, res) => {
   
    const size = new Size(
      {
        label: req.body.label,
        value: req.body.value
      }
    );
    
    try{
      const doc = await size.save();
      res.status(201).json(doc);
    } catch (err){
      res.status(400).json(err)
    }
    
  };