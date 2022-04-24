import { useLocation } from 'react-router';
import DetailSection from './DetailSection';
import IdeaSection from './IdeaSection';

function Stack() {
  const location = useLocation();
  const stackId = location.pathname.slice(1);

  return (
    <main className='mb-8 mt-10 sm:mt-16 lg:mt-[5vw]'>
      <div className='mx-auto lg:flex lg:justify-between lg:gap-6 w-11/12 max-w-[24rem] sm:max-w-[48rem] lg:max-w-[90rem]'>
        <DetailSection stackId={stackId} />
        <IdeaSection stackId={stackId} />
      </div>
    </main>
  );
}

export default Stack;
