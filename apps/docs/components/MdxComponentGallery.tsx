import {
  BlogCard,
  Challenge,
  Challenges,
  CodeBlock as MDXCodeBlock,
  CodeDiagram,
  ConsoleBlock,
  ConsoleBlockMulti,
  ConsoleLogLine,
  Diagram,
  DiagramGroup,
  ErrorDecoder,
  ErrorMessage,
  ExpandableCallout,
  ExpandableExample,
  H1,
  H2,
  H3,
  H4,
  H5,
  Hint,
  InlineCode,
  Intro,
  IsInTocContext,
  LanguagesContext,
  LearnMore,
  Link,
  MDXComponentCoverageList,
  MDXList,
  MDXListItem,
  MDXParagraph,
  MDXSandbox,
  OpenInTypeScriptPlaygroundButton,
  PackageImport,
  Recap,
  SimpleCallout,
  Solution,
  TeamMember,
  TerminalBlock,
  TocContext,
  YouWillLearnCard,
} from "@decadez/web-dev-ui/mdx";

const sandboxFiles = {
  "/src/App.js": `import "./styles.css";

export default function App() {
  return (
    <main className="demo">
      <section className="demo-card">
        <p>Ship docs examples as live component states.</p>
        <button type="button">Preview action</button>
      </section>
    </main>
  );
}`,
  "/src/styles.css": `.demo {
  display: grid;
  min-height: 220px;
  place-items: center;
}

.demo-card {
  display: grid;
  gap: 16px;
  width: min(100%, 340px);
  border: 1px solid #d9e2ec;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgb(29 42 53 / 0.14);
  padding: 24px;
}

.demo-card p {
  margin: 0;
  color: #1d2a35;
  font-size: 18px;
  font-weight: 650;
}

.demo-card button {
  justify-self: start;
  border: 0;
  border-radius: 6px;
  background: #8f79d9;
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;
  padding: 10px 14px;
}`,
};

const sandboxPreview = (
  <main className="docs-sandbox-demo">
    <section className="docs-sandbox-demo-card">
      <MDXParagraph>Ship docs examples as live component states.</MDXParagraph>
      <button type="button">Preview action</button>
    </section>
  </main>
);

export const reactDevMdxComponentNames = [
  "BlogCard",
  "Challenge",
  "Challenges",
  "ChallengeNavigation",
  "ClearButton",
  "CodeBlock",
  "CodeDiagram",
  "ConsoleBlock",
  "ConsoleBlockMulti",
  "ConsoleLogLine",
  "CustomPreset",
  "CustomTheme",
  "Diagram",
  "DiagramGroup",
  "DownloadButton",
  "ErrorDecoder",
  "ErrorMessage",
  "ExpandableCallout",
  "ExpandableExample",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "Hint",
  "InlineCode",
  "Intro",
  "IsInTocContext",
  "LanguagesContext",
  "LearnMore",
  "Link",
  "LoadingOverlay",
  "MDXComponents",
  "NavigationBar",
  "OpenInCodeSandboxButton",
  "OpenInTypeScriptPlaygroundButton",
  "PackageImport",
  "Preview",
  "ReadBlogPost",
  "Recap",
  "ReloadButton",
  "RscFileBridge",
  "SandpackClient",
  "SandpackConsole",
  "SandpackRSC",
  "SandpackRoot",
  "SandpackRSCRoot",
  "SandpackWithHTMLOutput",
  "SimpleCallout",
  "Solution",
  "TeamMember",
  "TerminalBlock",
  "TocContext",
  "YouWillLearnCard",
  "createFileMap",
  "runESLint",
  "template",
  "templateRSC",
  "useSandpackLint",
] as const;

export function MdxComponentGallery() {
  return (
    <div className="docs-mdx-gallery">
      <section id="coverage" className="docs-section docs-section--first">
        <H2>Source coverage</H2>
        <MDXParagraph>
          The UI package mirrors the useful MDX surface from the local source
          tree and exposes it through{" "}
          <InlineCode>@decadez/web-dev-ui/mdx</InlineCode>.
        </MDXParagraph>
        <MDXComponentCoverageList names={reactDevMdxComponentNames} />
      </section>

      <section id="prose" className="docs-section">
        <H2>Prose components</H2>
        <div className="docs-card-grid">
          <div className="docs-example">
            <Intro>
              <MDXParagraph>
                Intro gives MDX pages a stronger opening paragraph.
              </MDXParagraph>
            </Intro>
            <H1>H1 Heading</H1>
            <H2>H2 Heading</H2>
            <H3>H3 Heading</H3>
            <H4>H4 Heading</H4>
            <H5>H5 Heading</H5>
            <MDXParagraph>
              Paragraph text supports <InlineCode>InlineCode</InlineCode> and{" "}
              <Link href="#prose">Link</Link>.
            </MDXParagraph>
          </div>

          <div className="docs-example">
            <SimpleCallout title="SimpleCallout">
              <MDXParagraph>Static notes for docs pages.</MDXParagraph>
            </SimpleCallout>
            <ExpandableCallout title="ExpandableCallout" type="warning">
              <MDXParagraph>
                Expandable notes match the imported docs patterns.
              </MDXParagraph>
            </ExpandableCallout>
            <ExpandableExample title="ExpandableExample">
              <PackageImport name="MDXSandbox" path="@decadez/web-dev-ui/mdx" />
            </ExpandableExample>
          </div>
        </div>
      </section>

      <section id="learning" className="docs-section">
        <H2>Learning blocks</H2>
        <div className="docs-card-grid">
          <YouWillLearnCard>
            <MDXList>
              <MDXListItem>How the component behaves.</MDXListItem>
              <MDXListItem>Which states to test.</MDXListItem>
            </MDXList>
          </YouWillLearnCard>
          <Recap>
            <MDXParagraph>Recap wraps summary content.</MDXParagraph>
          </Recap>
          <BlogCard
            title="BlogCard"
            description="A linked editorial card for docs content."
          />
          <TeamMember name="decadez" role="UI package maintainer" />
          <LearnMore>
            <MDXParagraph>
              LearnMore links readers to deeper material.
            </MDXParagraph>
          </LearnMore>
        </div>
      </section>

      <section id="diagrams" className="docs-section">
        <H2>Diagrams and code</H2>
        <DiagramGroup>
          <Diagram title="Diagram">
            <span>State A {"->"} State B</span>
          </Diagram>
          <CodeDiagram>
            <MDXCodeBlock>{`const state = "ready";`}</MDXCodeBlock>
          </CodeDiagram>
        </DiagramGroup>
        <TerminalBlock>pnpm --filter @decadez/docs dev</TerminalBlock>
        <ConsoleBlock>
          <ConsoleLogLine>Compiled successfully</ConsoleLogLine>
          <ConsoleLogLine type="warn">Preview is editable</ConsoleLogLine>
        </ConsoleBlock>
        <ConsoleBlockMulti>
          <ConsoleLogLine type="error">Example error line</ConsoleLogLine>
        </ConsoleBlockMulti>
        <ErrorDecoder code="418" message="The example recovered cleanly." />
      </section>

      <section id="challenges" className="docs-section">
        <H2>Challenges</H2>
        <Challenges>
          <Challenge title="Wire the component">
            <MDXParagraph>Use the exported MDX primitives.</MDXParagraph>
            <Hint>Start from the package import.</Hint>
            <Solution>Use the components from the mdx entrypoint.</Solution>
          </Challenge>
          <Challenge title="Document the state">
            <MDXParagraph>Show default, hover, and error states.</MDXParagraph>
          </Challenge>
        </Challenges>
      </section>

      <section id="sandbox" className="docs-section">
        <H2>Sandbox</H2>
        <MDXParagraph>
          The main sandbox uses Sandpack: source files create an isolated live
          preview.
        </MDXParagraph>
        <MDXSandbox
          activeFile="/src/App.js"
          files={sandboxFiles}
          preview={sandboxPreview}
        />
      </section>

      <section id="sandbox-parts" className="docs-section">
        <H2>Sandbox parts</H2>
        <MDXParagraph>
          Provider-bound pieces such as NavigationBar, Preview, Console,
          LoadingOverlay, RscFileBridge, and the action buttons render inside
          the live sandbox above. Standalone helpers can be composed directly.
        </MDXParagraph>
        <div className="docs-card-grid docs-card-grid--compact">
          <ErrorMessage
            error={{
              title: "ErrorMessage",
              message:
                "Sandbox errors use the same surfaced shape as the live preset.",
            }}
          />
          <div className="docs-example">
            <OpenInTypeScriptPlaygroundButton content="const decadez = 'ready';" />
          </div>
        </div>
      </section>

      <section id="contexts" className="docs-section">
        <H2>Contexts</H2>
        <LanguagesContext.Provider value={["JavaScript", "TypeScript"]}>
          <TocContext.Provider
            value={[{ url: "#contexts", text: "Contexts", depth: 2 }]}
          >
            <IsInTocContext.Provider value={false}>
              <SimpleCallout title="LanguagesContext, TocContext, IsInTocContext">
                <MDXParagraph>
                  Context exports are available for consumers building custom
                  MDX renderers.
                </MDXParagraph>
              </SimpleCallout>
            </IsInTocContext.Provider>
          </TocContext.Provider>
        </LanguagesContext.Provider>
      </section>
    </div>
  );
}
