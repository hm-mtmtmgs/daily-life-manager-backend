import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '.';
import { Base } from './base.entity';

@Entity({ name: 'refresh_tokens' })
export class RefreshTokenEntity extends Base {
  /**
   * カラム定義
   */
  @Column({ name: 'token_no' })
  tokenNo: string;

  @Column({ name: 'issued_at' })
  issuedAt: Date;

  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @Column({ name: 'expired_In' })
  expiredIn: number;

  /**
   * リレーション定義
   */
  @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userRow: UserEntity;

  /**
   * インスタンス生成
   */
  static new(
    tokenNo: string,
    issuedAt: Date,
    expiredAt: Date,
    expiredIn: number,
    user: UserEntity,
  ): RefreshTokenEntity {
    const entity = new RefreshTokenEntity();
    entity.tokenNo = tokenNo;
    entity.issuedAt = issuedAt;
    entity.expiredAt = expiredAt;
    entity.expiredIn = expiredIn;
    entity.userRow = user;
    return entity;
  }

  static reNew(
    tokenNo: string,
    issuedAt: Date,
    expiredAt: Date,
    expiredIn: number,
    user: UserEntity,
  ): RefreshTokenEntity {
    const entity = new RefreshTokenEntity();
    entity.tokenNo = tokenNo;
    entity.issuedAt = issuedAt;
    entity.expiredAt = expiredAt;
    entity.expiredIn = expiredIn;
    entity.userRow = user;
    return entity;
  }
}
