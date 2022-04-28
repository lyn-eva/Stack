import EnhancedDetailCard from '../render-props/EnhancedDetailCard';
import RepoCard from './RepoCard';
import MetaData from './MetaData';
import { stringToMilli } from '../utility/datetime';

function DetailSection({ stack }) {
  return (
    <section className='top-4 h-fit sm:flex sm:gap-6 lg:sticky lg:block lg:max-w-[21.5rem]'>
      <EnhancedDetailCard
        Render={RepoCard}
        props={{ repo_name: stack.name, langs_url: stack.langs_url }}
        className='group relative cursor-pointer self-start sm:w-1/2 lg:w-full'
      />
      <div className='mt-3 sm:mt-0 sm:w-1/2 lg:mt-6 lg:w-full'>
        <EnhancedDetailCard
          Render={MetaData}
          props={{
            createdAt: stringToMilli(stack?.created_at),
            updatedAt: stringToMilli(stack?.updated_at),
            pushedAt: stringToMilli(stack?.pushed_at),
            hdr: 'Repo Details',
          }}
        />
        <EnhancedDetailCard
          Render={MetaData}
          props={{
            createdAt: stack?.created?.toMillis(),
            updatedAt: stack?.modified?.toMillis(),
            hdr: 'Stack Details',
          }}
        />
      </div>
    </section>
  );
}

export default DetailSection;
