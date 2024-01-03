import React, { useEffect } from 'react'

function TableRowComponent(props) {
    const label = props.rowLabel ? props.rowLabel : "";
    const className = props.inputClassName ? props.inputClassName : "";
    const type = props.inputType ? props.inputType : "text";
    const id = props.inputId ? props.inputId : null;
    const required = props.required ? props.required : false;
    let handleChangeObject = props.handleChange;
    if (typeof (props.handleChange) == 'object') {
        handleChangeObject = Object.values(props.handleChange)[0];
    }

    const handleChange = (e) => {
        if (handleChangeObject)
            handleChangeObject(e);
    }
    return (
        <tr>
            <td className="lc">{label}:</td>
            <td className="lr">
                {required ? <input className={className} type={type} id={id} onChange={handleChange} required /> :
                    <input className={className} type={type} id={id} onChange={handleChange} />}</td>
        </tr>
    )
}

export default TableRowComponent