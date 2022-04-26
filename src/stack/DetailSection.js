import EnhancedDetailCard from "../render-props/EnhancedDetailCard";
import useRepo from "../custom-hook/useRepo";
import RepoCard from "./RepoCard";
import MetaData from "./MetaData";

function DetailSection({ stack }) {
  const repoDetails = useRepo(stack.name);

  return (
    <section className="sm:flex sm:gap-6 lg:block lg:max-w-[21.5rem] lg:sticky top-4 h-fit">
      <EnhancedDetailCard
        Render={RepoCard}
        props={{ repoName: stack.name }}
        className="relative self-start sm:w-1/2 lg:w-full"
      />
      <div className="mt-3 sm:mt-0 sm:w-1/2 lg:mt-6 lg:w-full">
        <EnhancedDetailCard
          Render={MetaData}
          props={{
            ...repoDetails,
            hdr: "Repo Details",
          }}
        />
        <EnhancedDetailCard
          Render={MetaData}
          props={{
            createdAt: stack?.created?.toMillis(),
            updatedAt: stack?.modified?.toMillis(),
            hdr: "Stack Details",
          }}
        />
      </div>
    </section>
  );
}

export default DetailSection;
