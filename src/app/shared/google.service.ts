import { Injectable } from '@angular/core';

/**
 * Service with methods to connect map clicks to
 * google maps and street view
 * @method openStreetView() Open Location in Google Street View with only Lat Long
 * @method openGoogleMaps() Open Location as pin in Google Maps with only Lat Long
 */
@Injectable()
export class GoogleService {
/** Open Location in Google Street View with only Lat Long
 * @param LAT Numerical Latitude, in decimal degrees
 * @param LONG Numerical Longitude, in decimal degrees
 */
    openStreetView(LAT: number, LONG: number): any {
        window.open(`https://www.google.com/maps?q=&layer=c&cbll=${LAT.toString()},${LONG.toString()}`, '_blank');
    }
/** Open Location as pin in Google Maps with only Lat Long
 * @param LAT Numerical Latitude, in decimal degrees
 * @param LONG Numerical Longitude, in decimal degrees
 */
    openGoogleMaps(LAT: number, LONG: number): any {
        window.open(
            `https://www.google.com/maps/place/${
                this.getDMS(LAT, 'lat')
            }+${
                this.getDMS(LONG, 'lon')
            }/@${LAT.toString()},${LONG.toString()}`, '_blank');
    }

    private truncate(n): any {
        return n > 0 ? Math.floor(n) : Math.ceil(n);
    }

    private getDMS(dd, longOrLat): any {
        const hemisphere = /^[WE]|(?:lon)/i.test(longOrLat)
            ? dd < 0
                ? 'W'
                : 'E'
            : dd < 0
                ? 'S'
                : 'N';

        const absDD = Math.abs(dd);
        const degrees = this.truncate(absDD);
        const minutes = this.truncate((absDD - degrees) * 60);
        const seconds = ((absDD - degrees - minutes / 60) * Math.pow(60, 2)).toFixed(2);
        const dmsArray = [degrees, minutes, seconds, hemisphere];
        return `${dmsArray[0]}°${dmsArray[1]}'${dmsArray[2]}"${dmsArray[3]}`;
    }
}


