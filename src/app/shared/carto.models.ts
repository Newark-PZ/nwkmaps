import { ɵSafeHtml } from '@angular/core';

export interface MapInput {
    hood: string;
    block?: string;
    lot?: string;
    zoneColor?: string;
    labelStyle?: ɵSafeHtml;
}
export interface CartoFields {
    [key: string]:
    | undefined
    | string
    | number
    | boolean;
}
export interface CartoSQLResp {
    rows: [
        | CartoFields
        | undefined
        | ZoningFields
    ];
    time?: number;
    fields?: {
        cartodb_id?: {
            type?: string;
            pgtype?: string;
        };
        the_geom?: {
            type?: string;
            wkbtype?: string;
            dims?: number;
            srid?: number;
        };
        the_geom_webmercator?: {
            type?: string;
            wkbtype?: string;
            dims?: number;
            srid?: number;
        };
        redevelopment_plan?: {
            type?: string;
            pgtype?: string;
        };
        historic_district?: {
            type?: string;
            pgtype?: string;
        };
        blocklot?: {
            type?: string;
            pgtype?: string;
        };
        lot?: {
            type?: string;
            pgtype?: string;
         };
        block?: {
            type?: string;
            pgtype?: string;
        };
        permbt?: {
            type?: string;
            pgtype?: string;
        };
        permuse?: {
            type?: string;
            pgtype?: string;
        };
        property_description?: {
            type?: string;
            pgtype?: string;
        };
        pdf?: {
            type?: string;
            pgtype?: string;
        };
        code?: {
            type?: string;
            pgtype?: string;
        };
        landmark?: {
            type?: string;
            pgtype?: string
        };
        proploc?: {
            type?: string;
            pgtype?: string;
        };
        y?: {
            type?: number;
            pgtype?: string;
        };
        x?: {
            type?: number;
            pgtype?: string;
        };
        updated_at?: {
            type?: string;
            pgtype?: string;
        };
        created_at?: {
            type?: string;
            pgtype?: string;
        };
    };
    total_rows?: number;
}

export interface ZoningFields {
    cartodb_id?: string;
    the_geom?: string;
    the_geom_webmercator?: string;
    redevelopm?: string;
    historic_d?: string;
    blocklot?: string;
    lot?: string;
    block?: string;
    property_d?: string | HTMLOrSVGScriptElement;
    code?: string | undefined;
    landmark?: null | string;
    primary_us?: Array<string>;
    accessory?: Array<string>;
    building_t?: Array<string>;
    proploc?: string;
    y?: number;
    x?: number;
    updated_at?: string;
    created_at?: string;
}

// R-1	#fffaca
// R-2	#fff68f
// R-3	#fff100
// R-4	#ebd417
// C-1	#a18aad
// C-2	#da2028
// C-3	#850204
// MX-1	#e4a024
// MX-2	#f37520
// MX-3	#FF2900
// I-1	#e1c3dd
// I-2	#A53ED5
// I-3	#c0188c
// RDV	#dddddd
// PARK	#229A00
// INST	#0063ff
// CEM	#561818
// PORT	#B81609
// EWR	#820c0c
