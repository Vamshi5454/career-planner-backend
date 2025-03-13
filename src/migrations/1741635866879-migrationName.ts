import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1741635866879 implements MigrationInterface {
    name = 'MigrationName1741635866879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resumes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "s3key" character varying(512) NOT NULL, "upDatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_cc7e3ffc1d5cb5c7c5b9c180b8b" UNIQUE ("s3key"), CONSTRAINT "PK_9c8677802096d6baece48429d2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "password" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resumes" ADD CONSTRAINT "FK_339097f7bb65e85c34f033df05b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resumes" DROP CONSTRAINT "FK_339097f7bb65e85c34f033df05b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "resumes"`);
    }

}
