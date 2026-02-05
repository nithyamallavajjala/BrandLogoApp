import { supabase } from "@/utils/supabase";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import defaultStyles from "../../styles/defaultStyles";

//Used chat on how to change order of location based on member number using supabase 
//https://chatgpt.com/share/6981fdd8-32ac-800a-8845-55a1df6b8027
type LocationRow = {
  location: string;
  count: number;
};
type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  total_orders: number;
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
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all profiles from Supabase
  const fetchProfiles = useCallback(async () => {
    setError(null);
    try {
      // NOTE: avoid the single generic on .from() to prevent TypeScript overload errors.
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, total_orders")
        .order("total_orders", { ascending: false })
        .order("last_name", { ascending: true })
        .order("first_name", { ascending: true });

      if (error) {
        console.error("fetchProfiles error:", error);
        setError(error.message ?? "Failed to load roster");
        setProfiles([]);
        return;
      }

      // data may be typed as any[] here; we map it to our local state type
      setProfiles((data ?? []) as Profile[]);
    } catch (err) {
      console.error("fetchProfiles exception:", err);
      setError(String(err));
      setProfiles([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    fetchProfiles();

    const table = "profiles";
    let channel: any;
    let legacySubscription: any;

    // Subscribe to realtime updates using modern channel API if available
    try {
      channel = supabase
        .channel(`public-${table}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table,
          },
          () => {
            // simple and safe: re-fetch the list on any change
            fetchProfiles();
          },
        )
        .subscribe();
    } catch (err) {
      console.warn("Channel API failed, using legacy realtime:", err);

      // Legacy API: use `any` to bypass strict typing issues in some SDK versions.
      // This keeps runtime behavior (receiving realtime events) while avoiding compile errors.
      try {
        legacySubscription = (supabase as any)
          .from(table)
          .on("*", () => {
            fetchProfiles();
          })
          .subscribe();
      } catch (err2) {
        console.warn("Legacy realtime subscribe also failed:", err2);
      }
    }
     return () => {
      // Cleanup modern channel
      if (channel) {
        try {
          supabase.removeChannel?.(channel);
        } catch (err) {
          if (channel.unsubscribe) channel.unsubscribe();
        }
      }
      // Cleanup legacy subscription
      if (legacySubscription) {
        try {
          legacySubscription.unsubscribe?.();
        } catch (err) {
          // ignore
        }
      }
    };
  }, [fetchProfiles]);
  function ProfileRow({ item }: { item: Profile }) {
  return (
    <Text style={{ fontSize: 16, marginBottom: 6 }}>
      {item.first_name} {item.last_name} — {item.total_orders} orders
    </Text>
  );
}
  
  

  return (
    <View style={defaultStyles.pageContainer}>
      <Text style={defaultStyles.bodyText}>Restraunt Leaderboard</Text>

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
      <Text style={defaultStyles.bodyText}>Order Leaderboard</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProfileRow item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
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