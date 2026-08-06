import { Realm } from "@realm/react";

export class CompletedMatchSchema extends Realm.Object<CompletedMatchSchema> {
  _id!: Realm.BSON.ObjectId;
  date!: Date;
  matchDataJson!: string;

  static schema: Realm.ObjectSchema = {
    name: "CompletedMatch",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      date: "date",
      matchDataJson: "string",
    },
  };
}
