import React, { useState, useEffect } from 'react';
import SystemViewReusableComponent from './SystemViewReusableComponent';
import DataHandler from '../../DataHandler.js';
import { withRouter } from 'react-router-dom';

const columns = [
  {
    columnName: 'id',
    field: 'contact_id',
    size: 0
  },
  {
    columnName: 'Name',
    field: 'contact_name',
    size: 3
  },
  {
    columnName: 'Email',
    field: 'contact_email',
    size: 3
  },
  {
    columnName: 'Office Name',
    field: 'contact_office_name',
    size: 3
  },
  {
    columnName: 'Office Purpose',
    field: 'contact_office_purpose',
    size: 2
  }
]

const SystemPOCs = ({ match, viewMode, changeViewMode }) => {
  let systemid = match.params.systemid;
  let dataHandler = new DataHandler
  const [rows, setRows] = useState([]);
  const [updatedRow, setUpdatedRow] = useState({})
  useEffect(() => {
    dataHandler.getPOC(systemid)
      .then(json => {
        setRows(json.data)
      })
  }, [systemid, updatedRow])

  return (
    <SystemViewReusableComponent
      viewMode={viewMode}
      changeViewMode={changeViewMode}
      changeViewModeTarget={'POCs'}
      title={'Point of Contact'}
      columns={columns}
      rows={rows}
      patch={dataHandler.patchPOC.bind(dataHandler)}
      post={dataHandler.postPOC.bind(dataHandler)}
      setUpdatedRow={setUpdatedRow}
    />
  )
}
export default withRouter(SystemPOCs);
