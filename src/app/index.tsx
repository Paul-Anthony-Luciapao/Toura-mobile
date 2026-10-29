import { Redirect } from "expo-router";

export default function IndexRoute() {
  console.log("[INDEX] Root index route rendered");

  return <Redirect href="/(tabs)" />;
}
