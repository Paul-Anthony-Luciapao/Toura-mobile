import { colors, globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

type Props = Readonly<{
  title: string;
  subtitle?: string;
  action?: string;
}>;

export default function SectionHeader({ title, subtitle, action }: Props) {
  return (
    <View style={[globalStyles.header, styles.container]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textMuted,
  },
  action: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
});
