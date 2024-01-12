import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
        email: {type: String, required: true},
        password: {type: String, required: true},
        sessionCookie: {type: String, required: false},
        verified: {type: Number, required: false},
        verificationSecret: {type: String, required: false},
        cookieExpireTime: {type: Number, required: false}
});

const watching = new mongoose.Schema({
        email: {type: String, required: true},
        sensorId:{type: Number, required: true},
        waterHeight:{type: Number, required: true}
})

const floodSensor = new mongoose.Schema({
        name:{type: String, required: true},
        id:{type: Number, required: true},
        lat:{type: Number, required: true},
        log:{type: Number, required: true},
        url:{type: String, required: true},
        Ya:{type: Number, required: true},
        GPSH:{type: Number, required: true}
});

const tiffextent = new mongoose.Schema({
  x1: {type: Number, required: true},
  y1: {type: Number, required: true},
  x2: {type: Number, required: true},
  y2: {type: Number, required: true},
  path: {type: String, required: false},
  sensor_name: {type: String, required: false}
})

// All of these appear as pluralized on the database side. I.E. heights, sensors, users.
const floodSensorModel = mongoose.model('sensor', floodSensor);
const userModel = mongoose.model('user', userSchema);
const watchingModel = mongoose.model('watching', watching)
const tiffExtentModel = mongoose.model('tiff_extent', tiffextent);

export {floodSensorModel, userModel, tiffExtentModel, watchingModel}
