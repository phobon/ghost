# Ghost

Experimental WebGL progressive enhancement techniques using react-three-fiber

# Inspiration

Looking at the way that 14 Islands handles progressive enhancement: https://medium.com/14islands/progressive-enhancement-with-webgl-and-react-71cd19e66d4 and trying to create a similar sort of framework with react-three-fiber

# Process

+ Create a `<GlobalCanvas />` element that sits at the layout level so it isn't re-rendered

```jsx
export const wrapRootElement = ({ element }) => (
  <>
    {element}
    <GlobalCanvas/>
  </>
)
```

+ Create a `useCanvas` hook that handles adding elements to the scene as required along with a reference to the element to ensure sizing and positioning is correct
  + Hook should handle removing elements as required as well
  + Any async assets should probably be loaded here using Suspense?
  + This should work by hiding the normal element and drawing a WebGL mesh in its place to maintain a shred of accessibility

```jsx
const Image = () => {
	const ref = useRef()
	
	// add webgl component to global canvas while mounted
	useCanvas(<WebGlImage image={ref} />)
	return <img ref={ref} src={...} />
}
```

+ Handle scroll synchronisation somehow - with a library or with a RAF render loop
  + Try this with a render loop to start with - to keep the original browser's scrollbar might be a little bit tough