import React from "react";
import MetaData from "./MetaData";
import RepoFrame from "./RepoFrame";
import StackSection from "./StackSection";

function Stack() {
  return (
    <main className='flex justify-between'>
      <section className='w-[19rem]'>
        <RepoFrame />
        <MetaData hdr='Repo Details' />
        <MetaData hdr='Stack Details'/>
      </section>
      <StackSection />
    </main>
  );
}

export default Stack;
