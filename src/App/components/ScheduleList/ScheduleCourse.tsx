import React from "react";
import { Container, Draggable } from 'react-smooth-dnd';
import {Card, CardPrimaryAction} from "@rmwc/card";
import {Typography} from "@rmwc/typography";

import '@rmwc/card/styles';


type ScheduleCourseProps = {
    code: string,
    index: number,
    name: string | undefined
}

const ScheduleCourse = ({code, index, name}: ScheduleCourseProps) => {
    return (
        <Draggable>
                <div
                    style={{
                        margin: '0 0 16px 0',
                    }}
                >
                    <Card outlined style={{width: '265px', height: 'auto'}}>
                        <CardPrimaryAction>
                            <div style={{display: 'flex', flexDirection: 'column', padding: '18px'}}>
                                <span style={{fontSize: 20, fontWeight: 600}}>
                                    {code}
                                </span>
                                <span style={{fontSize: 14, marginTop: 6}}>
                                    {name}
                                </span>
                            </div>
                        </CardPrimaryAction>
                    </Card>
                </div>
        </Draggable>
    )
}

export default ScheduleCourse
