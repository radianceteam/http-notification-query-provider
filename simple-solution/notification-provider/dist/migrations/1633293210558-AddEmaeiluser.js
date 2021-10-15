"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEmaeiluser1633293210558 = void 0;
class AddEmaeiluser1633293210558 {
    constructor() {
        this.name = 'AddEmaeiluser1633293210558';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" RENAME COLUMN "email" TO "metod"`);
        await queryRunner.query(`ALTER TABLE "public"."subscription" DROP COLUMN "subscription"`);
        await queryRunner.query(`ALTER TABLE "public"."subscription" ADD "parametr" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."subscription" ADD "sendto" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ALTER COLUMN "metod" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ALTER COLUMN "metod" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."subscription" DROP COLUMN "sendto"`);
        await queryRunner.query(`ALTER TABLE "public"."subscription" DROP COLUMN "parametr"`);
        await queryRunner.query(`ALTER TABLE "public"."subscription" ADD "subscription" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user_entity" RENAME COLUMN "metod" TO "email"`);
    }
}
exports.AddEmaeiluser1633293210558 = AddEmaeiluser1633293210558;
//# sourceMappingURL=1633293210558-AddEmaeiluser.js.map