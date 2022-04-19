import { useLocation } from "react-router";
import DetailSection from "./DetailSection";
import IdeaSection from "./IdeaSection";

function Stack() {
  const location = useLocation();
  const stackId = location.pathname.slice(1);

  return (
    <main className="mb-8 mt-10 justify-between sm:mt-16 lg:mt-[5vw] lg:flex lg:gap-6">
      <DetailSection stackId={stackId}/>
      <IdeaSection stackId={stackId}/>
    </main>
  );
}

export default Stack;
