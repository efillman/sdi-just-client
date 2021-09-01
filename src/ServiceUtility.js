import DataHandler from './DataHandler';

class ServiceUtility {
  static serviceData = null;

  // //utility function
  // static promiseInput(input) {
  //   //the input parameter is in scope to the below promise now
  //   return new Promise(function (resolve, reject) {
  //     return resolve(input);
  //   });
  // }

  static fetchServices = async () => {
    let dataHandler = new DataHandler();
    let response = await dataHandler.getServices();
    this.serviceData = response.data;
  }

  static async getAllServices() {
    if (!this.serviceData) {
      await this.fetchServices();
    }
    return this.serviceData;
  }

  static async getServiceById(serviceId) {
    if (!this.serviceData) {
      await this.fetchServices()
    }
    return this.serviceData[serviceId - 1];
  }
}

export default ServiceUtility;