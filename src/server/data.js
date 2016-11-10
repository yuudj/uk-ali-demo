module.exports = {
  people: getPeople(),
  locations: getLocations(),
  drivers: getDrivers,
  devices: getDevices()
};

function getPeople() {
  return [
    { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
    { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
    { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
    { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
    { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
    { firstName: '1', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '2', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '3', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '4', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '5', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '6', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '7', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '8', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '9', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '10', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '11', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '12', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '13', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '14', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '15', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '16', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '17', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '18', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '19', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '20', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '21', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '22', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '23', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '24', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '25', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '26', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '27', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '28', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '29', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '30', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '31', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '32', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: '33', lastName: 'Gates', age: 11, location: 'South Carolina' },
    { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
  ];
}

function getLocations() {
  return [
    {
      locationId: 'LOC_DEF',
      name: 'LOCATION',
      glymph: 'building',
      description: 'Default Location',
      isReadOnly : true
    }
  ];
}
function getDrivers() {
  return [
    {
      driverId: 'DRV_MQTT',
      name: 'MQTT DRIVER',
      description: 'MQTT Driver',
      isReadOnly : true,
      glymph: 'mqtt'
    }
  ];
}

function getDevices() {
  return [
    {
      devId: 'DEV_DEV1',
      name: 'Ambiente',
      glymph: 'flower',
      description: 'Medicion ambiente',
      locationId: 'LOC_1',
      driverId: 'DRV_MQTT',
      sensors: [
        {
          name: 'Ambiente',
          glymph: 'flower',
          description: ''
        }
      ]

    }
  ];
}

function getTriggers() {
  return [
    {
      trigId: 'TRG_INFLUX',
      name: 'INFLUXDH',
      glymph: 'flower',
      description: 'Medicion ambiente',
      locationId: 'LOC_1',
      driverId: 'DRV_INFLUXH',
      sensors: [
        {
          name: 'Ambiente',
          glymph: 'flower',
          description: ''
        }
      ]

    }
  ];
}