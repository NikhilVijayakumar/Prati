export const parseCsv = (content: string): { headers: string[]; rows: string[][] } => {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = lines[0].split(delimiter).map((item) => item.trim());
  const rows = lines
    .slice(1)
    .map((line) => line.split(delimiter).map((item) => item.trim()));
  return { headers, rows };
};
