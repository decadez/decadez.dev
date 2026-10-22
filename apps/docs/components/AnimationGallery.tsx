import { useState } from "react";
import {
  animationCatalog,
  useAnimation,
  type AnimationCatalogItem,
} from "@decadez/web-dev-ui/animations";
import { Button } from "@decadez/web-dev-ui";
import { ExamplePreview } from "./ExamplePreview";

let sourceRequest: Promise<Record<string, string>> | undefined;
function loadAnimationSources() {
  if (process.env.NODE_ENV === "development") sourceRequest = undefined;
  return (sourceRequest ??= fetch(
    `${process.env.NEXT_PUBLIC_DOCS_BASE_PATH ?? ""}/animation-sources.json`,
    { cache: "no-store" }
  )
    .then(async (response) => {
      if (!response.ok) throw new Error("Could not load animation sources");
      return response.json() as Promise<Record<string, string>>;
    })
    .catch((error) => {
      sourceRequest = undefined;
      throw error;
    }));
}

function AnimationDemo({ item }: { item: AnimationCatalogItem }) {
  const animation = useAnimation();
  const Animation = item.component;
  return (
    <div className="docs-animation-demo">
      <Animation
        size={280}
        aria-label={item.name}
        {...animation.animationProps}
      />
      <div className="demo-row">
        <Button variant="outline" size="sm" onClick={animation.toggle}>
          {animation.paused ? "Play" : "Pause"}
        </Button>
        <Button variant="ghost" size="sm" onClick={animation.replay}>
          Replay
        </Button>
      </div>
    </div>
  );
}

export function AnimationGallery() {
  const [id, setId] = useState("walking-cat");
  const item = animationCatalog.find((entry) => entry.id === id)!;
  const categories = [
    ...new Set(animationCatalog.map((entry) => entry.category)),
  ];
  const code = `import { ${item.name} } from "@decadez/web-dev-ui/animations/${item.id}";
import { useAnimation } from "@decadez/web-dev-ui/animations/hooks";

export default function App() {
  const animation = useAnimation();
  return (
    <main className="demo">
      <${item.name} size={280} aria-label="${item.name}" {...animation.animationProps} />
      <div className="demo-row">
        <button onClick={animation.toggle}>{animation.paused ? "Play" : "Pause"}</button>
        <button onClick={animation.replay}>Replay</button>
      </div>
    </main>
  );
}`;
  return (
    <div>
      <label className="docs-animation-picker">
        <span>Choose an animation · {animationCatalog.length} components</span>
        <select value={id} onChange={(event) => setId(event.target.value)}>
          {categories.map((category) => (
            <optgroup key={category} label={category}>
              {animationCatalog
                .filter((entry) => entry.category === category)
                .map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.name.replace(/Animation$/, "")}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </label>
      <ExamplePreview
        key={id}
        name="animations"
        code={code}
        preview={<AnimationDemo item={item} />}
        loadSandboxFiles={loadAnimationSources}
      />
    </div>
  );
}
