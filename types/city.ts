export interface Area {
    areatype: number;
    areaid: string;
    areaen: string;
    areacn: string;
    provinceen: string;
    provincecn: string;
    cityen: string;
    citycn: string;
    latitude: number;
    longitude: number;
    adcode: string;
  }

  export interface CityLookupResponse {
    code: number;
    msg: string;
    result: {
      list: Area[];
    };
  }