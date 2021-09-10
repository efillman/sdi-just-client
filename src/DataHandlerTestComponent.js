import React, { useState, useEffect } from "react"
import DataHandler from './DataHandler';

const DataHandlerTestComponent = (props) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const dataHandler = new DataHandler();
    //dataHandler.getServiceWithSystems().then((data) => setData(data)).then(() => setIsLoading(false))
    // dataHandler.getServices().then((data) => setData(data)).then(() => setIsLoading(false))
    const inputData =
  {
    "service_id": 3,
    "system_short_name": "SBB",
    "system_long_name": "Super Battle Buddies",
     "system_note": "adsfasdf"
  }
    //dataHandler.postSystem(inputData).then((data) => setData(data)).then(() => setIsLoading(false))
    console.log('Log of process.env', process.env)
  }, []);

  const loadingText = () => {
    return (<div hidden>Loading</div>)
  }

  const outputText = () => {
    return (<div hidden>Output</div>)
  }

  return (
    isLoading ? loadingText() : outputText()
  )

}

export default DataHandlerTestComponent