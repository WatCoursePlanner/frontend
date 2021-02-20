export { RequisiteGroupChecklist } from "./RequisiteGroupChecklist";
export { RequisiteChecklist } from "./RequisiteChecklist";

export enum REQUISITE_ICONS {
  MET = "done",
  UNMET = "close",
}

export enum RequisiteType {
  PREREQUISITE,
  ANTIREQUISITE,
}

export enum RequisiteContent {
  HAS_COURSE = "HAS_COURSE",
  HAS_LABEL = "HAS_LABEL",
  SATISFIES_LIST = "SATISFIES_LIST",
}

export interface IRequisite {
  code: string,
  met: boolean,
  necessary: boolean,
  type: RequisiteType,
  content?: RequisiteContent,
}

export interface IRequisiteGroup {
  requisites: IRequisite[],
  requires: number,
  met: boolean,
}
