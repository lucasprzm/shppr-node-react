export class ComputeRoutesGoogleMapsDto {
  routes: Route[];

  constructor(data: any) {
    this.routes = data.routes.map((route: any) => new Route(route));
  }
}

class Route {
  duration: string;
  distanceMeters: number;
  legs: RouteLeg[];

  constructor(data: any) {
    this.duration = data.duration;
    this.distanceMeters = data.distanceMeters;
    this.legs = data.legs.map((leg: any) => new RouteLeg(leg));
  }
}

class RouteLeg {
  startLocation: LocationMaps;
  endLocation: LocationMaps;

  constructor(data: any) {
    this.startLocation = data.startLocation;
    this.endLocation = data.endLocation;
  }
}

class LocationMaps {
  latLng: LatLng;
}

export class LatLng {
  latitude: number;
  longitude: number;
}
