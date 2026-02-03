import { supabase } from "@/utils/supabase";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import defaultStyles from "../../styles/defaultStyles";

//Used chat on how to change order of location based on member number using supabase 
//https://chatgpt.com/share/6981fdd8-32ac-800a-8845-55a1df6b8027
type LocationRow = {
  location: string;
  count: number;
};

export default function BuilderScreen() {
  const [counts, setCounts] = useState<LocationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCounts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
      .from("location_counts")
      .select("*");

      if (error) {
        console.error("Error fetching counts:", error);
        return;
      }

       setCounts(data ?? []);
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
    {counts.map((item) => (
      <Text key={item.location} style={styles.countText}>
        {item.location}: {item.count} members
      </Text>
    ))}
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