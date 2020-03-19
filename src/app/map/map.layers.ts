import { Fill, Stroke, Style, Text } from 'ol/style';

export const geoStyles = new Style({
  stroke: new Stroke({
    color: '#627BC1',
    width: 4
  }),
  fill: new Fill({
    color: 'rgba(0, 0, 0, 0)'
  })
});
export const labelStyle = new Style({
  text: new Text({
    font: '12px Segoe UI Semibold, OpenSans, sans-serif',
    overflow: true,
    fill: new Fill({
      color: 'black'
    }),
    stroke: new Stroke({
      color: 'white',
      width: 4.5
    })
  })
});
export const NoParcelCartoCSS = `
  #zoning_2 {
    polygon-fill: rgba(0,0,0,0);
    line-color: rgba(0, 0, 0, 0);
    line-opacity: 0;
  }
`;
export const BaseParcelCartoCSS = `
  #zoning_2 {
    polygon-fill: rgba(0,0,0,0);
    line-width: 0.33;
    line-color: rgb(200, 200, 200);
  }
`;
export const ZoningParcelCartoCSS = `
#zoning_2 {
    polygon-opacity: 0.7;
    line-color: black;
    line-width: 0.1;
    line-opacity: 1;
}
#zoning_2[code='R-1'] {polygon-fill: #fffaca;}
#zoning_2[code='R-2'] {polygon-fill: #fff68f;}
#zoning_2[code='R-3'] {polygon-fill: #fff100;}
#zoning_2[code='R-4'] {polygon-fill: #ebd417;}
#zoning_2[code='C-1'] {polygon-fill: #fbc8b3;}
#zoning_2[code='C-2'] {polygon-fill: #da2028;}
#zoning_2[code='C-3'] {polygon-fill: #850204;}
#zoning_2[code='I-1'] {polygon-fill: #e1c3dd;}
#zoning_2[code='I-2'] {polygon-fill: #A53ED5;}
#zoning_2[code='I-3'] {polygon-fill: #c0188c;}
#zoning_2[code='MX-1'] {polygon-fill: #e4a024;}
#zoning_2[code='MX-2'] {polygon-fill: #f37520;}
#zoning_2[code='MX-3'] {polygon-fill: #FF2900;}
#zoning_2[code='INST'] {polygon-fill: #0063ff;}
#zoning_2[code='PARK'] {polygon-fill: #229A00;}
#zoning_2[code='CEM'] {polygon-fill: #561818;}
#zoning_2[code='RDV'] {polygon-fill: #dddddd;}
#zoning_2[code='EWR'] {polygon-fill: #820c0c;}
#zoning_2[code='PORT'] {polygon-fill: #B81609;}`;
export const cartoGrid = (z, x, y) => `https://cartocdn-gusc-a.global.ssl.fastly.net/` +
  `nzlur/api/v1/map/828afba5071058f312755e751aea6b1d:1581093818059/` +
  `parcels/${z}/${x}/${y}.grid.json`;
export const ApiConfig = (parcelStyle) => {
  let cartoCSS = '';
  switch (parcelStyle) {
    case 'None':
      cartoCSS = NoParcelCartoCSS;
      break;
    case 'zoning':
      cartoCSS = ZoningParcelCartoCSS;
      break;
    default:
      cartoCSS = BaseParcelCartoCSS;
      break;
  }
  return {
    layers: [{
      type: 'cartodb',
      options: {
        sql: 'SELECT * FROM zoning_2',
        cartocss: cartoCSS,
        cartocss_version: '2.2.0',
        interactivity: ['cartodb_id', 'proploc', 'blocklot', 'code']
      }
    }]
  };
};
