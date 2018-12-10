var _ = require('lodash');
var fs = require("fs");
var contents = fs.readFileSync('marep.json');
var polygons = fs.readFileSync('districts.json');
var multiPolygon = fs.readFileSync('regions.json');

var multiPolygonContent = JSON.parse(multiPolygon)
var jsonContent = JSON.parse(contents);
//var polygonContent = JSON.parse(polygons);

let districts = ['Chitipa', 'Karonga', 'Likoma', 'Mzimba', 'Nkhatabay', 'Rumphi', 'Dedza', 'Dowa', 'Kasungu', 'Lilongwe', 'Mchinji', 'Nkhotakota', 'Ntcheu', 'Ntchisi', 'Salima', 'Balaka', 'Blantyre', 'Chikhwawa', 'Chiradzulu', 'Machinga', 'Mangochi', 'Mulanje', 'Mwanza', 'Neno', 'Nsanje', 'Phalombe', 'Thyolo', 'Zomba']
let centers = jsonContent.features;
let newCenters = mapCenters(centers);

//districts = mapCentersToDistrict(districts, newCenters)
//console.log(newCenters);
//console.log(districts);
//console.log(polygonContent.features);
//console.log(mapPolygonDistricts(polygonContent.features))
var flattened = reduceMultiPolygon(multiPolygonContent.features);

var mapped = mapRegionToPolygon(flattened);

//console.log(mapped)
//createJsonFile('regionsMapped', mapped);
//console.log(mapPolygonDistricts(polygonContent.features))

function createJsonFile(fileName, content){
    fileName = './'+fileName+'.json';
    fs.writeFile(fileName, JSON.stringify(content), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log(fileName + " has been created");
    });
}

function mapPolygonDistricts(polygons){
    return polygons.map((polygon) => {
        let res = {
            properties: {
                name: polygon.properties.name_1
            },
            coordinates: mapPolygonCoordinates(polygon.geometry.coordinates)
        }
        console.log(res.coordinates)
        //createJsonFile(res.properties.name, res);
        return res;
    })
}

function reduceMultiPolygon(features){
    return features.map((feature) => {
        let { coordinates } = feature.geometry
        let { region } = feature.properties
        let flattenedCoordinates = _.flattenDepth(coordinates, 2);
        let res = {
            properties: {
                region
            },
            coordinates: flattenedCoordinates
        };
        return res
    })
}

function mapRegionToPolygon(polygons){
    return polygons.map(polygon => {
        let { properties } = polygon
        console.log(polygon.coordinates)
        let coordinates = polygon.coordinates.map((coordinate) => mapCoordinates(coordinate));
        let res = {
            properties,
            coordinates
        }
        createJsonFile(properties.region, res);
        return res;
    })
}

function mapCenters(centers){
    return centers.map((center) => {
        let coordinates = mapCoordinates(center.geometry.coordinates)
        let district = center.properties.district
        return {
            id: center.properties.gid + district,
            district,
            coordinates
        }
    })
}

function filterDistricts(district, centers){
    return centers.filter((center) => center.district === district)
}

function filterPolygonDistricts(district, polygons){
    console.log(polygons)
    let res = polygons.filter((polygon) => polygon.properties.name === district)
    console.log(res)
    return res
}
     

function mapCoordinates(coordinates){
    return {
        lat: coordinates[1],
        lng: coordinates[0]
    }
}

function mapPolygonCoordinates(coordinates){
    
    return coordinates.map((coordinate) => {

        //console.log(coordinate)
        return coordinate.map((coor) => {
            return mapCoordinates(coor)
        })
        //return mapCoordinates(coordinate);
    })[0];
}

function mapCentersToDistrict(districts, centers){
    return districts.map((district) => {
        let districtCenters = centers.filter((center) => center.district === district)
        let res = {
            properties: {
                name: district
            },
            centers: districtCenters
        }
        console.log(res.centers)
        createJsonFile(district, res);
        return res;
    })
}