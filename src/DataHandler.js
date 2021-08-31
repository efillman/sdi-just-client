import * as getServiceWithSystems from './mock_data/getServiceWithSystems.json';
import * as getServices from './mock_data/getServices.json';

class DataHandler {
  constructor() {
    this.use_mock_data = true;
    if (process.env.REACT_APP_MOCKAPIMODE === "production") {
      this.use_mock_data = false;
    }
    // this.apiBase = 'http://localhost:3030';

    this.apiBase = process.env.REACT_APP_APIURL;
  }

  //utility function
  promiseInput(input) {
    //the input parameter is in scope to the below promise now
    return new Promise(function (resolve, reject) {
      resolve(input);
    });
  }

  async getServiceWithSystems(serviceid = 1) {
    if (this.use_mock_data) {
      try {
        return await this.promiseInput(getServiceWithSystems.default)
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      try {
        const response = await fetch(`${this.apiBase}/system?service_id[$in][]=${serviceid}&$sort[system_importance]=-1`)
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }

  async getServices() {
    if (this.use_mock_data) {
      try {
        return await this.promiseInput(getServices.default)
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      try {
        const response = await fetch(`${this.apiBase}/services`)
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }

}

export default DataHandler