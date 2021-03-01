import fetch from "axios"
export default class Fetcher{
    constructor(base_url, apikey){
      this.base_url = base_url;
      this.apikey = apikey;
    }
    objectToQueryString(obj) {
      return Object.keys(obj)
        .map((key) => key + "=" + obj[key])
        .join("&");
    }
    
     generateErrorResponse(message) {
      return {
        status: "error",
        message,
      };
    }
    async  request(url, params, method = "GET") {
      const options = {
        method,
        headers: {
          Authorization: `Basic ${this.apikey}`,
          cors: true,
          Host: "api.printful.com",
        },
      };
    
      if (params) {
        if (method === "GET") {
          url += "?" + this.objectToQueryString(params);
        } else {
          options.data = params;
        }
      }
      options.url = this.base_url + url;
    
      const response = await fetch(options);
    
      if (response.status !== 200) {
        return this.generateErrorResponse(
          "The server responded with an unexpected status."
        );
      }
    
      if (response.json) {
        return await response.json();
      }
    
      return response;
    }
  
    
     get(url, params) {
      return this.request(url, params);
    }
    
     post(url, params) {
      return this.request(url, params, "POST");
    }
    
    put(url, params) {
      return this.request(url, params, "PUT");
    }
    
     delete(url, params) {
      return this.request(url, params, "DELETE");
    }
    
}