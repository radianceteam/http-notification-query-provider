"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationsBeetweenSubscription1633098558018 = void 0;
class RelationsBeetweenSubscription1633098558018 {
    constructor() {
        this.name = 'RelationsBeetweenSubscription1633098558018';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "subscription" character varying NOT NULL, "wallet" character varying, "metod" character varying, "userId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."user_entity" DROP COLUMN "subscription"`);
        await queryRunner.query(`ALTER TABLE "public"."user_entity" DROP COLUMN "wallet"`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_cc906b4bc892b048f1b654d2aa0"`);
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ADD "wallet" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ADD "subscription" text`);
        await queryRunner.query(`DROP TABLE "subscription"`);
    }
}
exports.RelationsBeetweenSubscription1633098558018 = RelationsBeetweenSubscription1633098558018;
//# sourceMappingURL=1633098558018-RelationsBeetweenSubscription.js.map