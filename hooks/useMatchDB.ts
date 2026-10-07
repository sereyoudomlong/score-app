import { MatchData } from "@/constants/types";
import { CompletedMatchSchema } from "@/db/schema";
import { Realm, useQuery, useRealm } from "@realm/react";

export function useMatchDB() {
  const realm = useRealm();

  // newest matches first (sorted by the date the match was saved)
  const completedMatches = useQuery<CompletedMatchSchema>(
    "CompletedMatch",
    (matches) => matches.sorted("date", true),
    [],
  );

  const saveCompletedMatch = (matchData: MatchData) => {
    realm.write(() => {
      realm.create(CompletedMatchSchema, {
        _id: new Realm.BSON.ObjectId(),
        date: new Date(),
        matchDataJson: JSON.stringify(matchData),
      });
    });
  };

  const deleteMatch = (id: Realm.BSON.ObjectId) => {
    realm.write(() => {
      const match = realm.objectForPrimaryKey(CompletedMatchSchema, id);
      realm.delete(match);
    });
  };

  const deleteAllMatches = () => {
    realm.write(() => {
      const allMatches = realm.objects(CompletedMatchSchema);
      realm.delete(allMatches);
    });
  };

  return {
    completedMatches,
    saveCompletedMatch,
    deleteMatch,
    deleteAllMatches,
  };
}
