import React from "react";
import { sanitizeContent } from './'
import ReactHtmlParser from 'react-html-parser';

export const renderChunk = (data, Tag, props, textOnly = false) => {
  const { chunk, parsedChunk } = sanitizeContent(data, props)

  const defaultprops = {
    "data-chunk": chunk.identifier,
    "data-chunk-editable": true,
    "data-chunk-content-key": chunk.content_key,
    "data-chunk-type": chunk.chunk_type,
    "key": chunk.identifier
  }

  if (textOnly) {
    return parsedChunk
  }

  if (Tag == 'input') {
    return <input 
      placeholder={parsedChunk}
      {...props} 
    />
  }

  switch (chunk.chunk_type) {
    case "single_line_text":
    case "long_text":
      return (<Tag
        {...defaultprops}
        {...props}
      >{ReactHtmlParser(parsedChunk)}</Tag>);
    case "rich_text":
      return (<Tag
        {...defaultprops}
        {...props}
      >{ReactHtmlParser(parsedChunk)}</Tag>);
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
