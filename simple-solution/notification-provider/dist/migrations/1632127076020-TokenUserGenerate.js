"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUserGenerate1632127076020 = void 0;
class TokenUserGenerate1632127076020 {
    constructor() {
        this.name = 'TokenUserGenerate1632127076020';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" ADD "token" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_entity" DROP COLUMN "token"`);
    }
}
exports.TokenUserGenerate1632127076020 = TokenUserGenerate1632127076020;
//# sourceMappingURL=1632127076020-TokenUserGenerate.js.map