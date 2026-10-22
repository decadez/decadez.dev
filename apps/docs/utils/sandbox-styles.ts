export const sandboxStyles = `.demo {
  display: grid;
  min-height: 220px;
  gap: 16px;
  place-items: center;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.demo-card {
  display: grid;
  gap: 12px;
  width: min(100%, 360px);
}

.demo-card h2,
.demo-card p {
  margin: 0;
}

.demo-card h2 {
  font-size: 22px;
}

.demo-card p {
  line-height: 1.6;
}
`.trim();
