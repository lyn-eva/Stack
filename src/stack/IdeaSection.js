import { useState, useEffect, useReducer } from "react";
import { useDB } from "../context/dbProvider";
import { useAuth } from "../context/authProvider";
import Idea from "../idea/Idea";
import Detail from "../idea/Detail";
import StackActions from "./StackActions";
import { AnimatePresence } from "framer-motion";

const reducer = (state, action) => {
  switch (action.type) {
    case "FILTER":
      return { ...state, filterBy: action.value };
    case "SORT":
      return { ...state, sortBy: action.value };
    default:
      return state;
  }
};

const initial = {
  sortBy: "created",
  filterBy: { key: "checked", value: false },
};

function IdeaSection({ stackId, stack }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const [addIdea, setAddIdea] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const { listenToIdeas } = useDB();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const unsub = listenToIdeas(stackId, setIdeas, state.sortBy, state.filterBy);
    return unsub;
  }, [user, state, stackId, listenToIdeas]);

  return (
    <section className="mt-6 max-w-[50rem] overflow-hidden sm:mt-12 lg:mt-0 lg:w-8/12">
      <h2 className="mb-2 font-lato text-t-xl font-medium leading-5 text-white sm:text-2xl">
        Your stack
      </h2>
      <hr />
      <StackActions stack={stack} stackId={stackId} setAddIdea={setAddIdea} dispatch={dispatch} />

      <ul className="min-h-[9.5rem] relative">
      {!ideas?.length && <p className='top-[7vh] left-1/2 -translate-x-1/2 absolute text-gray-300 text-center'> You haven't created any idea yet</p>}
        <AnimatePresence>
          {addIdea && (
            <Detail isForm stackId={stackId} handleExpand={() => setAddIdea(false)} />
          )}
          {ideas?.map((idea, i) => (
            <Idea key={idea.id} idx={i+1} stackId={stackId} idea={idea} />
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}

export default IdeaSection;
