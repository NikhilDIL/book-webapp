import React, {Fragment} from 'react';
import spinner from '../images/spinner.gif'

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} 
                alt="Loading..." 
                className="mt-5"
                style={{width:'200px', margin: 'auto', display:'block'}} 
            />
        </Fragment>
    )
}

export default Spinner;