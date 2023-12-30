function Ping() {
  let aspect;
  if (window.innerHeight <= window.innerWidth) {
    aspect = "height";
  } else {
    aspect = "width";
  }

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="ping-hole w-[400px] h-[400px] rounded-full animate-ping animate-once animate-duration-[1500ms]"></div>
        {/* <div
          className={
            "animate-pulse animate-infinite animate-duration-[4000] flex justify-center items-center rounded-full absolute border border-8 border-[#39FF14] z-50 " +
            (aspect === "height" && " h-[80vh] w-[80vh] ") +
            (aspect === "width" && " h-[80vw] w-[80vw] ")
          }
        >
          <div
            className={
              "animate-pulse animate-infinite animate-duration-[4000] flex justify-center items-center rounded-full absolute border border-8 border-[#39FF14] z-50 " +
              (aspect === "height" && " h-[60vh] w-[60vh] ") +
              (aspect === "width" && " h-[60vw] w-[60vw] ")
            }
          >
            <div
              className={
                "animate-pulse animate-infinite animate-duration-[4000] flex justify-center items-center rounded-full absolute border border-8 border-[#39FF14] z-50 " +
                (aspect === "height" && " h-[40vh] w-[40vh] ") +
                (aspect === "width" && " h-[40vw] w-[40vw] ")
              }
            >

              <div
                className={
                  "  h-5 animate-spin animate-once animate-duration-1000" +
                  (aspect == "height" && " w-[80vh]  ") +
                  (aspect == "width" && " w-[80vw]  ")
                }
              >
                <div
                  className={
                    " bg-[#39FF14] h-3 w-full animate-pulse animate-infinite animate-duration-[4000] " +
                    (aspect == "height" && " pl-[40vh] w- ") +
                    (aspect == "width" && " pl-[40vw]  ")
                  }
                ></div>
                <div className="w-full"></div>
              </div>
  
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Ping;
