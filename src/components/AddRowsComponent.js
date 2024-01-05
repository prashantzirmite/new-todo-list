import React from 'react'
import TableRowComponent from './TableRowComponent'

function AddRowsComponent(props) {


const rows  = props && props.rows
  return (
    <React.Fragment>
        {rows && rows.length>0 && rows.map(
            row =>{
                return <TableRowComponent {...row} handleChange= {row.handleChange}/>
            }
        )}
    </React.Fragment>
    
  )
}

export default AddRowsComponent