import React from "react";
import { Text, Image, Dimensions } from "react-native";
import { sanitizeContent } from './'

export const renderChunk = (data, props) => {
  const { chunk, parsedChunk } = sanitizeContent(data, props)
  const imageHeight = props.imageHeight ? props.imageHeight : 50;
  const imageWidth = props.imageWidth ? props.imageWidth : 50;

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
        {...props}
      >{parsedChunk}</Text>);
    case "rich_text":
      return (<Text
        {...defaultprops}
        class="editmode-richtext-editor"
        {...props}
      >{parsedChunk}</Text>);
    case "image":
      return (<Image
        {...defaultprops}
        source={{uri:`http:${chunk.content}`}}
        style={{ height: imageHeight, width: imageWidth }}
        data-chunk-editable={false}
        {...props}
      />);
    default:
      return <Text {...props}>{parsedChunk}</Text>;
  }
};
