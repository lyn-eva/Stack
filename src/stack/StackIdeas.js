import { useState, useEffect } from "react";
import { useDB } from "../context/dbProvider";
import { useAuth } from "../context/authProvider";
import Button from "../utility/Button";
import Iconify from "../utility/Iconify";
import Idea from "../idea/Idea";
import Detail from "../idea/Detail";

const btnStyle = {
  fontSize: "14px",
  padding: "2px 8px",
  borderRadius: "4px",
  letterSpacing: "1px",
};
const iconifyData = { "data-width": "14", style: { marginLeft: ".5rem" } };

function StackIdea({ stackId }) {
  const [addIdea, setAddIdea] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const { stacks, listenToIdeas } = useDB();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const unsub = listenToIdeas(stackId, setIdeas);
    return () => unsub;
  }, [user]);

  console.log(ideas)

  return (
    <section className="w-7/12">
      <h2 className="font-lato text-white font-medium text-2xl mb-2 leading-5">
        Your stack
      </h2>
      <hr />
      <ul className="flex gap-4 mt-4">
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href={stacks[stackId]?.url}
            className="bg-white inline-block font-roboto font-medium"
            style={btnStyle}
          >
            go to repo
            <Iconify data-icon="ri:git-repository-line" {...iconifyData} />
          </a>
        </li>
        <li>
          <Button onClick={() => setAddIdea(true)} style={btnStyle}>
            new idea
            <Iconify data-icon="ant-design:plus-outlined" {...iconifyData} />
          </Button>
        </li>
        <li>
          <Button style={btnStyle}>
            filter
            <Iconify data-icon="bytesize:filter" {...iconifyData} />
          </Button>
        </li>
        <li>
          <Button style={btnStyle}>
            sort
            <Iconify data-icon="cil:sort-descending" {...iconifyData} />
          </Button>
        </li>
      </ul>
      <ul className="mt-4 flex flex-col gap-4">
        {addIdea && (
          <Detail isForm stackId={stackId} handleExpand={() => setAddIdea(false)} />
        )}
        {ideas?.map((idea, i) => (
          <Idea key={idea.id} no={i} stackId={stackId} idea={idea} />
        ))}
      </ul>
    </section>
  );
}

export default StackIdea;
