import dynamic from "next/dynamic"

const Pen = dynamic(() => import("../../components/Pen"), {
  ssr: false,
})

function App() {
  return <Pen></Pen>
}

export default App
