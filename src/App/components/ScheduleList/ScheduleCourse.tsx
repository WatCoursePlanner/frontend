import React from "react";
import {Draggable} from "react-beautiful-dnd";
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
        <Draggable draggableId={code} index={index} >
            {(provided, snapshot) => (
                <div
                    style={{margin: '8px'}}>
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card outlined style={{width: '265px', height: 'auto'}}>
                        <CardPrimaryAction>
                            <div style={{display: 'flex', flexDirection: 'column', padding: '18px'}}>
                                <span style={{fontSize: 20, fontWeight: 700}}>
                                    {code}
                                </span>
                                <span style={{fontSize: 14, marginTop: 6}}>
                                    {name}
                                </span>
                            </div>
                        </CardPrimaryAction>
                    </Card>
                </div>
                </div>
            )}
        </Draggable>
    )
}

export default ScheduleCourse
