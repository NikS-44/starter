import Link from "next/link";

const SamplePage = () => {
  return (
    <div className="row-start-2 flex flex-col items-center gap-8">
      <span>This is a sample page</span>
      <Link className="underline" href="/">
        Go Back
      </Link>
    </div>
  );
};

export default SamplePage;
