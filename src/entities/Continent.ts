import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import Country from "./Country";

@Entity()
@ObjectType()
export default class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  name: string;

  @Field(() => [Country])
  @OneToMany(() => Country, (country) => country.continentCode)
  countries: Country[];
}

@InputType()
export class NewContinentInput {
  @Field()
  code: string;

  @Field()
  name: string;
}
