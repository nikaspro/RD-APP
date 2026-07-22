// Делает "копировать для артефакта": берёт сырой код виджета и отдаёт
// самодостаточный кусок, который вставляется в существующий артефакт.
//
// Что делает:
//  1. вклеивает объект tokens прямо в код (артефакт не видит tokens.js);
//  2. рекурсивно вклеивает зависимые виджеты кита;
//  3. срезает все import-строки, а внешние (react, framer-motion)
//     выносит в комментарий-подсказку сверху;
//  4. убирает export, чтобы декларацию можно было просто вставить.

function serializeTokens(tokens) {
  return "const tokens = " + JSON.stringify(tokens, null, 2) + ";";
}

// Возвращает { externals:Set<string>, kitNames:Set<string>, body:string }
function stripImports(source, kitNamesByExport) {
  const externals = new Set();
  const kitNames = new Set();
  const kept = [];

  for (const line of source.split("\n")) {
    const m = line.match(/^\s*import\s+(.+?)\s+from\s+["'](.+?)["'];?\s*$/);
    if (!m) {
      kept.push(line);
      continue;
    }
    const clause = m[1];
    const spec = m[2];

    if (/tokens/.test(spec)) continue; // вклеим объект отдельно

    // импортированные идентификаторы
    const ids = (clause.match(/[A-Za-z_$][\w$]*/g) || []).filter(
      (w) => w !== "default" && w !== "as"
    );
    const kitHit = ids.filter((id) => kitNamesByExport.has(id));

    if (kitHit.length) {
      kitHit.forEach((id) => kitNames.add(id));
    } else {
      externals.add(`import ${clause} from "${spec}";`);
    }
  }

  let body = kept.join("\n");
  body = body.replace(/export\s+default\s+/g, "").replace(/export\s+/g, "");
  return { externals, kitNames, body: body.trim() };
}

// entry: { name, raw }
// registryByName: Map<string, { name, raw }>
// tokens: объект токенов
export function buildArtifactSnippet(entry, registryByName, tokens) {
  const kitNamesByExport = new Set(registryByName.keys());

  const seen = new Set();
  const bodies = [];
  const externals = new Set();

  function walk(name) {
    if (seen.has(name)) return;
    seen.add(name);
    const item = registryByName.get(name);
    if (!item) return;
    const { externals: ext, kitNames, body } = stripImports(
      item.raw,
      kitNamesByExport
    );
    ext.forEach((e) => externals.add(e));
    // сначала зависимости, потом сам компонент
    kitNames.forEach((dep) => walk(dep));
    bodies.push(body);
  }

  walk(entry.name);

  const header =
    externals.size > 0
      ? "// нужны импорты сверху артефакта:\n" +
        [...externals].map((e) => "// " + e).join("\n") +
        "\n\n"
      : "";

  return header + serializeTokens(tokens) + "\n\n" + bodies.join("\n\n") + "\n";
}
