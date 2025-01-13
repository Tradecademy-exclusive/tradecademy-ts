export const trimText = (text: string, trimBy: number) => {
  if (trimBy >= text.length) {
    return text
  } else {
    return `${text.slice(0, trimBy)}..`
  }
}
