import React from "react";
import Description from "./Description";
import IdeaEditFraction from "./ideaEditFraction";

function MoreDetail({file, line, Location}) {
  return (
    <div className="px-3 pt-4 py-1">
      <Description />
      <IdeaEditFraction file={file} line={line} Location={Location} />
    </div>
  );
}

export default MoreDetail;
