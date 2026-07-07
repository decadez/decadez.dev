const DateTime = ({ datetime }: { datetime: string }) => {
  const myDatetime = new Date(datetime);
  const formattedDate = myDatetime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = myDatetime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative">
      <span className="sr-only">Posted on: </span>
      {formattedDate} <span aria-hidden="true">|</span>
      <span className="sr-only">&nbsp;at&nbsp;</span> {formattedTime}
    </div>
  );
};

export default DateTime;
