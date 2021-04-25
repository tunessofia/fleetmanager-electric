const maps = {
    InfoWindow: jest.fn().mockImplementation(function () {}),
    Map: jest.fn().mockImplementation(function (mapDiv, opts) {}),
    LatLng: function LatLng(lat, lng) { return {} },
    Polygon: function Polyline() {},
    Size: function Size() {}
};

export const GoogleMock = { maps };
