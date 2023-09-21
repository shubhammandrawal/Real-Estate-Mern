const router = require("express").Router();
const Property = require('../models/propertySchema');
const cloudinary = require('../middleware/cloudinary')

router.post('/', async (req, res) => {

  try {
    const uploadImg = await cloudinary.v2.uploader.upload(

      req.body.imageUrl,
      { upload_preset: "Iaranagouda" },
      async function (error, result) {
        if (error) {
          console.log("Cannot upload");
          res.sendStatus(500);
        } else {
          console.log("success");
          const imageUrl = result.secure_url;
          const lastProp = await Property.find().sort({ _id: -1 }).limit(1);
          let ppd_id = "PPD";

          if (lastProp.length != 0) {
            ppd_id = parseInt(lastProp[0].ppdId.split("D")[1]) + 1;

          } else {
            ppd_id = 1100;

          }
          const views = parseInt(Math.random() * 100);
          const dayLeft = parseInt(Math.random() * 30);

          const { length, breadth, mobile } = req.body;
          const area = parseInt(req.body.length) * parseInt(req.body.breadth);
          const property = await Property.create({
            ppdId: "PPD" + ppd_id,
            imageUrl: imageUrl,
            views: views,
            status: "Unsold",
            daysLeft: dayLeft,
            property: req.body.property,
            length,
            breadth,
            area: area,
            mobile: req.body.mobile,
            negotiable: req.body.negotiable,
            price: req.body.price,
            ownership: req.body.ownership,
            propertyAge: req.body.propertyAge,
            propApproved: req.body.propApproved,
            propDescription: req.body.propDescription,
            bankLoan: req.body.bankLoan,
            areaUnit: req.body.areaUnit,
            bhk: req.body.bhk,
            floorNum: req.body.floorNum,
            attached: req.body.attached,
            westToilet: req.body.westToilet,
            furnished: req.body.furnished,
            parking: req.body.parking,
            lift: req.body.lift,
            electricity: req.body.electricity,
            facing: req.body.facing,
            name: req.body.name,
            postedBy: req.body.postedBy,
            saleType: req.body.saleType,
            package: req.body.package,
            ppdPackage: req.body.ppdPackage,
            email: req.body.email,
            city: req.body.city,
            addArea: req.body.addArea,
            pincode: req.body.pincode,
            address: req.body.address,
            landmark: req.body.landmark,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            userid: req.user.email,

          });
          res.status(200).json({
            status: "Success",
            property,
          });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      message: err.message
    })

  }

});

router.get("/", async (req, res) => {
  try {
    const allProperty = await Property.find({ userid: req.user.email }).sort({ _id: -1 }).limit(10);
    res.status(200).json({
      status: "Success",
      property: allProperty,
    });
  }
  catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });

  }
})

router.put("/update/:id", async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      {
        property: req.body.property,
        length: req.body.length,
        breadth: req.body.breadth,
        area: parseInt(req.body.length) * parseInt(req.body.breadth),
        mobile: req.body.mobile,
        negotiable: req.body.negotiable,
        price: req.body.price,
        ownership: req.body.ownership,
        propertyAge: req.body.propertyAge,
        propApproved: req.body.propApproved,
        propDescription: req.body.propDescription,
        bankLoan: req.body.bankLoan,
        areaUnit: req.body.areaUnit,
        bhk: req.body.bhk,
        floorNum: req.body.floorNum,
        attached: req.body.attached,
        westToilet: req.body.westToilet,
        furnished: req.body.furnished,
        parking: req.body.parking,
        lift: req.body.lift,
        electricity: req.body.electricity,
        facing: req.body.facing,
        name: req.body.name,
        postedBy: req.body.postedBy,
        saleType: req.body.saleType,
        package: req.body.package,
        ppdPackage: req.body.ppdPackage,
        email: req.body.email,
        city: req.body.city,
        addArea: req.body.addArea,
        pincode: req.body.pincode,
        address: req.body.address,
        landmark: req.body.landmark,
        latitude: req.body.latitude,
        longitude: req.body.longitude,

      },

      {
        new: true,
      }
    );
    res.send(updatedProperty);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/sold/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const updateId = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      { status: "Sold", daysLeft: 0 },
      { new: true }
    );
    res.status(200).json({
      status: "Updated",
      details: updateId,
    });
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Id not found",
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({
      message: 'Property deleted successfully',
      data: deletedProperty,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;

