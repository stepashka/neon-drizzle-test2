// GET requests to /filename would return "Hello, world!"

export const onRequestGet = () => {
  return new Response("Hello, world!")
}