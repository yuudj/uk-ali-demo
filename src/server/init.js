var mongoose = require('mongoose'),
    tree = require('mongoose-path-tree'),
    Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');

var DevSchema = new Schema({
    _id: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9-_]+$/.test(v);
            },
            message: '{VALUE} es invalido'
        }
    },
    devType: {
        type: String,
        enum: 'loc dev sens fold'.split(' ')
    },
    displayName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});



DevSchema.plugin(tree, {
    pathSeparator: '/',              // Default path separator 
    onDelete: 'DELETE',       // Can be set to 'DELETE' or 'REPARENT'. Default: 'REPARENT' 
    numWorkers: 5,                // Number of stream workers 
    idType: String  // Type used for _id. Can be, for example, String generated by shortid module 
});

var Devices = mongoose.model('Devices', DevSchema); // Devices

var locCount = 0;
var devCount = 0;
var sensCount = 0;

function createLocation(locationName, devices, sensors) {
    locCount++;

    var location = new Devices({ 
        _id: 'LOC_' + locCount,
        devType: 'loc',
        displayName: locationName });

    location.save()
        .then(function (entity) {

            for (var i = 0; i < devices; i++) {
                devCount++;
                var device1 = new Devices({ 
                    _id: 'DEV_' + devCount, 
                    devType: 'dev',
                    displayName: 'Device ' + devCount 
                });
                device1.parent = entity;

                device1.save().then(function (entity) {
                    for (var j = 0; j < sensors; j++) {
                        sensCount++;
                        var sensor1 = new Devices({ 
                            _id: 'SENS_' + sensCount, 
                            devType: 'sens',
                            displayName: 'Sensor ' + sensCount 
                        });
                        sensor1.parent = entity;
                        sensor1.save();
                    }
                });
            }
        });

}

createLocation('Default Location', 10, 4);
createLocation('Campo', 5, 4);
createLocation('Fabrica', 40, 4);

/*// add root element 
var defaultLocation = new Devices({ _id: 'LOC_1', name: 'Default Location' });

// Set the parent relationships 



defaultLocation.save()
    .then(function (entity) {

        var device1 = new Devices({ _id: 'DEV_1', name: 'Ambient' });

        device1.parent = entity;
        return device1.save();
    })
    .then(function (entity) {

        var sensor1 = new Devices({ _id: 'SENS_1', name: 'Sensor 1' });

        sensor1.parent = entity;
        return sensor1.save();
    })
    .catch(function (error) {

        console.error(error);
    });*/