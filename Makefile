# 引数が指定されていない場合のデフォルト値は未定義
## .envと競合しない名前とする
MIKEFILE_ARG ?=

# Nest CLI
## module生成: make nest-gen-mo MIKEFILE_ARG=module_name
nest-gen-mo:
ifdef MIKEFILE_ARG
	nest g module ${MIKEFILE_ARG} modules --flat
endif
## controller生成: make nest-gen-co MIKEFILE_ARG=controller_name
nest-gen-co:
ifdef MIKEFILE_ARG
	nest g controller ${MIKEFILE_ARG} controllers --flat
endif
## service生成: make nest-gen-s MIKEFILE_ARG=service_name
nest-gen-s:
ifdef MIKEFILE_ARG
	nest g service ${MIKEFILE_ARG} services --flat
endif


# マイグレーション
## ステータス確認
migration-show:
	npx typeorm-ts-node-commonjs migration:show -d ./src/db/data-source.ts
## ファイル生成: make migration-gen MIKEFILE_ARG=file-name
migration-gen:
ifdef MIKEFILE_ARG
	npx typeorm-ts-node-commonjs migration:generate ./src/db/migrations/${MIKEFILE_ARG} -d ./src/db/data-source.ts --pretty
endif
## 実行
migration-run:
	npx typeorm-ts-node-commonjs migration:run -d ./src/db/data-source.ts
## ロールバック
migration-revert:
	npx typeorm-ts-node-commonjs migration:revert -d ./src/db/data-source.ts
