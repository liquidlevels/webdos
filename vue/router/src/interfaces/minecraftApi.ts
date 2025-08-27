export interface MinecraftAPI {
  data:       Datum[];
  status:     number;
  statusText: string;
  headers:    MinecraftAPIHeaders;
  config:     Config;
  request:    Request;
}

export interface Config {
  transitional:      Transitional;
  adapter:           string[];
  transformRequest:  null[];
  transformResponse: null[];
  timeout:           number;
  xsrfCookieName:    string;
  xsrfHeaderName:    string;
  maxContentLength:  number;
  maxBodyLength:     number;
  env:               Request;
  headers:           ConfigHeaders;
  method:            string;
  url:               string;
  allowAbsoluteUrls: boolean;
}

export interface Request {
}

export interface ConfigHeaders {
  Accept: string;
}

export interface Transitional {
  silentJSONParsing:   boolean;
  forcedJSONParsing:   boolean;
  clarifyTimeoutError: boolean;
}

export interface Datum {
  name:         string;
  namespacedId: string;
  description:  string;
  image:        string;
  stackSize:    number;
  renewable:    boolean;
}

export interface MinecraftAPIHeaders {
  "cache-control": string;
  "content-type":  string;
}
