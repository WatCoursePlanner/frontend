import {snakeToCamel} from "ts-protoc-gen/lib/util";

export function snakeToCamelCase(obj: any) {
    if (typeof (obj) != "object") return obj;
    for (let oldKey in obj) {
        if (obj.hasOwnProperty(oldKey)) {
            let newKey = snakeToCamel(oldKey);
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
