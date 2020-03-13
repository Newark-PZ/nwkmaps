/**
 * Function that returns color of zoning district
 * @param zonedist the zone in reference as string
 * @example zoningColors('R-1')
 */
export const zoningColors = (zonedist: string) => {
    switch (zonedist) {
        case 'R':
            return '#F3F88F';
            break;
        case 'C':
            return '#F8B7FB';
            break;
        case 'I':
            return '#F8B7FB';
            break;
        case 'MX':
            return '#F8B7FB';
            break;
        case 'RDV':
            return '#dddddd';
            break;
        case 'PARK':
            return '#B5E6B9';
            break;
        case 'INST':
            return '#0063ff';
            break;
        case 'CEM':
            return '#F8B7FB';
            break;
        case 'PORT':
            return '#F8B7FB';
            break;
        case 'EWR':
            return '#F8B7FB';
            break;
        default:
            return '#BCBCBB';
            break;
    }
};
/**
 * Function that returns actual text of zoning district from code
 * @param zonedist the zone in reference as string
 * @example zoningNames('R')
 */
export const zoningNames = (zonedist: string) => {
    switch (zonedist) {
        case 'R':
            return 'Residential';
            break;
        case 'C':
            return 'Commercial';
            break;
        case 'I':
            return 'Industrial';
            break;
        case 'MX':
            return 'Mixed Use';
            break;
        case 'RDV':
            return 'Redevelopment Area';
            break;
        case 'PARK':
            return 'Parkland';
            break;
        case 'INST':
            return 'Institutional';
            break;
        case 'CEM':
            return 'Cemetery';
            break;
        case 'PORT':
            return 'Port';
            break;
        case 'EWR':
            return 'Airport';
            break;
        default:
            return 'Other';
            break;
    }
};
export const luColors = (propclass: string) => {
    switch (propclass) {
        case '1':
            return '#686868';
            break;
        case '2':
            return '#FFEBAF';
            break;
        case '4A':
            return '#FF7F7F';
            break;
        case '4B':
            return '#E8BEFF';
            break;
        case '4C':
            return '#FFAA00';
            break;
        case '5A':
        case '5B':
            return '#B5E6B9';
            break;
        case '15A':
        case '15B':
            return '#BED2FF';
            break;
        case '15C':
            return '#BEFFE8';
            break;
        case '15D':
            return '#73B2FF';
            break;
        case '15E':
            return '#fff';
            break;
        case '15F':
            return '#00C5FF';
            break;
        default:
            return '#BCBCBB';
            break;
    }
};
export const luNames = (propclass: string) => {
    switch (propclass) {
        case '1':
            return 'Vacant';
            break;
        case '2':
            return 'Residential';
            break;
        case '4A':
            return 'Commercial';
            break;
        case '4B':
            return 'Industrial';
            break;
        case '4C':
            return 'Apartment';
            break;
        case '5A':
        case '5B':
            return 'Railroad';
            break;
        case '15A':
        case '15B':
            return 'Schools';
            break;
        case '15C':
            return 'Public';
            break;
        case '15D':
            return 'Church/Charity';
            break;
        case '15E':
            return 'Cemeteries';
            break;
        case '15F':
            return 'Other Exempt';
            break;
        default:
            return '';
            break;
    }
};
