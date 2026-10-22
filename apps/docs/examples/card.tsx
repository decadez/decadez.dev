import { Card, CardBody } from "@decadez/web-dev-ui";

export default function App() {
  return (
    <main className="demo">
      <Card>
        <CardBody>
          <h2>Default card</h2>
          <p>Use this when content needs a visible surface.</p>
        </CardBody>
      </Card>

      <Card variant="plain">
        <CardBody>
          <h2>Plain card</h2>
          <p>No border and no fill, useful inside structured sections.</p>
        </CardBody>
      </Card>
    </main>
  );
}
