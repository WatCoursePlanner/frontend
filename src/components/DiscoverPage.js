import React from 'react'
import {Link} from "react-router-dom";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import '../index.scss';

const DiscoverPage = () => {

    return(
        <div style={{
            width: '100%',
            height: '8%',
            fontFamily: 'Lato',
            fontWeight: 700,
            paddingLeft: 60,
        }}>
            <span >
                <WhatshotIcon
                className={'popular_courses'}
            >
            </WhatshotIcon>
             Popular Courses
            </span>
        </div>
    )
}

export default DiscoverPage
