"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmaeiluser1633293482027 = void 0;
class AddEmaeiluser1633293482027 {
    constructor() {
        this.name = 'AddEmaeiluser1633293482027';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" RENAME COLUMN "metod" TO "email"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" RENAME COLUMN "email" TO "metod"`);
    }
}
exports.AddEmaeiluser1633293482027 = AddEmaeiluser1633293482027;
//# sourceMappingURL=1633293482027-AddEmaeiluser.js.map