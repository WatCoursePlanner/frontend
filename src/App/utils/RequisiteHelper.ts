import {
  IRequisite,
  IRequisiteGroup,
  RequisiteContent,
  RequisiteType,
} from "@watcourses/components/ScheduleList/Requisite";
import { CourseInfo } from "@watcourses/proto/courses";

interface ICondition {
  type: string;
  data: string;
  operands: ICondition[];
  met: boolean | null;
}

enum RequisiteLogic {
  AND = "AND",
  OR = "OR",
}

export class RequisiteHelper {

  private static getRequisiteGroupFromSimpleOrOrs(
    rule: ICondition,
  ): IRequisiteGroup | null {
    if (
      rule.type === RequisiteContent.HAS_COURSE ||
      rule.type === RequisiteContent.HAS_LABEL
    ) {
      return this.getRequisiteGroupFromSimpleOrOrs({
        type: RequisiteLogic.OR,
        data: "",
        operands: [rule],
        met: rule.met,
      });
    }
    if (
      rule.type === RequisiteLogic.OR &&
      rule.operands.every(operand => operand.type in RequisiteContent)
    ) {
      return {
        requisites: rule.operands.map((op) => ({
          code: op.data,
          met: !!op.met,
          necessary: !op.met && !rule.met,
          type: RequisiteType.PREREQUISITE,
          content: RequisiteContent[op.type as keyof typeof RequisiteContent],
        })),
        requires: 1,
        met: rule.met!,
      };
    }
    return null;
  }

  static parseAntiRequisite(rule: ICondition): IRequisiteGroup | null {
    if (
      rule.type === RequisiteContent.HAS_COURSE ||
      rule.type === RequisiteContent.HAS_LABEL
    ) {
      return this.parseAntiRequisite({
        type: RequisiteLogic.AND,
        data: "",
        operands: [rule],
        met: rule.met,
      });
    }
    if (
      rule.type === RequisiteLogic.AND &&
      rule.operands.every(operand => operand.type in RequisiteContent)
    ) {
      return {
        requisites: rule.operands.map((op) => ({
          code: op.data,
          met: !op.met,
          necessary: !!op.met,
          type: RequisiteType.ANTIREQUISITE,
          content: RequisiteContent[op.type as keyof typeof RequisiteContent],
        })),
        requires: 1,
        met: !rule.met,
      };
    }
    return null;
  }

  static parseRequisite(rule: ICondition): IRequisiteGroup[] {
    const simpleOrOrs = this.getRequisiteGroupFromSimpleOrOrs(rule);
    if (simpleOrOrs) {
      return [simpleOrOrs];
    }

    if (rule.type === RequisiteLogic.AND) {
      const results: IRequisiteGroup[] = [];
      // each operand must be simple or a OR
      for (const operand of rule.operands) {
        const r = this.getRequisiteGroupFromSimpleOrOrs(operand);
        if (r === null) {
          return [];
        }
        results.push(r);
      }
      return results;
    }

    return [];
  }

  static getPreRequisite(course?: CourseInfo): IRequisiteGroup[] {
    const json = course?.preRequisite?.json;
    if (!json) {
      return [];
    }
    const requisite = JSON.parse(json) as ICondition;
    if (!requisite) {
      return [];
    }
    return this.parseRequisite(requisite);
  }

  static getAntiRequisite(course?: CourseInfo): IRequisite[] {
    const json = course?.antiRequisite?.json;
    if (!json) {
      return [];
    }
    const requisite = JSON.parse(json) as ICondition;
    if (!requisite) {
      return [];
    }
    const results = this.parseAntiRequisite(requisite);
    if (results) {
      return results.requisites;
    }
    return [];
  }
}
