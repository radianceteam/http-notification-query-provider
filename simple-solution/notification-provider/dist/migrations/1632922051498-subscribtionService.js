"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribtionService1632922051498 = void 0;
class subscribtionService1632922051498 {
    constructor() {
        this.name = 'subscribtionService1632922051498';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ADD "subscribtion" text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" DROP COLUMN "subscribtion"`);
    }
}
exports.subscribtionService1632922051498 = subscribtionService1632922051498;
//# sourceMappingURL=1632922051498-subscribtionService.js.map