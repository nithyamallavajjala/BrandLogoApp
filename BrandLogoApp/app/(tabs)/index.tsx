import { supabase } from "@/utils/supabase";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import defaultStyles from "../../styles/defaultStyles";

type locationCount = Record<string, number>;

export default function BuilderScreen() {
  const [counts, setCounts] = useState<locationCount>({});
  const [loading, setLoading] = useState(true);

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("location");

      if (error) {
        console.error("Error fetching counts:", error);
        return;
      }

      const newCounts: locationCount = {};

      for (const row of data ?? []) {
        if (!row.location) continue;
        newCounts[row.location] = (newCounts[row.location] ?? 0) + 1;
      }

      setCounts(newCounts);
    } catch (err) {
      console.error("fetchCounts exception:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔑 THIS is the important part
  useFocusEffect(
    React.useCallback(() => {
      fetchCounts();
    }, [fetchCounts]),
  );

  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>Home page</Text>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>
            Palatine: {counts["Palatine"] ?? 0} members
          </Text>
          <Text style={styles.countText}>
            Schaumburg {counts["Schaumburg"] ?? 0} members
          </Text>
          <Text style={styles.countText}>
            Barrington: {counts["Barrington"] ?? 0} members
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  countContainer: {
    marginTop: 20,
  },
  countText: {
    fontSize: 16,
    marginBottom: 8,
  },
});