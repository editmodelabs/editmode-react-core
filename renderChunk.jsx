import React from "react";
import { sanitizeContent } from './'
import ReactHtmlParser from 'react-html-parser';

export const renderChunk = (chunk, Tag, props) => {
  let parsedChunk;
  if (chunk && typeof chunk.content == "string") {
    const sanitizedData = sanitizeContent(chunk, props)
    chunk = sanitizedData.chunk
    parsedChunk = ReactHtmlParser(sanitizedData.parsedChunk)
  } else {
    parsedChunk = chunk.content;
  }

  const defaultprops = {
    "data-chunk": chunk.identifier,
    "data-chunk-editable": true,
    "data-chunk-content-key": chunk.content_key,
    "data-chunk-type": chunk.chunk_type,
    "key": chunk.identifier
  }

  if (Tag == 'input') {
    return <input 
      {...props} 
    />
  }

  switch (chunk.chunk_type) {
    case "single_line_text":
    case "long_text":
      return (<Tag
        {...defaultprops}
        {...props}
      >{parsedChunk}</Tag>);
    case "rich_text":
      return (<Tag
        {...defaultprops}
        {...props}
      >{parsedChunk}</Tag>);
    case "image":
      return (<img
        {...defaultprops}
        src={chunk.content}
        data-chunk-editable={false}
        alt=""
        {...props}
      />);
    default:
      return <span {...props}>{parsedChunk}</span>;
  }
};
