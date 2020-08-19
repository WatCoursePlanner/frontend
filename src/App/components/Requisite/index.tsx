export {default as SecondaryRequisiteChecklist} from "./RequisiteGroupChecklist";
export {default as RequisiteChecklist} from "./RequisiteChecklist";

export interface Requisite {
    code: string,
    met: boolean
}

export interface RequisiteGroup {
    requisites: Requisite[],
    requires: number,
    met: boolean
}
