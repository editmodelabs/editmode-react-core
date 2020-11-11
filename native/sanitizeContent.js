export const sanitizeContent = (data, props) => {
  const chunk = { ...data, content: data.content };
  const tokens = (chunk.content.match(/\{{(.*?)\}}/g)|| []).map(t => t.substr(2, t.length-4))
  
  let parsedChunk = chunk.content;

  if (tokens) {
    tokens.forEach(function(token) {
      const value = props.variables && props.variables[token] || ""
      parsedChunk = parsedChunk.replace(`{{${token}}}`, value);
    });
  }

  return { chunk, parsedChunk }
}
