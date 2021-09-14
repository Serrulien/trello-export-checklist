const fs = require("fs");
const { exit } = require("process");

const [, , pathToJSON] = process.argv;

const rawData = fs.readFileSync(pathToJSON);
const card = JSON.parse(rawData);

/**
 * @param {any[]} items
 * @returns number in percentage
 */
function getCompletionPercent(items) {
  if (!items || items.length === 0) {
    return 0;
  }
  const completedCount = items.filter((i) => i.state === "complete").length;
  return (completedCount / items.length) * 100;
}

const checklists = card.checklists;
if (!checklists || checklists.length === 0) {
  console.log("This card doesn't have any checklist.");
  return exit(0);
}

checklists.forEach((sublist, index) => {
  if (index > 0) {
    console.log("\n");
  }
  console.log(sublist.name);
  const items = sublist.checkItems || [];
  console.log(`${Math.floor(getCompletionPercent(items))} %\n`);
  items.forEach((i) => {
    const stateEmoji = i.state === "complete" ? "✅" : "❌";
    console.log(`${stateEmoji} ${i.name}`);
  });
});
