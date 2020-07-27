import React from 'react';

const Alert = ({ msg }) => {
    return (
        <div className="bg-danger text-white pl-2 pt-2 pb-2" 
            style={{width: "50%", 
                    borderRadius: "10px",
                    textAlign: "left"}}>
                <i className="fas fa-exclamation-circle"/>{' '}{msg}
        </div>
    )
}

export default Alert;
