"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUserGenerate1632127750346 = void 0;
class TokenUserGenerate1632127750346 {
    constructor() {
        this.name = 'TokenUserGenerate1632127750346';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "valid" boolean NOT NULL DEFAULT false, "token" character varying, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }
}
exports.TokenUserGenerate1632127750346 = TokenUserGenerate1632127750346;
//# sourceMappingURL=1632127750346-TokenUserGenerate.js.map