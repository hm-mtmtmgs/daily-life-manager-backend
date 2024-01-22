import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1705933956697 implements MigrationInterface {
    name = 'Init1705933956697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`refresh_tokens\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`token_no\` varchar(255) NOT NULL,
                \`issued_at\` datetime NOT NULL,
                \`expired_at\` datetime NOT NULL,
                \`expired_In\` int NOT NULL,
                \`user_id\` int UNSIGNED NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`last_name\` varchar(255) NOT NULL,
                \`first_name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`tasks\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                \`title\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`priority\` varchar(255) NOT NULL,
                \`status\` varchar(255) NOT NULL,
                \`due_at\` datetime NOT NULL,
                \`complete_at\` datetime NULL,
                \`user_id\` int UNSIGNED NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`refresh_tokens\`
            ADD CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_db55af84c226af9dce09487b61b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_db55af84c226af9dce09487b61b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tasks\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`refresh_tokens\`
        `);
    }

}
