"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmaeiluser1633299176150 = void 0;
class AddEmaeiluser1633299176150 {
    constructor() {
        this.name = 'AddEmaeiluser1633299176150';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."subscription" ALTER COLUMN "parametr" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."subscription" ALTER COLUMN "parametr" SET NOT NULL`);
    }
}
exports.AddEmaeiluser1633299176150 = AddEmaeiluser1633299176150;
//# sourceMappingURL=1633299176150-AddEmaeiluser.js.map