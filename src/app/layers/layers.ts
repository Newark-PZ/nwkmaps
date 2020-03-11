import * as carto from '@carto/carto-vl';

carto.setDefaultAuth({
    apiKey: '0c3e2b7cbff1b34a35e1f2ce3ff94114493bd681',
    user: 'nzlur'
});

export const hoods = {
    id: 'hoods',
    layout: {},
    paint: {
        'line-color': '#627BC1',
        'line-width': 2
    },
    source: 'hoodMap',
    type: 'line'
};

export const hoodsInner = {
    id: 'hoods-inner',
    layout: {},
    paint: {
        'fill-color': '#627BC1',
        'fill-opacity': [
            'case',
            [
                'boolean',
                [
                    'feature-state',
                    'hover'
                ],
                false
            ],
            1,
            0.5
        ]
    },
    source: 'hoodMap',
    type: 'fill'
};
export const hoodsLabels = {
    id: 'hoods-labels',
    layout: {
        'text-field': ['get', 'NAME'],
        'text-letter-spacing': 0.1,
        'text-max-width': 5,
        'text-transform': 'uppercase'
    },
    source: 'hoodMap',
    type: 'symbol'
};
export const wards = {
    id: 'wards',
    layout: {},
    paint: {
        'line-color': '#627BC1',
        'line-width': 2
    },
    source: 'wardMap',
    type: 'line'
};
export const wardsInner = {
    id: 'wards-inner',
    layout: {},
    paint: {
        'fill-color': '#627BC1',
        'fill-opacity': [
            'case',
            [
                'boolean',
                [
                    'feature-state',
                    'hover'
                ],
                false
            ],
            1,
            0.5
        ]
    },
    source: 'wardMap',
    type: 'fill'
};
export const wardLabels = {
    id: 'wards-labels',
    layout: {
        'text-field': ['get', 'WARD_NAME'],
        'text-letter-spacing': 0.1,
        'text-max-width': 5,
        'text-transform': 'uppercase'
    },
    source: 'wardMap',
    type: 'symbol'
};
export const zoningSource = new carto.source.Dataset(`
        public.zoning_2
      `);
export const zoningMapViz = new carto.Viz(`
        @code: $code
        @proploc: $proploc
        @blocklot: $blocklot
        color: opacity(ramp(buckets($code,
        [
          "R-1",
          "R-2",
          "R-3",
          "R-4",
          "C-1",
          "C-2",
          "C-3",
          "MX-1",
          "MX-2",
          "MX-3",
          "I-1",
          "I-2",
          "I-3",
          "RDV",
          "PARK",
          "INST",
          "CEM",
          "PORT",
          "EWR"
        ]), [
          #fffaca,
          #fff68f,
          #fff100,
          #ebd417,
          #a18aad,
          #da2028,
          #850204,
          #e4a024,
          #f37520,
          #FF2900,
          #e1c3dd,
          #A53ED5,
          #c0188c,
          #dddddd,
          #229A00,
          #0063ff,
          #561818,
          #B81609,
          #820c0c
        ]),0.7)
        strokeWidth: scaled(.1, 12)
        strokeColor: rgb(200, 200, 200)
      `);
export const luSource = new carto.source.Dataset(`
        public.zoning_2
      `);
export const luViz = new carto.Viz(`
        @propclass: $propclass
        @proploc: $proploc
        color: opacity(ramp(buckets($propclass,
        [
            "1",
            "2",
            "4A",
            "4B",
            "4C",
            "5A",
            "5B",
            "15A",
            "15B",
            "15C",
            "15D",
            "15E",
            "15F"
        ]), [
            #686868,
            #FFEBAF,
            #FF7F7F,
            #E8BEFF,
            #FFAA00,
            #B5E6B9,
            #B5E6B9,
            #BED2FF,
            #BED2FF,
            #BEFFE8,
            #73B2FF,
            #fff,
            #00C5FF
        ]),0.7)
        strokeWidth: scaled(.1, 12)
        strokeColor: rgb(200, 200, 200)
      `);
export const baseViz = new carto.Viz(`
        @proploc: $proploc
        @blocklot: $blocklot
        color: opacity(#fff, .25)
        strokeWidth: scaled(.1, 12)
        strokeColor: rgb(200, 200, 200)
      `);
