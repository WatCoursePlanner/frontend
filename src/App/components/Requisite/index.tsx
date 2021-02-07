export { RequisiteGroupChecklist } from "./RequisiteGroupChecklist";
export { RequisiteChecklist } from "./RequisiteChecklist";

export interface IRequisite {
    code: string,
    met: boolean
}

export interface IRequisiteGroup {
    requisites: IRequisite[],
    requires: number,
    met: boolean
}
