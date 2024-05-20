const toProperCase = (text: string) => {
  return text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}
export default toProperCase;