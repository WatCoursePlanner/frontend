import React from 'react'
import {Link} from "react-router-dom";
import WhatshotIcon from '@material-ui/icons/Whatshot';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import '../index.scss';

const DiscoverPage = () => {
    {/* July 9 TODO: Adjusting the Postion for Popular Courses */}
    {/* TODO: Adding Course Cards/Navigate Next Icon */}

    return(
        <div>
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

        <div style={{
            paddingLeft: 60,
        }}>
        <NavigateNextIcon className={'more_courses'}>
        </NavigateNextIcon>
        </div>
    </div>
    )
}

export default DiscoverPage
