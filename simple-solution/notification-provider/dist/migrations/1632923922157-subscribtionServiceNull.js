"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribtionServiceNull1632923922157 = void 0;
class subscribtionServiceNull1632923922157 {
    constructor() {
        this.name = 'subscribtionServiceNull1632923922157';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ALTER COLUMN "subscription" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ALTER COLUMN "subscription" SET NOT NULL`);
    }
}
exports.subscribtionServiceNull1632923922157 = subscribtionServiceNull1632923922157;
//# sourceMappingURL=1632923922157-subscribtionServiceNull.js.map