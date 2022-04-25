import { useLocation } from 'react-router';
import DetailSection from './DetailSection';
import IdeaSection from './IdeaSection';

function Stack() {
  const location = useLocation();
  const stackId = location.pathname.slice(3);

  return (
    <main className='mb-8 mt-10 sm:mt-16 lg:mt-[5vw]'>
      <div className='mx-auto w-11/12 max-w-[24rem] sm:max-w-[48rem] lg:flex lg:w-10/12 lg:max-w-[90rem] lg:justify-between lg:gap-x-8'>
        <DetailSection stackId={stackId} />
        <IdeaSection stackId={stackId} />
      </div>
    </main>
  );
}

export default Stack;
