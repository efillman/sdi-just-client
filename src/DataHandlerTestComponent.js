import React, {useState, useEffect} from "react"
import DataHandler from './DataHandler';

const DataHandlerTestComponent = (props) => {
  const [ data, setData ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    const dataHandler = new DataHandler();
    dataHandler.getServiceWithSystems().then((data) => setData(data)).then(() => setIsLoading(false))
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