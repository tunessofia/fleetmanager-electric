import { ChargingStationsService } from '../services/ChargingStations';
import { LocalStorageMock } from './mocks/localStorageMock';
import { GoogleMock } from './mocks/googleMapsMock';

jest.mock('../services/Geometry', () => ({
    get GeoService() {
      return {
            getPolygonFromDirections: (x) => { return {}; },
            polygonContainsLocation: (x,y) => { return true; }
        };
    },
}));

describe('filterStationsByRouteTest', () => {
    beforeAll(() => {
        global.localStorage = Object.assign({}, LocalStorageMock);
        global.google = Object.assign({}, GoogleMock);
    })

    it('filter success', () => {
        const stations = [];
        stations.push({ latitude: "37.98", longitude: "8.9034", address: "dummy", localization: "dummy", socket_type: "dummy", socket_number: "dummy" });
        stations.push({ latitude: "37.98", longitude: "8.9034", address: "dummy", localization: "dummy", socket_type: "dummy", socket_number: "dummy" });

        const content = `<div class="caption line-20"><span>Address: dummy</span><br><span>Location: dummy</span><br><span>Socket Type: dummy</span><br><span>Socket Number: dummy</span></div>`;
        const expectedResult = [];
        expectedResult.push({ location: { lat: Number("37.98"), lng: Number("8.9034") }, content, socket_type: "dummy" });
        expectedResult.push({ location: { lat: Number("37.98"), lng: Number("8.9034") }, content, socket_type: "dummy" });

        const rvalue = ChargingStationsService.filterStationsByRoute([], stations);

        expect(rvalue.length)
        .toEqual(expectedResult.length);

        expect(rvalue[0].content)
        .toEqual(expectedResult[0].content);
    });
});
