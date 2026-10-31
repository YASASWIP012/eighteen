import { cre, Runner } from "@chainlink/cre-sdk";
import { type Config, configSchema, onSchedule } from "./handler.ts";

const initWorkflow = (config: Config) => {
  const cron = new cre.capabilities.CronCapability();
  return [cre.handler(cron.trigger({ schedule: config.schedule }), onSchedule)];
};

export async function main() {
  const runner = await Runner.newRunner<Config>({ configSchema });
  await runner.run(initWorkflow);
}

main();
