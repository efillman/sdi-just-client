import * as getServiceWithSystems from './mock_data/getServiceWithSystems.json';
import * as getServices from './mock_data/getServices.json';

class DataHandler {
  constructor() {
    //undefined means we are live servers
    if (process.env.NODE_ENV === 'production') {
      this.use_mock_data = false;
      this.apiBase = 'https://sdi06-03.staging.dso.mil/api'
    } else {
      //check for .env file
      this.use_mock_data = true;
      if (process.env.REACT_APP_MOCKAPIMODE === "production") {
        this.use_mock_data = false;
      }
      this.apiBase = 'http://localhost:8080';
    }
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
        const response = await fetch(`${this.apiBase}/system?service_id[$in][]=${serviceid}&$sort[system_importance]=1`)
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

  async getSystem(system_id) {
    if (this.use_mock_data) {
      try {
        return "mock get"
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      try {
        const response = await fetch(`${this.apiBase}/system/${system_id}`, {
          method: 'GET'
        })
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }

  //getPOC
  //http://localhost:8080/contact?system_id[$in][]=1
  async getPOC(system_id) {
    if (this.use_mock_data) {
      try {
        return "mock get"
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      try {
        const response = await fetch(`${this.apiBase}/contact?system_id[$in][]=${system_id}`, {
          method: 'GET'
        })
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }

  //expected Data
  // "system_id": 1,
  // "contact_name": "Matthew Yorke",
  // "contact_email": "Matthew.yorke@us.af.mil",
  // "contact_office_name": "ALSA",
  // "contact_office_purpose": "SPO"
  async postPOC(data) {
    if (this.use_mock_data) {
      try {
        return "mock get"
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      try {
        const post_contact_data = Object.assign({}, data);
        post_contact_data['system_id'] = parseInt(data.system_id)
        const response = await fetch(`${this.apiBase}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post_contact_data)
        })
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }

  //expected Data
  // "contact_id": 2,
  // "system_id": 1,
  // "contact_name": "Matthew Yorke",
  // "contact_email": "Matthew.yorke@us.af.mil",
  // "contact_office_name": "ALSA",
  // "contact_office_purpose": "SPO"
  async patchPOC(data) {
    if (this.use_mock_data) {
      try {
        return "mock get"
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      try {
        const patch_contact_data = Object.assign({}, data);
        patch_contact_data['system_id'] = parseInt(data.system_id)
        const response = await fetch(`${this.apiBase}/contact/${data.contact_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(patch_contact_data)
        })
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }

  //expected data
  // {
  //   "service_id": 3,
  //   "system_short_name": "SBB",
  //   "system_long_name": "Super Battle Buddies"
  //    "system_note": "adsfasdf"
  // }

  async postSystem(data) {
    if (this.use_mock_data) {
      try {
        return "mock post"
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      const post_system_data = Object.assign({}, data);
      post_system_data['service_id'] = parseInt(data.service_id)
      post_system_data['system_importance'] = 0;
      try {
        const response = await fetch(`${this.apiBase}/system`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post_system_data)
        })
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }

  //expected data
  // {
  //   "service_id": 3,
  //   "system_short_name": "SBB",
  //   "system_long_name": "Super Battle Buddies"
  //    "system_note": "adsfasdf"
  // }

  async patchSystem(data) {
    if (this.use_mock_data) {
      try {
        return "mock patch"
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      const post_system_data = Object.assign({}, data);
      post_system_data['service_id'] = parseInt(data.service_id)
      post_system_data['system_importance'] = 0;
      try {
        const response = await fetch(`${this.apiBase}/system/${data.system_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post_system_data)
        })
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }

  async changeImportance(data, direction = false) {
    if (this.use_mock_data) {
      try {
        return "mock patch"
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      // const post_system_data = Object.assign({}, data);
      // post_system_data['service_id'] = parseInt(data.service_id)
      const post_system_data = {};
      if (direction) {
        //move up
        post_system_data['system_importance'] = parseInt(data.system_importance) + 1;
      } else {
        //move down
        post_system_data['system_importance'] = parseInt(data.system_importance) - 1;
        if (post_system_data['system_importance'] < 0) {
          post_system_data['system_importance'] = 0;
        }
      }
      try {
        const response = await fetch(`${this.apiBase}/system/${data.system_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(post_system_data)
        })
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }

  }

  // http://localhost:8080/compatibility?system_id[$in][]=1 get compatibility by system id

  async getCompatibility(system_id) {
    if (this.use_mock_data) {
      try {
        return "mock get"
      } catch (error) {
        console.log('Request failed', error)
      }
    } else {
      try {
        const response = await fetch(`${this.apiBase}/compatibility?system_id[$in][]=${system_id}`, {
          method: 'GET'
        })
        return await response.json();
      }
      catch (error) {
        console.log("Request failed", error)
      }
    }
  }
}

export default DataHandler