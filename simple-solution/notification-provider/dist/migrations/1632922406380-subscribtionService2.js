"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribtionService21632922406380 = void 0;
class subscribtionService21632922406380 {
    constructor() {
        this.name = 'subscribtionService21632922406380';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" RENAME COLUMN "subscribtion" TO "subscription"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" RENAME COLUMN "subscription" TO "subscribtion"`);
    }
}
exports.subscribtionService21632922406380 = subscribtionService21632922406380;
//# sourceMappingURL=1632922406380-subscribtionService2.js.map