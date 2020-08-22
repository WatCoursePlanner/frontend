import {Requisite, RequisiteGroup} from "../components/Requisite";
import {CourseInfo} from "../proto/courses";

type Condition = { type: string; data: string; operands: Condition[]; met: boolean | null; }

export class RequisiteHelper {
    private static simpleTypes = ["HAS_COURSE", "HAS_LABEL", "SATISFIES_LIST"]

    private static getRequisiteGroupFromSimpleOrOrs(rule: Condition): RequisiteGroup | null {
        if (rule.type === "HAS_COURSE" || rule.type === "HAS_LABEL") {
            return this.getRequisiteGroupFromSimpleOrOrs({type: "OR", data: "", operands: [rule], met: rule.met})
        }
        if (rule.type === "OR") {
            for (let operand of rule.operands) if (!this.simpleTypes.includes(operand.type)) return null;

            return {
                requisites: rule.operands.map((op) => ({code: op.data, met: op.met!})), requires: 1, met: rule.met!
            }
        }
        return null
    }

    static parseAntiRequisite(rule: Condition): RequisiteGroup | null {
        if (rule.type === "HAS_COURSE" || rule.type === "HAS_LABEL") {
            return this.parseAntiRequisite({type: "AND", data: "", operands: [rule], met: rule.met})
        }
        if (rule.type === "AND") {
            for (let operand of rule.operands) if (!this.simpleTypes.includes(operand.type)) return null;

            return {
                requisites: rule.operands.map((op) => ({code: op.data, met: !op.met!})), requires: 1, met: !rule.met!
            }
        }
        return null
    }

    static parseRequisite(rule: Condition): RequisiteGroup[] {
        const simpleOrOrs = this.getRequisiteGroupFromSimpleOrOrs(rule);
        if (simpleOrOrs) return [simpleOrOrs];

        if (rule.type === "AND") {
            let results: RequisiteGroup[] = []
            // each operand must be simple or a OR
            for (const operand of rule.operands) {
                const r = this.getRequisiteGroupFromSimpleOrOrs(operand)
                if (r === null) return []
                results.push(r)
            }
            return results
        }

        return []
    }

    static getPreRequisite(course: CourseInfo | null): RequisiteGroup[] {
        const json = course?.preRequisite?.json;
        if (!json) return [];
        const requisite = JSON.parse(json) as Condition;
        if (!requisite) return [];
        return this.parseRequisite(requisite);
    }

    static getAntiRequisite(course: CourseInfo | null): Requisite[] {
        const json = course?.antiRequisite?.json;
        if (!json) return [];
        const requisite = JSON.parse(json) as Condition;
        if (!requisite) return [];
        const results = this.parseAntiRequisite(requisite);
        if (results) return results.requisites
        return []
    }
}
