"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletUser1632923075954 = void 0;
class walletUser1632923075954 {
    constructor() {
        this.name = 'walletUser1632923075954';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ADD "wallet" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" DROP COLUMN "wallet"`);
    }
}
exports.walletUser1632923075954 = walletUser1632923075954;
//# sourceMappingURL=1632923075954-walletUser.js.map