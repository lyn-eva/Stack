import { useState, useEffect, useReducer } from "react";
import { useDB } from "../context/dbProvider";
import { useAuth } from "../context/authProvider";
import Idea from "../idea/Idea";
import Detail from "../idea/Detail";
import StackActions from "./StackActions";
import { AnimatePresence } from "framer-motion";

const reducer = (state, action) => {
  switch (action.type) {
    case 'FILTER':
      return {...state, filter: {key: action.value.key, value: action.value.value}}
    case 'SORT':
      return {...state, sort: action.value}
    default:
      return state
  }
}

function IdeaSection({ stackId, repoUrl }) {
  const [state, dispatch] = useReducer(reducer, {});
  const [addIdea, setAddIdea] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const { listenToIdeas } = useDB();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const unsub = listenToIdeas(stackId, setIdeas, state.sort, state.filter);
    return unsub;
  }, [user, state.filter, state.sort]);

  return (
    <section className="mt-6 max-w-[50rem] overflow-hidden sm:mt-12 lg:mt-0 lg:w-8/12">
      <h2 className="mb-2 font-lato text-t-xl font-medium leading-5 text-white sm:text-2xl">
        Your stack
      </h2>
      <hr />
      <StackActions
        stackId={stackId}
        setAddIdea={setAddIdea}
        dispatch={dispatch}
      />

      <ul className="min-h-[7.5rem]">
        <AnimatePresence>
          {addIdea && (
            <Detail isForm stackId={stackId} handleExpand={() => setAddIdea(false)} />
          )}
          {ideas?.map((idea, i) => (
            <Idea key={idea.id} idx={i} stackId={stackId} idea={idea} />
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}

export default IdeaSection;
