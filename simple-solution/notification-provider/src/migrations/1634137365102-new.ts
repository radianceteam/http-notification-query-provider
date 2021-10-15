import {MigrationInterface, QueryRunner} from "typeorm";

export class new1634137365102 implements MigrationInterface {
    name = 'new1634137365102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "nonce" character varying NOT NULL, "message" character varying NOT NULL, "subscribeId" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "data" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_b9ba88685caf573f35c07739cec" FOREIGN KEY ("subscribeId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_b9ba88685caf573f35c07739cec"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
