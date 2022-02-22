import {json, csv} from "d3";
import {feature} from "topojson";


// https://github.com/AliceWi/TopoJSON-Germany --> Shapefiles from GADM (https://gadm.org/)
// Berlin is drawn by AliceWi
const atlasUrl = "https://raw.githubusercontent.com/AliceWi/TopoJSON-Germany/master/germany.json"

// all information about licence etc. https://gist.github.com/Jazzpenner/d0a49655ad9dd7c533c114ad2344fccd
const rkiUrl = "https://gist.githubusercontent.com/Jazzpenner/d0a49655ad9dd7c533c114ad2344fccd/raw/1e43cba83b9f1213bbb8d4e681e9abda8c7b5461/rki_hospi_cleaned.csv"


const rkiRow = d => {
    d["Datum"] = new Date(d["Datum"]).setHours(0, 0, 0, 0)
    d["7T_Hospitalisierung_Inzidenz"] = +d["7T_Hospitalisierung_Inzidenz"]
    return d
}

const getAtlasData = (callback) => {
    json(atlasUrl).then(topoJsonData => {
        const {states} = topoJsonData.objects;
        callback({
            states: feature(topoJsonData, states),
        })
    })
}

const getRKIData = (callback) => {
    csv(rkiUrl, rkiRow).then(csvData => {
        callback(csvData)
    })
}


export {getAtlasData, getRKIData}
