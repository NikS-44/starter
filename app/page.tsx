import SampleComponent from "@/app/components/SampleComponent";

export default function Home() {
  return (
    <div className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
      <SampleComponent hasOrangeText />
    </div>
  );
}
