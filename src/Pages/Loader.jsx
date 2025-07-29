import './loader.css'
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[85vh]">
      <section className="dots-container  ">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </section>
      {/* <div className="loader"></div> */}
    </div>
  )
}
export default Loader
