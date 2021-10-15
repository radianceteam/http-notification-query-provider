"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser1631709724562 = void 0;
class CreateUser1631709724562 {
    constructor() {
        this.name = 'CreateUser1631709724562';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }
}
exports.CreateUser1631709724562 = CreateUser1631709724562;
//# sourceMappingURL=1631709724562-CreateUser.js.map