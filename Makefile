# 引数が指定されていない場合のデフォルト値は未定義
## .envと競合しない名前とする
MIKEFILE_ARG ?=

# Nest CLI
## module生成: make nest-gen-mo MIKEFILE_ARG=module-name
nest-gen-mo:
ifdef MIKEFILE_ARG
	nest g module ${MIKEFILE_ARG} modules --flat
endif
## controller生成: make nest-gen-co MIKEFILE_ARG=controller-name
nest-gen-co:
ifdef MIKEFILE_ARG
	nest g controller ${MIKEFILE_ARG} controllers --flat
endif
## service生成: make nest-gen-s MIKEFILE_ARG=service-name
nest-gen-s:
ifdef MIKEFILE_ARG
	nest g service ${MIKEFILE_ARG} services --flat
endif
