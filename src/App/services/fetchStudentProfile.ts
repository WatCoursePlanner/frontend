import {studentProfileError, studentProfileInit, studentProfileSuccess} from "../duck/actions/studentProfile";
import {Dispatch} from 'redux';

function snakeToCamelCase(obj: any) {
    if (typeof (obj) != "object") return obj;
    for (let oldKey in obj) {
        if (obj.hasOwnProperty(oldKey)) {
            let newKey = oldKey.replace(/(_\w)/g,
                (m) => m[1].toUpperCase());
            if (newKey !== oldKey) {
                obj[newKey] = obj[oldKey];
                delete obj[oldKey];
            }
            if (typeof (obj[newKey]) == "object") {
                obj[newKey] = snakeToCamelCase(obj[newKey]);
            }
        }
    }
    return obj;
}

function fetchStudentProfile() {
    return (dispatch: Dispatch) => {
        dispatch(studentProfileInit());
        fetch('http://localhost:8080/profile/default?program=Software%20Engineering')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw(res.error);
                }
                let camel = snakeToCamelCase(res)
                dispatch(studentProfileSuccess(camel));
                return camel;
            })
            .catch(error => {
                dispatch(studentProfileError(error));
            })
    }
}

export default fetchStudentProfile;
