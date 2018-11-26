var fs = require("fs");
var contents = fs.readFileSync('marep_centres.json');
var polygons = fs.readFileSync('districts.json');
var jsonContent = JSON.parse(contents);
var polygonContent = JSON.parse(polygons);

let districts = ['Chitipa', 'Karonga', 'Likoma', 'Mzimba', 'Nkhatabay', 'Rumphi', 'Dedza', 'Dowa', 'Kasungu', 'Lilongwe', 'Mchinji', 'Nkhotakota', 'Ntcheu', 'Ntchisi', 'Salima', 'Balaka', 'Blantyre', 'Chikhwawa', 'Chiradzulu', 'Machinga', 'Mangochi', 'Mulanje', 'Mwanza', 'Neno', 'Nsanje', 'Phalombe', 'Thyolo', 'Zomba']
let centers = jsonContent.features;
let newCenters = mapCenters(centers);

districts = mapCentersToDistrict(districts, newCenters)
//console.log(newCenters);
console.log(districts);
//console.log(polygonContent.features);
//console.log(mapPolygonDistricts(polygonContent.features))
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
        createJsonFile(res.properties.name, res);
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
        lat: coordinates[0],
        lng: coordinates[1]
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
        createJsonFile(district, res);
        return res;
    })
}