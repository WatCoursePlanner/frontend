import React from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../index.scss';

const Discover = () => {
    /* TODO: Adding Filters */

    return(
        <div>
        <div style={{
            paddingLeft: 60,
        }}>
            <br/><h3>Find Your Courses</h3>
        </div>
        <div style={{
            paddingLeft: 60,
        }}>
        <NavigateNextIcon className={'courses_more'}>
        </NavigateNextIcon>
        </div>
    </div>
    )
}

export default Discover
