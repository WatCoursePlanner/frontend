import React from 'react'
import {Link} from "react-router-dom";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../index.scss';

const DiscoverPage = () => {
    {/* TODO: Adding Filters */}

    return(
        <div>
        <div style={{
            width: '100%',
            height: '8%',
            fontFamily: 'Lato',
            fontWeight: 700,
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

export default DiscoverPage
