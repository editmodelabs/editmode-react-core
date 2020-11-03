import React from "react";
import { Text, Image } from "react-native";
import { sanitizeContent } from './'

export const renderChunk = (data, props) => {
  const { chunk, parsedChunk } = sanitizeContent(data, props)

  const defaultprops = {
    "data-chunk": chunk.identifier,
    "data-chunk-editable": true,
    "data-chunk-content-key": chunk.content_key,
    "data-chunk-type": chunk.chunk_type,
    "key": chunk.identifier
  }

  switch (chunk.chunk_type) {
    case "single_line_text":
    case "long_text":
      return (<Text
        {...defaultprops}
        dangerouslySetInnerHTML={{__html: parsedChunk}}
        {...props}
      />);
    case "rich_text":
      return (<Text
        {...defaultprops}
        class="editmode-richtext-editor"
        dangerouslySetInnerHTML={{__html: parsedChunk}}
        {...props}
      />);
    case "image":
      return (<Image
        {...defaultprops}
        src={chunk.content}
        data-chunk-editable={false}
        alt=""
        {...props}
      />);
    default:
      return <Text {...props}>{parsedChunk}</Text>;
  }
};