import {useState, useEffect} from 'react';
import { useLocation } from 'react-router';
import {useDB} from '../context/dbProvider';
import {useAuth} from '../context/authProvider';
import DetailSection from './DetailSection';
import IdeaSection from './IdeaSection';

function Stack() {
  const location = useLocation();
  const stackId = location.pathname.slice(3);
  const [stack, setStack] = useState({});
  const { listenToStack } = useDB();
  const {user} = useAuth();

  useEffect(() => {
    if (!user) return;
    const unsub = listenToStack(stackId, setStack);
    return unsub;
  }, [user, stackId, listenToStack]);

  return (
    <main className='mb-8 mt-10 sm:mt-16 lg:mt-[5vw]'>
      <div className='mx-auto w-11/12 max-w-[24rem] sm:max-w-[48rem] lg:flex lg:w-10/12 lg:max-w-[90rem] lg:justify-between lg:gap-x-8'>
        <DetailSection stack={stack} stackId={stackId} />
        <IdeaSection stack={stack} stackId={stackId} />
      </div>
    </main>
  );
}

export default Stack;
